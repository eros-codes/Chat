export function createContactCard({
	id,
	name,
	lastMessage,
	lastMessageSeen,
	profilePics,
	isOnline,
	isMuted,
}) {
	const seenIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.3"></circle>
                    <path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8"></path>
                    </svg>`;
	const sentIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"></path>
                    </svg>`;
	const muteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 4L9.91 6.09L12 8.18M4.27 3L3 4.27L7.73 9H3v6h4l5 5v-6.73l4.25 4.26c-.67.51-1.42.93-2.25 1.17v2.07c1.38-.32 2.63-.95 3.68-1.81L19.73 21L21 19.73l-9-9M19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.9 8.9 0 0 0 21 12c0-4.28-3-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71m-2.5 0c0-1.77-1-3.29-2.5-4.03v2.21l2.45 2.45c.05-.2.05-.42.05-.63"></path>
                    </svg>`;

	const isSeen = lastMessageSeen ? seenIcon : sentIcon;
	const muteEl = isMuted ? muteIcon : "";

	let messageSection;
	if (!lastMessage) {
		messageSection = `<a class="send-message">Send message</a>`;
	} else {
		messageSection = `<span class="last-message">${lastMessage}</span>
                        <span class="message-status seen">
                            ${isSeen}
                        </span>`;
	}

	const card = document.createElement("span");
	card.className = "contacts-card";
	card.dataset.userId = id;
	card.innerHTML = `
        <img
        class="contact-profile ${isOnline ? "online-contact" : ""}"
        src="${profilePics[0]}"
        alt="Profile"
        />
        <span class="contact-name">${name} ${muteEl}</span>
        <span class="contact-message">
            ${messageSection}
        </span>
    `;
	return card;
}