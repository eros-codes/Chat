export function createActiveChatCard({
	id,
	name,
	lastMessage,
	profilePics,
	isOnline,
	isMuted,
	lastMessageTime,
	isPinned,
	unreadCount,
}) {
	const muteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 4L9.91 6.09L12 8.18M4.27 3L3 4.27L7.73 9H3v6h4l5 5v-6.73l4.25 4.26c-.67.51-1.42.93-2.25 1.17v2.07c1.38-.32 2.63-.95 3.68-1.81L19.73 21L21 19.73l-9-9M19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.9 8.9 0 0 0 21 12c0-4.28-3-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71m-2.5 0c0-1.77-1-3.29-2.5-4.03v2.21l2.45 2.45c.05-.2.05-.42.05-.63"></path>
                    </svg>`;

	const pinIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path fill="currentColor" d="M15.744 4.276c1.221-2.442 4.476-2.97 6.406-1.04l6.614 6.614c1.93 1.93 1.402 5.186-1.04 6.406l-6.35 3.176a1.5 1.5 0 0 0-.753.867l-1.66 4.983a2 2 0 0 1-3.312.782l-4.149-4.15l-6.086 6.087H4v-1.415l6.086-6.085l-4.149-4.15a2 2 0 0 1 .782-3.31l4.982-1.662a1.5 1.5 0 0 0 .868-.752z"></path>
                    </svg>`;

	const muteEl = isMuted ? muteIcon : "";
	const pinEl = isPinned ? pinIcon : "";

	const active = document.createElement("div");
	active.className = isPinned ? "active-chat pinned" : "active-chat";
	active.dataset.userId = id;
	active.innerHTML = `
    <img
    class="active-chat-profile ${isOnline ? "online-active-chat" : ""}"
    src="${profilePics[0]}"
    alt="active-profile"
    />
    <span class="active-chat-info">
    <span class="active-chat-name">
        ${name}
        ${pinEl}
    </span>
    <span class="active-chat-last-message">${lastMessage}${muteEl}</span>
    </span>
    <span class="active-chat-meta">
    <span class="active-chat-message-time">${lastMessageTime}</span>
    <span class="active-chat-unread-messages" style="${unreadCount === 0 ? "opacity: 0" : ""}"><p>${unreadCount}</p></span>
    </span>
    `;
	return active;
}