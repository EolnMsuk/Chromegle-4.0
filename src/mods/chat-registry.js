class ChatRegistryManager extends Module {

    constructor() {
        super();

        ChatRegistry = this;
        this.#observer.observe(document, {subtree: true, childList: true, attributes: true});
        this.addEventListener("click", this.onButtonClick, undefined, document);

    }

    #setUUID = () => this.#chatUUID = shortUuid();
    #clearUUID = () => this.#chatUUID = null;

    #observer = new MutationObserver(this.onMutationObserved.bind(this));
    #isChatting = false;
    #isVideoChat = null;
    #pageStarted = false;
    #chatUUID = null;
    #videoChatLoaded = false;

    /** @type ChatMessage[] */
    #messages = [];

    userMessages() {
        return this.#messages.filter(msg => msg.isUser)
    }

    strangerMessages() {
        return this.#messages.filter(msg => msg.isStranger());
    }

    isVideoChatLoaded = () => this.#videoChatLoaded;
    isChatting = () => this.#isChatting;
    isVideoChat = () => this.#isVideoChat;
    isTextChat = () => !this.#isVideoChat;
    pageStarted = () => this.#pageStarted;
    getUUID = () => this.#chatUUID;

    onButtonClick(event) {

        if (event.target.classList.contains("skipButton")) {
            document.dispatchEvent(new CustomEvent('chatButtonClicked', {detail: event}));
        }

        // For banned -> Non-banned is able to use the onDocumentMutation
        if (
            ["videobtn", "textbtn", "videobtnunmoderated", "chatbtn"].includes(event.target.id)
            || event.target?.src?.includes("/static/videobtn-enabled")
        ) {
            if (!this.pageStarted()) {
                this.#pageStarted = true;
                this.#isVideoChat = $("#videowrapper").get(0) != null;
                document.dispatchEvent(new CustomEvent('pageStarted', {detail: {button: event.target, isVideoChat: this.isVideoChat()}}));
            }
        }
    }

    onMutationObserved(mutations) {

        // Should be LAST b.c. it matters if the chat has ended
        mutations.sort((a, b) => {
            if (a.target.id === "othervideospinner") {
                return 1;
            }
            else if (b.target.id === "othervideospinmner") {
                return -1;
            }

            return -1;

        });

        for (let mutation of mutations) {
            mutation.addedNodes?.forEach(node => {
                if (
                    node.nodeType === 1 &&
                    node.classList.contains("information")
                ) {
                    this.onChatMutationRecord({ target: node });
                }
            });

            this.onMutationRecord(mutation);
        }

    }

    onMutationRecord(mutationRecord) {

        // if (!this.#pageStarted) {
            
        //     return;
        // }

        // Chat Loaded
        if (mutationRecord.target.id === "othervideospinner") {

            if (mutationRecord.target.style.display === "none" && this.isChatting() && !this.#videoChatLoaded) {
                this.#videoChatLoaded = true;
                document.dispatchEvent(new CustomEvent("videoChatLoaded"));
            }
            return;
        }

        // Chat failed
        if (mutationRecord.target["innerText"] != null) {
            if (mutationRecord.target["innerText"].includes("Server was unreachable for too long")) {
                Logger.ERROR("Chat failed to connect, you are likely using a VPN or proxy which Omegle has detected and blocked.")
                document.dispatchEvent(new CustomEvent('chatFailedConnect', {detail: mutationRecord.target}));
                this.#isChatting = false;
                this.#clearUUID();
                return;
            }
        }

        // Disconnect button
        if (mutationRecord.target.classList.contains('skipButton')) {
            document.dispatchEvent(new CustomEvent('skipButtonMutation', {detail: mutationRecord}))
        }

        // REGULAR STUFF
        if (mutationRecord.target.classList.contains("information")) {
            this.onChatMutationRecord(mutationRecord);
        }

        // Chat Log
        if (mutationRecord?.addedNodes?.[0]?.classList?.contains("logitem")) {
            this.onLogItemAdded(mutationRecord.addedNodes[0])
        }

    }

    onLogItemAdded(logItemNode) {

        let innerNode = logItemNode?.childNodes?.[0];

        // Determine if user message
        if (this.containsOneOfClasses(innerNode, "youmsg", "strangermsg")) {


            let isUser = innerNode.classList.contains("youmsg");
            let idx = this.#messages.length;
            let message = new ChatMessage(isUser, innerNode?.childNodes?.[2].textContent, innerNode, idx);

            this.#messages.push(message);
            document.dispatchEvent(new CustomEvent('chatMessage', {detail: message}))
        }

        // On mobile
        if (this.containsOneOfClasses(innerNode, "strangermsggroup", "youmsggroup")) {

            let isUser = innerNode.classList.contains("youmsggroup");
            let idx = this.#messages.length;

            let innerElement = innerNode?.childNodes?.[0]?.childNodes?.[0];

            let message = new ChatMessage(
                isUser,
                innerElement?.childNodes?.[0].textContent,
                innerElement,
                idx
            );

            this.#messages.push(message);
            document.dispatchEvent(new CustomEvent('chatMessage', {detail: message}))

        }


    }

    containsOneOfClasses(node, ...classes) {

        if (!node?.classList) {
            return false;
        }

        for (let CLASS of classes) {
            if (node.classList.contains(CLASS)) {
                return true;
            }
        }

        return false;
    }


    onChatMutationRecord(mutationRecord) {
        const el = mutationRecord.target;

        if (
            el.id === "information" &&
            el.closest("#mainMessages") == null &&
            el.textContent.includes("You're now chatting with a random stranger")
        ) {
            if (!this.#isChatting) {
                this.#isChatting = true;
                this.#videoChatLoaded = false;
                this.#setUUID();
                Logger.INFO("Chat Started: UUID <%s>", this.getUUID());
                document.dispatchEvent(new CustomEvent("chatStarted", {
                    detail: {
                        button: el,
                        uuid: this.getUUID(),
                        isVideoChat: this.isVideoChat()
                    }
                }));
            }
            return;
        }

        if (
            el.classList.contains("information") &&
            el.closest("#mainMessages") == null &&
            el.textContent.includes("Looking for someone you can chat with...")
        ) {
            if (this.#isChatting) {
                Logger.INFO("Chat Ended: UUID <%s>", this.getUUID());
                const uuid = this.getUUID();
                this.#isChatting = false;
                this.#clearUUID();
                this.#messages = [];
                document.dispatchEvent(new CustomEvent("chatEnded", {
                    detail: {
                        button: el,
                        uuid,
                        isVideoChat: this.isVideoChat()
                    }
                }));
            }
        }
    }


}

class ChatMessage {

    constructor(isUser, content, element, index) {

        /** @type boolean */
        this.isUser = isUser;

        /** @type string */
        this.content = content;

        /** @type HTMLElement */
        this.element = element;

        /** @type Number */
        this.messageNumber = index + 1;

        /** @type HTMLSpanElement|null */
        this.spanElement = this.element?.querySelector("span") || null;

    }

    getTextNodes() {
        let childNodes = this.spanElement?.childNodes || [];
        let textNodes = [];

        for (let childNode of childNodes) {
            if (childNode.nodeType === Node.TEXT_NODE) {
                textNodes.push(childNode);
            }
        }

        return textNodes;
    }

    isStranger() {
        return !this.isUser;
    }

}
