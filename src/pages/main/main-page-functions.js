import { createContactCard } from "../../components/contact-cards/contact-card.js";
import { createActiveChatCard } from "../../components/active-chats/active-chats.js";
import { createMessage } from "../../components/messages/messages.js";
import { createForwardedContactCard } from "../../components/contact-cards/contacts-forward.js";
document.addEventListener("DOMContentLoaded", function () {
	const logoutBtn = document.getElementById("logout");
	const chatPart = document.getElementById("chat-part");
	const mainContent = document.getElementById("main-content");
	const peoplePart = document.getElementById("people-part");
	const chatEl = document.querySelector(".chat");
	const contactsContainer = document.querySelector(".contacts-container");
	const activeChatsContainer = document.querySelector(".active-chats-container");
	const chatProfilePic = document.querySelector(".chat-profile-picture");
	const chatName = document.querySelector(".chat-name");
	const closeChatBtn = document.getElementById("close-chat");
	const settingsBtn = document.querySelector(".settings-section");
	const settingsList = document.querySelector(".settings-list");
	const searchbar = document.querySelector(".search-bar");
	const searchInput = document.querySelector(".search-input");
	const messageInput = document.querySelector(".message-input");
	const sendMessageBtn = document.querySelector(".send-btn");
	const cancelEditBtn = document.querySelector(".cancel-edit-btn");
	const messageContainer = document.querySelector(".chat-send-message");
	const messageMenu = document.querySelector(".message-menu");
	const chatOverlay = document.querySelector(".chat-overlay");
	const deleteMsg = document.querySelectorAll(".delete-message");
	const replyMsg = document.querySelectorAll(".reply-message");
	const forwardMsg = document.querySelectorAll(".forward-message");
	const copyMsg = document.querySelectorAll(".copy-message");
	const editMsg = document.querySelectorAll(".edit-message");
	const selectMsg = document.querySelectorAll(".select-message");
	const pinMsg = document.querySelectorAll(".pin-message");
	const msgAction = document.querySelector(".message-action-preview");
	const msgActionText = document.querySelector(".message-action-preview .action-name");
	const msgActionmsg = document.querySelector(".message-action-preview .action-message-preview");
	const toaster = document.querySelector(".toaster");
	const toastMessage = document.querySelector(".toast-message");
	const toastIcon = document.querySelector(".toast-icon");
	const undoBtn = document.querySelector(".undo-btn");
	const forwardDialog = document.querySelector(".forward-dialog");
	const forwardDialogCloseBtn = document.getElementById("close-forward-dialog");
	const pinnedMessageContainer = document.querySelector(".pinned-message-container");
	const pinnedMessageCount = document.querySelector(".pinned-message-count");
	const pinnedMessageText = document.querySelector(".pinned-message-text");
	const chatHeader = document.querySelector(".chat-header");
	const scrollToBottomBtn = document.querySelector(".scroll-to-bottom-btn");
	const selectionToolbar = document.querySelector(".selection-toolbar");
	const selectionCount = document.querySelector(".selection-count");
	const selectionForwardBtn = document.querySelector(
		".selection-forward-btn",
	);
	const selectionDeleteBtn = document.querySelector(".selection-delete-btn");
	const cancelSelectionBtn = document.querySelector(".cancel-selection-btn");
	const unreadMessageCount = document.querySelector(".unread-message-count");
	const contactProfileDetails = document.querySelector(".parts > .contact-profile-details");
	const profileDialog = document.querySelector(".profile-dialog");
	const detailPictures = document.querySelectorAll(".detail-picture img");
	const detailNames = document.querySelectorAll(".contact-detail-name h3");
	const detailBios = document.querySelectorAll(".contact-detail-name h6");
	const detailLastSeens = document.querySelectorAll(".contact-detail-name p");
	const detailUsernames = document.querySelectorAll("#contact-username h3");
	const detailEmails = document.querySelectorAll("#contact-email h3");
	const deleteChatBtns = document.querySelectorAll("#delete-chat-btn");

	const copyIcon = `<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
					>
						<g
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
						>
							<rect
								width="14"
								height="14"
								x="8"
								y="8"
								rx="2"
								ry="2"
							/>
							<path
								d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
							/>
						</g>
					</svg>`;
	const deleteIcon = `<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
							/>
						</svg>`;
	const pinIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
					<path fill="currentColor" d="M15.744 4.276c1.221-2.442 4.476-2.97 6.406-1.04l6.614 6.614c1.93 1.93 1.402 5.186-1.04 6.406l-6.35 3.176a1.5 1.5 0 0 0-.753.867l-1.66 4.983a2 2 0 0 1-3.312.782l-4.149-4.15l-6.086 6.087H4v-1.415l6.086-6.085l-4.149-4.15a2 2 0 0 1 .782-3.31l4.982-1.662a1.5 1.5 0 0 0 .868-.752z"></path>
					</svg>`;
	const pinIconforMenu = `<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
							>
								<path
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4a1 1 0 0 1 1 1z"
								/>
							</svg>`;
	const unpinIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path fill="currentColor" d="m20.97 17.172l-1.414 1.414l-3.535-3.535l-.073.074l-.707 3.536l-1.415 1.414l-4.242-4.243l-4.95 4.95l-1.414-1.414l4.95-4.95l-4.243-4.243L5.34 8.761l3.536-.707l.073-.074l-3.536-3.536L6.828 3.03zM10.365 9.394l-.502.502l-2.822.565l6.5 6.5l.564-2.822l.502-.502zm8.411.074l-1.34 1.34l1.414 1.415l1.34-1.34l.707.707l1.415-1.415l-8.486-8.485l-1.414 1.414l.707.707l-1.34 1.34l1.414 1.415l1.34-1.34z"/>
					</svg>`;

	const lineHeight = 22.4; // in rem, should match the line-height in CSS
	const maxLines = 7; // maximum lines before starting to scroll
	const maxHeight = lineHeight * maxLines;
	const basePadding = 4;

	let contactUserId;
	let actionPreviewHeight = 0; // Height of the action preview element that shows up when you click reply, forward, etc. It should be added to chat paddingBottom to prevent it from overlapping messages and input field
	let touchTimeout; // For long press on mobile
	let isMenuOpen = false; // Prevents touched from closing the menu right after it opens
	let msgIndex; // Tracks the currently selected message index for menu action
	let selectedMsg; // For styling purposes
	let isEditing = false; // To prevent sending message when editing and enter is pressed
	let replyTo = null; // To track which message is being replied to
	let isForwarding = false; // To track if the user is forwarding a message
	let forwardingMsg = null; // To track which message is being forwarded
	let deleting;
	let deletingTimeouts = [];
	let isSelectionForwarding = false;
	let forwardingMsgs = [];
	let pinnedIndexes = []; // sorted array of pinned message indexes for current chat
	let isProgrammaticScroll = false; // To prevent scroll event from triggering when we are programmatically scrolling to bottom or to a specific message
	let isSelecting = false;
	let selectedMessages = [];
	let currentUndoAction = null;

	// Empty state element shown when a chat has no messages
	const emptyStateEl = document.createElement("div");
	emptyStateEl.className = "chat-empty";
	emptyStateEl.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.464 16.828C2 15.657 2 14.771 2 11s0-5.657 1.464-6.828C4.93 3 7.286 3 12 3s7.071 0 8.535 1.172S22 7.229 22 11s0 4.657-1.465 5.828C19.072 18 16.714 18 12 18c-2.51 0-3.8 1.738-6 3v-3.212c-1.094-.163-1.899-.45-2.536-.96"/>
		</svg>
		<p class="chat-empty-text">send your first message</p>
	`;

	function showEmptyState() {
		if (!chatEl) return;
		chatEl.innerHTML = "";
		chatEl.appendChild(emptyStateEl);
		emptyStateEl.style.display = "flex";
	}

	function hideEmptyState() {
		if (!chatEl) return;
		if (emptyStateEl.parentElement === chatEl) {
			emptyStateEl.remove();
		}
	}

	// Randomization for contact names, messages
	const contacts = [
		{
			id: 1,
			conversationId: 1,
			isPinned: true,
			isMuted: false,
			isBlocked: false,
			isInChat: false,
			unreadCount: 3,
			nickname: null,
			userId: 2,
			name: "Arvin",
			username: "arvin_dev",
			bio: "Software Engineer",
			profilePics: ["../../../public/assets/images/profile.jpeg"],
			isOnline: true,
			lastSeen: null,
			createdAt: "2024-01-01",
			lastMessage: "Coffee on me later ☕",
			lastMessageTime: "09:27",
			lastMessageSeen: false,
		},
		{
			id: 2,
			conversationId: 2,
			isPinned: true,
			isMuted: false,
			isBlocked: false,
			isInChat: false,
			unreadCount: 2,
			nickname: null,
			userId: 3,
			name: "Fatemeh",
			username: "fatemeh_k",
			bio: null,
			profilePics: ["../../../public/assets/images/profile.jpeg"],
			isOnline: true,
			lastSeen: null,
			createdAt: "2024-01-02",
			lastMessage: "صد در صد",
			lastMessageTime: "10:15",
			lastMessageSeen: true,
		},
		{
			id: 3,
			conversationId: 3,
			isPinned: false,
			isMuted: false,
			isBlocked: false,
			isInChat: true,
			unreadCount: 0,
			nickname: null,
			userId: 4,
			name: "Arshia",
			username: "arshia_m",
			bio: "Gamer 🎮",
			profilePics: ["../../../public/assets/images/profile.jpeg"],
			isOnline: false,
			lastSeen: "2024-01-10T19:15:00",
			createdAt: "2024-01-03",
			lastMessage: "Victory or chaos",
			lastMessageTime: "19:15",
			lastMessageSeen: true,
		},
		{
			id: 4,
			conversationId: 4,
			isPinned: false,
			isMuted: false,
			isBlocked: false,
			isInChat: true,
			unreadCount: 0,
			nickname: null,
			userId: 5,
			name: "Soheil",
			username: "soheil_r",
			bio: null,
			profilePics: ["../../../public/assets/images/profile.jpeg"],
			isOnline: true,
			lastSeen: null,
			createdAt: "2024-01-04",
			lastMessage: "امشب طولانیه",
			lastMessageTime: "21:15",
			lastMessageSeen: true,
		},
		{
			id: 5,
			conversationId: 5,
			isPinned: false,
			isMuted: true,
			isBlocked: false,
			isInChat: false,
			unreadCount: 1,
			nickname: null,
			userId: 6,
			name: "AmirAli",
			username: "amirali_t",
			bio: "Backend Dev",
			profilePics: ["../../../public/assets/images/profile.jpeg"],
			isOnline: false,
			lastSeen: "2024-01-10T08:26:00",
			createdAt: "2024-01-05",
			lastMessage: "Already done",
			lastMessageTime: "08:26",
			lastMessageSeen: true,
		},
		{
			id: 6,
			conversationId: 6,
			isPinned: false,
			isMuted: false,
			isBlocked: false,
			isInChat: false,
			unreadCount: 0,
			nickname: null,
			userId: 7,
			name: "Amirkia",
			username: "amirkia_h",
			bio: null,
			profilePics: ["../../../public/assets/images/profile.jpeg"],
			isOnline: false,
			lastSeen: "2024-01-09T12:00:00",
			createdAt: "2024-01-06",
			lastMessage: "",
			lastMessageTime: "",
			lastMessageSeen: true,
		},
		{
			id: 7,
			conversationId: 7,
			isPinned: false,
			isMuted: false,
			isBlocked: false,
			isInChat: false,
			unreadCount: 0,
			nickname: null,
			userId: 8,
			name: "Ali",
			username: "ali_gh",
			bio: null,
			profilePics: ["../../../public/assets/images/profile.jpeg"],
			isOnline: true,
			lastSeen: null,
			createdAt: "2024-01-07",
			lastMessage: "",
			lastMessageTime: "",
			lastMessageSeen: true,
		},
	];

	const messages = {
		1: [
			{ user: true, text: "Hey, are you awake?", time: "09:12" },
			{
				user: false,
				text: "Yeah I'm up. What's going on?",
				time: "09:13",
			},
			{ user: true, text: "Did you finish the report?", time: "09:14" },
			{
				user: false,
				text: "Almost. Just fixing a few numbers.",
				time: "09:15",
			},
			{
				user: false,
				text: "Why? Did the boss ask about it?",
				time: "09:15",
			},
			{
				user: true,
				text: "Yep. He asked me like 5 minutes ago.",
				time: "09:16",
			},
			{ user: true, text: "No pressure though 😅", time: "09:16" },
			{ user: false, text: "Haha great timing.", time: "09:17" },
			{ user: false, text: "Give me 10 minutes.", time: "09:17" },
			{ user: true, text: "Sure.", time: "09:18" },
			{ user: false, text: "Not yet. Are they good?", time: "09:20" },
			{ user: true, text: "Pretty clean actually.", time: "09:21" },
			{
				user: true,
				text: "Way better than the last version.",
				time: "09:21",
			},
			{ user: false, text: "Nice. Send them later.", time: "09:22" },
			{ user: true, text: "Will do.", time: "09:22", isEdited: true },
			{
				user: false,
				text: "Okay report is done.",
				time: "09:25",
				isEdited: true,
			},
			{ user: false, text: "Uploading it now.", time: "09:26" },
			{ user: true, text: "Legend.", time: "09:26" },
			{ user: true, text: "Coffee on me later ☕", time: "09:27" },
		],
		2: [
			{ user: true, text: "سلام بیداری؟", time: "10:02" },
			{ user: false, text: "آره چی شده", time: "10:03" },
			{ user: true, text: "پروژه رو دیدی؟", time: "10:03" },
			{ user: false, text: "هنوز کامل نه", time: "10:04" },
			{ user: true, text: "یه باگ عجیب داره", time: "10:04" },
			{ user: false, text: "کجاش؟", time: "10:05" },
			{ user: true, text: "تو لاگین", time: "10:05" },
			{ user: false, text: "ارور میده؟", time: "10:06" },
			{ user: true, text: "نه ریدایرکت نمیشه", time: "10:06" },
			{ user: false, text: "احتمالا سشنه", time: "10:07" },
			{ user: true, text: "منم همین فکر رو کردم", time: "10:07" },
			{ user: false, text: "console رو دیدی؟", time: "10:08" },
			{ user: true, text: "آره چیزی نبود", time: "10:09" },
			{ user: false, text: "عجیبه", time: "10:09" },
			{ user: true, text: "یه بار کشو پاک کن", time: "10:10" },
			{ user: false, text: "الان امتحان میکنم", time: "10:11" },
			{ user: false, text: "اوکی درست شد", time: "10:11" },
			{ user: true, text: "دیدی 😎", time: "10:12" },
			{ user: false, text: "تو جادوگری", time: "10:12" },
			{ user: true, text: "نه فقط دولوپر", time: "10:13" },
			{ user: false, text: "فرقش چیه", time: "10:13" },
			{ user: true, text: "جادوگرها کمتر باگ دارن", time: "10:14" },
			{ user: false, text: "حرفت منطقیه", time: "10:14" },
			{ user: true, text: "بریم قهوه؟", time: "10:15" },
			{ user: false, text: "صد در صد", time: "10:15" },
		],
		3: [
			{ user: false, text: "Game tonight?", time: "19:01" },
			{ user: true, text: "Depends", time: "19:02" },
			{ user: false, text: "On what", time: "19:02" },
			{ user: true, text: "Pizza availability", time: "19:03" },
			{ user: false, text: "That's negotiable", time: "19:04" },
			{ user: true, text: "Good answer", time: "19:04" },
			{ user: false, text: "What game though", time: "19:05" },
			{ user: true, text: "Apex?", time: "19:06" },
			{ user: false, text: "I'm terrible at it", time: "19:06" },
			{ user: true, text: "That's part of the fun", time: "19:07" },
			{
				user: false,
				text: "You say that because you win",
				time: "19:07",
			},
			{ user: true, text: "Pure luck", time: "19:08" },
			{ user: false, text: "Sure sure", time: "19:09" },
			{ user: true, text: "Launching now", time: "19:09" },
			{ user: false, text: "Give me 5 min", time: "19:10" },
			{ user: true, text: "Warm up match?", time: "19:10" },
			{ user: false, text: "Always", time: "19:11" },
			{ user: true, text: "Don't blame me if we lose", time: "19:11" },
			{ user: false, text: "I'll blame the lag", time: "19:12" },
			{ user: true, text: "Classic gamer excuse", time: "19:12" },
			{ user: false, text: "Works every time", time: "19:13" },
			{ user: true, text: "Invite sent", time: "19:14" },
			{ user: false, text: "Joining", time: "19:14" },
			{ user: true, text: "Let's go", time: "19:15" },
			{ user: false, text: "Victory or chaos", time: "19:15" },
		],
		4: [
			{ user: false, text: "کجایی الان", time: "21:02" },
			{ user: true, text: "خونه", time: "21:03" },
			{ user: false, text: "بیا بیرون", time: "21:03" },
			{ user: true, text: "حوصله ندارم", time: "21:04" },
			{ user: false, text: "هوا عالیه", time: "21:04" },
			{ user: true, text: "سرده", time: "21:05" },
			{ user: false, text: "کاپشن بپوش", time: "21:05" },
			{ user: true, text: "تنبل تر از اونم", time: "21:06" },
			{ user: false, text: "باشه قهوه میدم", time: "21:06" },
			{ user: true, text: "وسوسه کننده شد", time: "21:07" },
			{ user: false, text: "پس بیا", time: "21:07" },
			{ user: true, text: "۱۰ دقیقه", time: "21:08" },
			{ user: false, text: "عجله کن", time: "21:08" },
			{ user: true, text: "دارم کفش میپوشم", time: "21:09" },
			{ user: false, text: "همیشه همینو میگی", time: "21:10" },
			{ user: true, text: "این دفعه جدیه", time: "21:10" },
			{ user: false, text: "باشه باور میکنم", time: "21:11" },
			{ user: true, text: "رسیدم دم در", time: "21:12" },
			{ user: false, text: "دیدمت", time: "21:12" },
			{ user: true, text: "قهوه کجاست", time: "21:13" },
			{ user: false, text: "اول سلام", time: "21:13" },
			{ user: true, text: "سلام", time: "21:14" },
			{ user: false, text: "حالا بریم", time: "21:14" },
			{ user: true, text: "بالاخره", time: "21:15" },
			{ user: false, text: "امشب طولانیه", time: "21:15" },
		],
		5: [
			{ user: true, text: "Hey, you awake?", time: "08:10" },
			{ user: false, text: "Barely 😅", time: "08:11" },
			{ user: true, text: "Need help with the project?", time: "08:11" },
			{ user: false, text: "Yeah actually", time: "08:12" },
			{ user: false, text: "The API keeps failing", time: "08:12" },
			{ user: true, text: "Timeout?", time: "08:13" },
			{ user: false, text: "Looks like it", time: "08:14" },
			{ user: true, text: "Add retry logic", time: "08:15" },
			{ user: false, text: "Smart", time: "08:16" },
			{ user: true, text: "Engineer instincts", time: "08:16" },
			{ user: false, text: "Or caffeine instincts", time: "08:17" },
			{ user: true, text: "Coffee fixes most bugs", time: "08:18" },
			{ user: false, text: "Except production ones", time: "08:18" },
			{ user: true, text: "Those require panic", time: "08:19" },
			{ user: false, text: "And pizza", time: "08:19" },
			{ user: true, text: "Deploying now", time: "08:20" },
			{ user: false, text: "I'm watching logs", time: "08:21" },
			{ user: true, text: "Still alive?", time: "08:21" },
			{ user: false, text: "So far so good", time: "08:22" },
			{ user: true, text: "Miracles happen", time: "08:23" },
			{ user: false, text: "Don't jinx it", time: "08:23" },
			{ user: true, text: "Too late", time: "08:24" },
			{ user: false, text: "Server just screamed", time: "08:25" },
			{ user: true, text: "Rollback!", time: "08:25" },
			{ user: false, text: "Already done", time: "08:26" },
		],
		6: [],
		7: [],
	};

	contacts.forEach((contact) => {
		if (contact.isPinned || contact.unreadCount > 0) {
			activeChatsContainer.appendChild(createActiveChatCard(contact));
		} else {
			contactsContainer.appendChild(createContactCard(contact));
		}
	});
	updateTotalUnreadCount();

	// Openning chat
	function openChat() {
		chatPart.style.display = "flex";
		if (window.matchMedia("(min-width: 768px)").matches) {
			mainContent.style.flexDirection = "column-reverse";
		} else {
			peoplePart.style.display = "none";
		}
		scrollChatToBottom();
	}

	// Closing chat
	function closeChat() {
		chatPart.style.display = "none";
		contactProfileDetails.style.display= "none";
		peoplePart.style.display = "";
		if (window.matchMedia("(min-width: 768px)").matches) {
			mainContent.style.flexDirection = "row-reverse";
		} else {
			peoplePart.style.display = "inline";
		}
	}

	// Applying the messages to chat
	function injectMessages(userId) {
		if (!chatEl) return;

		const userMessages = messages[userId];
		if (!userMessages) {
			alert("No messages for this user");
			return;
		}

		chatEl.innerHTML = "";
		pinnedMessageContainer.style.display = "none";
		chatHeader.style.borderRadius = "1rem";
		pinnedIndexes = [];

		// If there are no messages for this user, show empty state
		if (Array.isArray(userMessages) && userMessages.length === 0) {
			showEmptyState();
			return;
		} else {
			hideEmptyState();
		}

		const fragment = document.createDocumentFragment();
		userMessages.forEach((message, index) => {
			message.index = index;
			const msgElem = createMessage(message);
			fragment.appendChild(msgElem);
			if (message.isPinned) {
				pinnedIndexes.push(index);
			}
		});

		if (pinnedIndexes.length > 0) {
			pinnedIndexes.sort((a, b) => a - b);
			const lastIdx = pinnedIndexes[pinnedIndexes.length - 1];
			pinnedMessageText.textContent = messages[userId][lastIdx].text;
			pinnedMessageText.dataset.index = lastIdx;
			pinnedMessageContainer.style.display = "flex";
			chatHeader.style.borderRadius = "1rem 1rem 0 0";
			updatePinCount(lastIdx);
		}

		chatEl.appendChild(fragment);
	}

	// Resetting input field after sending message, canceling edit, or canceling forward
	function resetInput() {
		messageInput.value = "";
		messageInput.rows = 1;
		messageInput.style.height = "auto";
		messageInput.style.borderRadius = "2rem";
		sendMessageBtn.style.display = "none";
		actionPreviewHeight = 0;
		chatEl.style.paddingBottom = basePadding + "rem";
		msgAction.style.display = "none";
	}

	// Keep chat scrolled to bottom and ensure input is visible on mobile keyboards
	function scrollChatToBottom() {
		if (!chatEl) return;
		chatEl.scrollTop = chatEl.scrollHeight;
	}

	// Seinding message
	function sendMessage() {
		if (isEditing) {
			if (
				messageInput.value.trim() == "" ||
				messages[contactUserId][Number(msgIndex)].text ==
					messageInput.value.trim()
			) {
				return;
			}
			const txt = messageInput.value;
			messages[contactUserId][Number(msgIndex)].text = txt;
			messages[contactUserId][Number(msgIndex)].isEdited = true;
			selectedMsg.querySelector(".chat-message-text").textContent = txt;
			if (!selectedMsg.querySelector(".chat-edited-label")) {
				const editedLabel = document.createElement("span");
				editedLabel.className = "chat-edited-label";
				editedLabel.textContent = "edited";
				const meta = selectedMsg.querySelector(".chat-message-meta");
				meta.prepend(editedLabel);
			}
			isEditing = false;

			resetInput();
		} else if (isForwarding) {
			const msgsToSend =
				forwardingMsgs.length > 0 ? forwardingMsgs : [forwardingMsg];
			// hide empty state before appending forwarded messages
			hideEmptyState();
			msgsToSend.forEach((msg) => {
				msg.index = messages[contactUserId].length;
				messages[contactUserId].push(msg);
				chatEl.appendChild(createMessage(msg));
			});
			forwardingMsgs = [];
			forwardingMsg = null;
			isForwarding = false;

			if (messageInput.value.trim() != "") {
				sendMessage();
			} else {
				resetInput();
			}
			scrollChatToBottom();
		} else {
			if (messageInput.value.trim() == "") {
				return;
			}
			const now = new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			});
			const txt = messageInput.value;
			const obj = {
				user: true,
				text: txt,
				time: now,
				isEdited: false,
				replyTo: replyTo,
			};
			obj.index = messages[contactUserId].length;
			obj.seen = false;

			// hide empty state before adding the first message
			hideEmptyState();
			messages[contactUserId].push(obj);
			const msg = createMessage(obj);
			chatEl.appendChild(msg);
			scrollChatToBottom();
			resetInput();

			replyTo = null;
		}
	}

	// Positioning context menu based on the clicked message and viewport space
	function openContextMenu(msg, e) {
		// If menu is already open we close it and if the same message is clicked again we don't open it again
		if (isMenuOpen) {
			if (msg.dataset.index == msgIndex) {
				closeContextMenu();
				return;
			}
			closeContextMenu();
		}

		msgIndex = msg.dataset.index;
		selectedMsg = msg;

		// For styling purposes
		if (messageMenu && chatOverlay) {
			messageMenu.style.display = "block";
			chatOverlay.style.display = "block";
			msg.style.zIndex = 500;
		}

		// If the message is pinned show "Unpin" in context menu, otherwise show "Pin"
		const pinned = document.querySelectorAll(".pin-message p");
		const pinIconEl = document.querySelector(".pin-message span");
		const isPinned = pinnedIndexes.includes(Number(msg.dataset.index));
		pinned[0].textContent = isPinned ? "Unpin" : "Pin";
		pinIconEl.innerHTML = isPinned ? unpinIcon : pinIconforMenu;


		// If a message is forwarded it can't be edited so we hide the edit option in context menu for forwarded messages
		const forwardedFrom = messages[contactUserId][msgIndex].forwardedFrom;
		editMsg[0].style.display =
			forwardedFrom === undefined ? "flex" : "none";

		// Positioning the menu
		const rect = msg.getBoundingClientRect();
		const menuHeight = messageMenu.getBoundingClientRect().height;

		let translateAmount = 0; // How much a message should go up when its on the bottom and context menu should show up

		if (window.innerHeight - rect.bottom < menuHeight) {
			translateAmount =
				menuHeight + rect.bottom - window.innerHeight + 24;
			msg.style.transform = `translateY(-${translateAmount}px)`;
		}

		messageMenu.style.top =
			rect.top + rect.height - translateAmount + basePadding + "px";
		if (msg.classList.contains("outgoing")) {
			messageMenu.style.right = window.innerWidth - rect.right + "px";
			messageMenu.style.left = "";
		} else {
			editMsg[0].style.display = "none";
			messageMenu.style.left = rect.left + "px";
			messageMenu.style.right = "";
		}
		isMenuOpen = true;

		// Adding a slight delay before showing the menu and overlay to allow the positioning to take effect without transition, otherwise it looks glitchy
		setTimeout(() => {
			messageMenu.style.opacity = 1;
			chatOverlay.style.opacity = 1;
		}, 100);

		// To prevent the click that opens the menu from also triggering the event listener on chatOverlay that closes the menu
		if (e && typeof e.stopPropagation === "function") {
			e.stopPropagation();
		}
	}

	// Closing ontext menu
	function closeContextMenu() {
		messageMenu.style.opacity = 0;
		chatOverlay.style.opacity = 0;
		editMsg[0].style.display = "flex";
		messageMenu.style.display = "none";
		chatOverlay.style.display = "none";
		selectedMsg.style.zIndex = 100;
		selectedMsg.style.transform = `translateY(0px)`;
		isMenuOpen = false;
	}

	// Highlight the messag that is pointed to
	function highlightMessage(msg) {
		const cls = msg.classList.contains("incoming")
			? "highlight-incoming-reply"
			: "highlight-outgoing-reply";
		msg.classList.add(cls);
		setTimeout(() => msg.classList.remove(cls), 500);
	}

	function deleteMessage (msg, index) {
		msg.style.transition = "opacity 3s ease";
		msg.style.opacity = 0;
		const timeout = setTimeout(() => {
			setTimeout(() => {
				messages[contactUserId].splice(Number(index), 1);
				msg.remove();
				// If after deletion the chat has no messages, show empty state
				if (Array.isArray(messages[contactUserId]) && messages[contactUserId].length === 0) {
					showEmptyState();
				}
			}, 310);
		}, 3000);
		return timeout;
	}

	function undoDeleteMessage (msg) {
		clearTimeout(deleting);
		msg.style.transition = "opacity 0.15s ease";
		msg.style.opacity = 1;
		setTimeout(() => {
			msg.style.transition = "";
		}, 150);
	}

	function buildForwardedMsg(originalMsg, targetContactId) {
		const senderName = originalMsg.user
			? "You"
			: contacts.find((c) => c.id === contactUserId).name;
		return {
			user: true,
			text: originalMsg.text,
			time: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			}),
			isEdited: false,
			replyTo: null,
			forwardedFrom: senderName,
			seen: false,
			index: messages[targetContactId].length,
		};
	}

	// Showing toast messages for actions like copy, delete, etc.
	function showToast(message, icon, showUndo = false) {
		toaster.style.display = "flex";
		toaster.style.bottom =
			messageContainer.getBoundingClientRect().height + 14 + "px";
		toaster.style.opacity = 1;
		toastMessage.textContent = message;
		toastIcon.innerHTML = icon;
		undoBtn.style.display = showUndo ? "block" : "none";
		setTimeout(() => {
			toaster.style.opacity = 0;
		}, 3000);
		setTimeout(() => {
			toaster.style.display = "none";
		}, 3150);
	}

	// Update the pinned message displayed in chat header based on the pinned message in the current chat
	function updatePinnedMessage() {
		const userMessages = messages[contactUserId];
		const pinnedMsg = userMessages.findLast((msg) => msg.isPinned);
		if (pinnedMsg) {
			pinnedMessageContainer.style.display = "flex";
			pinnedMessageText.textContent = pinnedMsg.text;
			pinnedMessageText.dataset.index = pinnedMsg.index;
			chatHeader.style.borderRadius = "1rem 1rem 0 0";
		} else {
			pinnedMessageContainer.style.display = "none";
			pinnedMessageText.textContent = "";
			pinnedMessageText.dataset.index = "";
			chatHeader.style.borderRadius = "1rem";
		}
		updatePinCount(pinnedMsg ? pinnedMsg.index : null);
	}

	// Update the number of pinned messages and their visual representation in the chat header based on the pinned messages in the current chat
	function updatePinCount(activeIdx) {
		// Clear the pin count container
		pinnedMessageCount.innerHTML = "";
		const total = Math.min(pinnedIndexes.length, 3);
		if (total === 0) return;

		const pos = pinnedIndexes.indexOf(activeIdx);

		// Map current position to visual span (0=top=oldest, total-1=bottom=newest)
		let activeSpan;
		if (pinnedIndexes.length <= 3) {
			activeSpan = pos;
		} else {
			if (pos === 0) activeSpan = 0;
			else if (pos === pinnedIndexes.length - 1) activeSpan = 2;
			else activeSpan = 1;
		}

		// Create spans for each pinned message, highlighting the active one
		for (let i = 0; i < total; i++) {
			const span = document.createElement("span");
			if (i === activeSpan) {
				span.style.height = "1.2rem";
				span.style.opacity = "1";
			} else {
				span.style.height = "0.6rem";
				span.style.opacity = "0.4";
			}
			pinnedMessageCount.appendChild(span);
		}
	}

	function enterSelectionMode(idx) {
		isSelecting = true;
		chatEl.classList.add("selection-mode");
		messageContainer.style.display = "none";
		selectionToolbar.style.display = "flex";
		selectedMessages = [idx];
		chatEl.querySelector(`[data-index="${idx}"]`).classList.add("selected");
		updateSelectionCount();
	}

	function cancelSelection() {
		isSelecting = false;
		chatEl.classList.remove("selection-mode");
		chatEl.querySelectorAll(".selected").forEach(m => m.classList.remove("selected"));
		selectedMessages = [];
		messageContainer.style.display = "flex";
		selectionToolbar.style.display = "none";
	}

	function updateSelectionCount() {
		selectionCount.textContent = `${selectedMessages.length} selected`;
	}

	function updateTotalUnreadCount() {
		const total = contacts.reduce((sum, c) => sum + c.unreadCount, 0);
		unreadMessageCount.textContent = total;
		unreadMessageCount.style.opacity = total === 0 ? "0" : "1";
	}

	function openProfile(friend) {
		detailPictures.forEach(el => el.src = friend.profilePics[0]);
		detailNames.forEach(el => el.textContent = friend.nickname || friend.name);
		detailBios.forEach(el => el.textContent = friend.bio || "");
		detailLastSeens.forEach(el => el.textContent = friend.isOnline
			? "Online"
			: friend.lastSeen
				? `Last seen ${friend.lastSeen}`
				: "");
		detailUsernames.forEach(el => el.textContent = "@" + friend.username);
		detailEmails.forEach(el => el.textContent = friend.email || "");

		// Show profile
		if (window.innerWidth > 700){
			// Desktop: Dialog is modal, no need to hide other elements
			if (profileDialog) {
				profileDialog.showModal();
			}
		} else {
			// Mobile: Show the div version
			contactProfileDetails.style.display = "flex";
			chatPart.style.display = "none";
			peoplePart.style.display = "none";
		}
	}

	// Openning settings by click when its on phone
	if (settingsBtn) {
		settingsBtn.addEventListener("click", (e) => {
			if (window.innerWidth < 700) {
				e.stopPropagation();
				settingsList.classList.toggle("open");
			}
		});
	}

	// Openning search bar by click when its on phone
	if (searchbar) {
		searchbar.addEventListener("click", (e) => {
			searchbar.classList.toggle("open");

			if (searchbar.classList.contains("open")) {
				searchInput.focus();
			}
		});
	}

	// For closing the chat
	if (closeChatBtn) {
		closeChatBtn.addEventListener("click", (e) => {
			e.stopPropagation(); 
			chatEl.innerHTML = "";

			// Update state
			const friend = contacts.find((c) => c.id === contactUserId);
			if (friend) {
				friend.isInChat = false;

				// If not pinned or have no unread message,then move it to contacts
				if (!friend.isPinned && friend.unreadCount === 0) {
					const activeCard = activeChatsContainer.querySelector(
						`[data-user-id="${contactUserId}"]`,
					);
					if (activeCard) {
						activeCard.remove();
						contactsContainer.appendChild(createContactCard(friend));
					}
				}
			}

			closeChat();
		});
	}
	// Logout
	if (logoutBtn) {
		logoutBtn.addEventListener("click", () => {
			sessionStorage.clear();
			window.location.href = "../auth/auth.html";
		});
	}

	// Oppening the chat
	if (activeChatsContainer) {
		activeChatsContainer.addEventListener("click", (e) => {
			const active = e.target.closest(".active-chat");
			if (!active) return;

			contactUserId = Number(active.dataset.userId);
			const friend = contacts.find((c) => c.id === contactUserId);
			if (!friend) {
				console.log("not found");
				return;
			}

			// Update contact states
			friend.unreadCount = 0;
			friend.isInChat = true;
				const unreadEl = active.querySelector(
					".active-chat-unread-messages",
				);
			if (unreadEl) unreadEl.style.opacity = "0";
			updateTotalUnreadCount();

			chatProfilePic.src = friend.profilePics[0];
			chatName.textContent = friend.name;
			openChat();
			injectMessages(contactUserId);
			scrollChatToBottom();

			// Update active card
			const existingCard = activeChatsContainer.querySelector(
				`[data-user-id="${friend.id}"]`,
			);
			if (existingCard) {
				existingCard.replaceWith(createActiveChatCard(friend));
			}
		});
	}

	if (contactsContainer) {
		contactsContainer.addEventListener("click", (e) => {
			const card = e.target.closest(".contacts-card");
			if (!card) return;

			contactUserId = Number(card.dataset.userId);
			const friend = contacts.find((c) => c.id === contactUserId);
			if (!friend) return;

			// Update contact states
			friend.unreadCount = 0;
			friend.isInChat = true;
			updateTotalUnreadCount();

			// Move contact to Active chat
			card.remove();
			activeChatsContainer.appendChild(createActiveChatCard(friend));

			// Open chat
			chatProfilePic.src = friend.profilePics[0];
			chatName.textContent = friend.name;
			openChat();
			injectMessages(contactUserId);
			scrollChatToBottom();
		});
	}

	// Controlling input behavior
	if (messageInput && sendMessageBtn && chatEl && messageContainer) {
		messageInput.addEventListener("input", () => {
			// See if user is near the bottom of chat
			const nearBottom =
				chatEl.scrollTop + chatEl.clientHeight >=
				chatEl.scrollHeight - 20;

			if (nearBottom) {
				scrollChatToBottom();
			}

			// Set text direction based on first character
			const firstChar = messageInput.value.trim()[0];
			if (firstChar) {
				messageInput.dir = /[\u0600-\u06FF]/.test(firstChar)
					? "rtl"
					: "ltr";
			}

			// Show send button if there's text, hide it otherwise
			if (messageInput.value.trim().length > 0) {
				sendMessageBtn.style.display = "block";
				if (cancelEditBtn.style.display == "block") {
					cancelEditBtn.style.display = "none";
				}
			} else {
				sendMessageBtn.style.display = "none";
			}

			// reset height to auto to get the correct scrollHeight
			messageInput.style.height = "auto";
			// real height
			let newHeight = messageInput.scrollHeight;

			if (newHeight > maxHeight) {
				newHeight = maxHeight;
				messageInput.style.overflowY = "auto";
			} else {
				messageInput.style.overflowY = "hidden";
			}

			messageInput.style.height = newHeight + "px";

			// Calculate number of lines and adjust chat padding and message container position accordingly
			let lines = Math.floor(messageInput.scrollHeight / lineHeight);

			if (lines < 1) lines = 1;
			if (lines > maxLines) lines = maxLines;

			if (lines < maxLines) {
				const offsetPerLine = 0.75;
				const offset = (lines - 1) * offsetPerLine;
				chatEl.style.paddingBottom =
					basePadding + 2 * offset + actionPreviewHeight + "rem";
			} else {
				const offset = (maxLines - 2) * 0.75 + 0.2;
				chatEl.style.paddingBottom =
					basePadding + 2 * offset + actionPreviewHeight + "rem";
			}
		});
		sendMessageBtn.addEventListener("click", () => {
			sendMessage();
		});
		messageInput.addEventListener("keydown", (e) => {
			if (e.key == "Enter" && !e.shiftKey && window.innerWidth > 700) {
				e.preventDefault();
				sendMessage();
			}
		});
	}

	// Opening context menu for every message that is selected & reply scrolls to the replied message when a reply is clicked
	if (
		chatEl &&
		messageMenu &&
		chatOverlay &&
		pinnedMessageContainer &&
		pinnedMessageText &&
		pinnedMessageCount &&
		scrollToBottomBtn
	) {
		chatEl.addEventListener("touchstart", (e) => {
			touchTimeout = setTimeout(() => {
				const msg = e.target.closest(".chat-message");
				if (!msg) return;

				openContextMenu(msg, e);
			}, 500);
		});

		chatEl.addEventListener("touchend", (e) => {
			if (isMenuOpen) {
				isMenuOpen = false;
				e.preventDefault();
				return;
			}
			clearTimeout(touchTimeout);
		});

		chatEl.addEventListener("contextmenu", (e) => {
			e.preventDefault();
			const msg = e.target.closest(".chat-message");
			if (!msg) return;

			openContextMenu(msg, e);
		});

		//  For scrolling to the replied message when a reply is clicked
		chatEl.addEventListener("click", (e) => {
			// selection mode
			if (isSelecting) {
				const msg = e.target.closest(".chat-message");
				if (!msg) return;
				const idx = Number(msg.dataset.index);
				msg.classList.toggle("selected");
				if (selectedMessages.includes(idx)) {
					selectedMessages = selectedMessages.filter(
						(i) => i !== idx,
					);
				} else {
					selectedMessages.push(idx);
				}
				if (selectedMessages.length === 0) cancelSelection();
				else updateSelectionCount();
				return; // prevent from reply scroll
			}

			// reply scroll
			const reply = e.target.closest(".chat-reply");
			if (!reply) return;
			const targetIndex = reply.dataset.replyTo;
			const targetMsg = chatEl.querySelector(
				`[data-index="${targetIndex}"]`,
			);
			if (targetMsg) {
				targetMsg.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
				highlightMessage(targetMsg);
			}
		});

		// For updating the pinned message in chat header when user scrolls through the chat and a new pinned message is in view
		chatEl.addEventListener("scroll", () => {
			if (isProgrammaticScroll) return;
			const distanceFromBottom =
				chatEl.scrollHeight - chatEl.scrollTop - chatEl.clientHeight;
			scrollToBottomBtn.classList.toggle(
				"visible",
				distanceFromBottom > 300,
			);
			if (pinnedIndexes.length === 0) return;
			for (let i = pinnedIndexes.length - 1; i >= 0; i--) {
				const idx = pinnedIndexes[i];
				const msg = chatEl.querySelector(`[data-index="${idx}"]`);
				if (!msg) continue;
				const rect = msg.getBoundingClientRect();
				const chatRect = chatEl.getBoundingClientRect();

				// Check if the pinned message is in view, if it is update the pinned message in header to it and break the loop, we loop from the end to get the most recent pinned message in view since there can be multiple pinned messages in a chat
				if (rect.top >= chatRect.top && rect.top <= chatRect.bottom) {
					pinnedMessageText.dataset.index = idx;
					pinnedMessageText.textContent =
						messages[contactUserId][idx].text;
					updatePinCount(idx);
					break;
				}
			}
		});
	}

	// Cancel action like edit or reply
	if (cancelEditBtn && msgAction) {
		cancelEditBtn.addEventListener("click", () => {
			isEditing = false;
			replyTo = null;
			isForwarding = false;
			forwardingMsg = null;
			forwardingMsgs = [];
			resetInput();
		});
	}

	// Clicking on pinned message in chat header scrolls to the message in chat and shows a brief highlight animation on it, clicking again scrolls to the next pinned message if there are multiple pins in the chat
	if (pinnedMessageContainer) {
		pinnedMessageContainer.addEventListener("click", () => {
			if (pinnedIndexes.length === 0) return;

			// Find current pin position and the previous pin position in the pinnedIndexes array (previous because we want to scroll to the next pin which is above the current one in the chat)
			const currentIdx = Number(pinnedMessageText.dataset.index);
			const pos = pinnedIndexes.indexOf(currentIdx);
			const prevPos =
				(pos - 1 + pinnedIndexes.length) % pinnedIndexes.length;

			// Scroll to current pin (what's shown in bar)
			const targetMsg = chatEl.querySelector(
				`[data-index="${currentIdx}"]`,
			);
			if (targetMsg) {
				isProgrammaticScroll = true; // To prevent the scroll event listener from updating the pin in header while we're programmatically scrolling to a pinned message
				targetMsg.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
				setTimeout(() => {
					isProgrammaticScroll = false;
				}, 800);

				// Highlight the message briefly
				highlightMessage(targetMsg);
			}

			// If there are multiple pinned messages and the user is not currently viewing the oldest pinned message, update the pin in header to the previous pin so that if they click again they can scroll to it, if they are already viewing the oldest pinned message keep the same pin in header so that if they click again it scrolls to the same message since there's no more pins above it
			const prevIdx = pinnedIndexes[prevPos];
			pinnedMessageText.textContent =
				messages[contactUserId][prevIdx].text;
			pinnedMessageText.dataset.index = prevIdx;

			// Animate the pin container to give feedback that the pin has changed
			pinnedMessageContainer.style.animation = "highlightPin 0.5s";
			setTimeout(() => {
				pinnedMessageContainer.style.animation = "";
			}, 500);
			updatePinCount(currentIdx);
		});
	}

	// Closing forward dialog and opening chat when a contact is selected to forward a message to
	if (forwardDialogCloseBtn && forwardDialog) {
		forwardDialogCloseBtn.addEventListener("click", () => {
			forwardDialog.close();
		});

		forwardDialog.addEventListener("click", (e) => {
			const contact = e.target.closest(".forwarded-contact-card");
			if (!contact) return;
			const userId = contact.dataset.userId;
			let forwardingContactId = Number(userId);
			const friend = contacts.find((c) => c.id === forwardingContactId);
			if (!friend) {
				console.log("not found");
				return;
			}

			if (isSelectionForwarding) {
				const sourceName =
					contacts.find((c) => c.id === contactUserId)?.name ||
					"Unknown";

				// ذخیره پیام‌ها برای فوروارد
				forwardingMsgs = [...selectedMessages]
					.sort((a, b) => a - b)
					.map((idx) =>
						buildForwardedMsg(
							messages[contactUserId][idx],
							friend.id,
						),
					);

				contactUserId = friend.id;
				isSelectionForwarding = false;
				cancelSelection();
				forwardDialog.close();

				chatProfilePic.src = friend.profilePics[0];
				chatName.textContent = friend.name;
				openChat();
				injectMessages(friend.id);
				scrollChatToBottom();

				// Show action preview
				msgAction.style.display = "flex";
				actionPreviewHeight =
					msgAction.getBoundingClientRect().height / 14;
				chatEl.style.paddingBottom =
					basePadding + actionPreviewHeight + "rem";
				msgActionText.textContent = "Forwarding from: " + sourceName;
				msgActionmsg.textContent = `${forwardingMsgs.length} messages`;
				messageInput.style.borderRadius = "0 0 2rem 2rem";
				sendMessageBtn.style.display = "block";
				isForwarding = true;

				return;
			}

			chatProfilePic.src = friend.profilePics[0];
			chatName.textContent = friend.name;
			openChat();
			injectMessages(friend.id);
			msgAction.style.display = "flex";
			actionPreviewHeight = msgAction.getBoundingClientRect().height / 14;
			chatEl.style.paddingBottom =
				basePadding + actionPreviewHeight + "rem";
			const senderName = messages[contactUserId][Number(msgIndex)].user
				? "You"
				: contacts.find((c) => c.id === contactUserId).name;
			msgActionText.textContent = "Forwarding message from " + senderName;
			msgActionmsg.textContent =
				messages[contactUserId][Number(msgIndex)].text;
			messageInput.style.borderRadius = "0 0 2rem 2rem";
			sendMessageBtn.style.display = "block";
			scrollChatToBottom();

			isForwarding = true;
			forwardingMsg = buildForwardedMsg(
				messages[contactUserId][Number(msgIndex)],
				friend.id,
			);
			forwardDialog.close();
			contactUserId = friend.id;
		});
	}

	// Scroll to bottom when scroll to bottom button is clicked
	if (scrollToBottomBtn) {
		scrollToBottomBtn.addEventListener("click", () => {
			scrollChatToBottom();
		});
	}

	if (cancelSelectionBtn) {
		cancelSelectionBtn.addEventListener("click", () => {
			cancelSelection();
		});
	}

	if (copyMsg) {
		copyMsg[0].addEventListener("click", () => {
			navigator.clipboard.writeText(
				messages[contactUserId][Number(msgIndex)].text,
			);
			showToast("Message copied", copyIcon);
			closeContextMenu();
		});
	}

	if (editMsg) {
		editMsg[0].addEventListener("click", () => {
			isEditing = true;
			messageInput.value = messages[contactUserId][Number(msgIndex)].text;
			messageInput.focus();
			msgAction.style.display = "flex";
			actionPreviewHeight = msgAction.getBoundingClientRect().height / 14;
			chatEl.style.paddingBottom =
				basePadding + actionPreviewHeight + "rem";
			msgActionText.textContent = "Edit";
			msgActionmsg.textContent =
				messages[contactUserId][Number(msgIndex)].text;
			closeContextMenu();
			const nearBottom =
				chatEl.scrollTop + chatEl.clientHeight >=
				chatEl.scrollHeight -
					msgAction.getBoundingClientRect().height -
					20;
			if (nearBottom) {
				scrollChatToBottom();
			}
			messageInput.style.borderRadius = "0 0 2rem 2rem";
			sendMessageBtn.style.display = "block";
		});
	}

	if (deleteMsg) {
		deleteMsg[0].addEventListener("click", () => {
			closeContextMenu();
			showToast("Message deleted", deleteIcon, true);
			deleting = deleteMessage(selectedMsg, msgIndex);
			currentUndoAction = () => undoDeleteMessage(selectedMsg);
		});
	}
	
	if (undoBtn) {
		undoBtn.addEventListener("click", () => {
			if (currentUndoAction) {
				currentUndoAction();
				currentUndoAction = null;
			}
			toaster.style.opacity = 0;
		});
	}

	if (selectionDeleteBtn) {
		selectionDeleteBtn.addEventListener("click", () => {
			const msgsToDelete = [...selectedMessages].sort(
				(a, b) => b - a,
			);
			cancelSelection();
			showToast(
				`${msgsToDelete.length} messages deleted`,
				deleteIcon,
				true,
			);

			msgsToDelete.forEach((idx) => {
				const msgEl = chatEl.querySelector(
					`[data-index="${idx}"]`,
				);
				if (msgEl)
					deletingTimeouts.push(deleteMessage(msgEl, idx));
			});

			currentUndoAction = () => {
				deletingTimeouts.forEach((t) => clearTimeout(t));
				deletingTimeouts = [];
				chatEl.querySelectorAll(".chat-message").forEach((m) => {
					if (parseFloat(m.style.opacity) < 1) {
						m.style.transition = "opacity 0.15s ease";
						m.style.opacity = 1;
						setTimeout(() => {
							m.style.transition = "";
						}, 150);
					}
				});
			};
		});
	}

	if (replyMsg) {
		replyMsg[0].addEventListener("click", () => {
			replyTo = null;
			msgAction.style.display = "flex";
			actionPreviewHeight =
				msgAction.getBoundingClientRect().height / 14;
			chatEl.style.paddingBottom =
				basePadding + actionPreviewHeight + "rem";
			const senderName = messages[contactUserId][Number(msgIndex)]
				.user
				? "You"
				: contacts.find((c) => c.id === contactUserId).name;
			msgActionText.textContent = "Replying to " + senderName;
			msgActionmsg.textContent =
				messages[contactUserId][Number(msgIndex)].text;
				messageInput.focus();
				messageInput.style.borderRadius = "0 0 2rem 2rem";
				replyTo = {};
				replyTo.text = messages[contactUserId][Number(msgIndex)].text;
				replyTo.sender = senderName;
				replyTo.index = Number(msgIndex);
				closeContextMenu();
				const nearBottom =
					chatEl.scrollTop + chatEl.clientHeight >=
					chatEl.scrollHeight -
						msgAction.getBoundingClientRect().height -
						20;
				if (nearBottom) {
					setTimeout( () => {
						scrollChatToBottom();
					}, 200)
				}
		});
	}

	if (forwardMsg) {
		forwardMsg[0].addEventListener("click", () => {
			closeContextMenu();
			forwardDialog.querySelector(".forwarded-contact-dialog").innerHTML =
				"";
			contacts.forEach((contact, index) => {
				const card = createForwardedContactCard({ ...contact });
				forwardDialog
					.querySelector(".forwarded-contact-dialog")
					.appendChild(card);
			});
			forwardDialog.showModal();
		});
	}
	
	if (selectionForwardBtn) {
		selectionForwardBtn.addEventListener("click", () => {
			isSelectionForwarding = true;
			forwardDialog.querySelector(".forwarded-contact-dialog").innerHTML =
				"";
			contacts.forEach((contact) => {
				const card = createForwardedContactCard({ ...contact });
				forwardDialog
					.querySelector(".forwarded-contact-dialog")
					.appendChild(card);
			});
			forwardDialog.showModal();
		});
	}

	if (pinMsg) {
		pinMsg[0].addEventListener("click", () => {
			const idx = Number(msgIndex);
			const msg = messages[contactUserId][idx];
			msg.isPinned = !msg.isPinned;

			const msgEl = chatEl.querySelector(`[data-index="${idx}"]`);
			const meta = msgEl.querySelector(".chat-message-meta");
			const existingIcon = msgEl.querySelector(".chat-pinned-icon");

			if (msg.isPinned) {
				if (!existingIcon) {
					const pinSpan = document.createElement("span");
					pinSpan.className = "chat-pinned-icon";
					pinSpan.innerHTML = pinIcon;
					if (msg.user) {
						meta.prepend(pinSpan);
					} else {
						meta.appendChild(pinSpan);
					}
				}
			} else {
				if (existingIcon) existingIcon.remove();
			}

			if (msg.isPinned) {
				pinnedIndexes.push(idx);
				pinnedIndexes.sort((a, b) => a - b);
			} else {
				pinnedIndexes = pinnedIndexes.filter((i) => i !== idx);
			}
			updatePinnedMessage();
			closeContextMenu();
		});
	}

	if (selectMsg) {
		selectMsg[0].addEventListener("click", () => {
			enterSelectionMode(Number(msgIndex));
			closeContextMenu();
		});
	}

	if (chatHeader) {
		chatHeader.addEventListener("click", () => {
			const friend = contacts.find((c) => c.id === contactUserId);
			if (!friend) return;
			openProfile(friend);
		});
	}

	// Button for closing profile dialog (desktop)
	const dialogCloseBtn = profileDialog?.querySelector(".contact-detail-pic button");
	if (dialogCloseBtn) {
		dialogCloseBtn.addEventListener("click", () => {
			profileDialog.close();
		});
	}

	// Button for closing profile details div (mobile)
	const detailsCloseBtn = document.querySelector(".parts > .contact-profile-details .contact-detail-pic button");
	if (detailsCloseBtn) {
		detailsCloseBtn.addEventListener("click", () => {
			contactProfileDetails.style.display = "none";
			const chatIsActive = contactUserId !== null;
			if (chatIsActive && window.innerWidth >= 700) {
				chatPart.style.display = "flex";
				peoplePart.style.display = "none";
			} else {
				peoplePart.style.display = "none";
				chatPart.style.display = "flex";
			}
		});
	}

	if (profileDialog) {
		profileDialog.addEventListener("close", () => {
			// Dialog closed - restores to normal state
			// people-part is already visible on desktop
		});
	}

	if (deleteChatBtns.length > 0) {
		deleteChatBtns.forEach(deleteChatBtn => {
			deleteChatBtn.addEventListener("click", () => {
				const contact = contacts.find((c) => c.id === contactUserId);
				if (!contact) return;

				// Close profile dialog if open (desktop)
				if (window.innerWidth > 700 && profileDialog) {
					profileDialog.close();
				}

				chatEl.innerHTML = "";
				closeChat();

				// مخفی کردن کارت
				const card =
					activeChatsContainer.querySelector(
						`[data-user-id="${contactUserId}"]`,
					) ||
					contactsContainer.querySelector(
						`[data-user-id="${contactUserId}"]`,
					);
				if (card) card.style.display = "none";

				showToast("Chat deleted", deleteIcon, true);

				const deletingContactId = contactUserId;

				const timer = setTimeout(() => {
					messages[deletingContactId] = [];
					contact.lastMessage = "";
					contact.lastMessageTime = "";
					contact.lastMessageSeen = true;
					contact.unreadCount = 0;
				contact.isPinned = false;
				contact.isInChat = false;

				if (card) card.remove();

				// اضافه کردن به ته contacts
				contactsContainer.appendChild(createContactCard(contact));

				updateTotalUnreadCount();
			}, 3000);

			currentUndoAction = () => {
				clearTimeout(timer);
				if (card) card.style.display = "";
			};
			});
		});
	}

	// Closing settings, search bar, etc if any of them are open by clicking anywhere in the body
	document.addEventListener("click", (e) => {
		// settings
		if (
			!settingsList.contains(e.target) &&
			!settingsBtn.contains(e.target)
		) {
			settingsList.classList.remove("open");
		}
		// searchbar
		if (!searchbar.contains(e.target)) {
			searchbar.classList.remove("open");
		}
		// Message menu
		if (
			messageMenu.style.display === "block" &&
			!messageMenu.contains(e.target)
		) {
			closeContextMenu();
		}
	});
});