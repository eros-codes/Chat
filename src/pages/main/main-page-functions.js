import { createContactCard } from "../../components/contact-cards/contact-card.js";
import { createActiveChatCard } from "../../components/active-chats/active-chats.js";
import { createForwardedContactCard } from "../../components/contact-cards/contacts-forward.js";

import { state, contacts, messages } from "./js/state.js";
import {
	initToast,
	showToast,
	highlightMessage,
	createEmptyStateEl,
} from "./js/ui.js";
import {
	initChat,
	openChat,
	closeChat,
	injectMessages,
	sendMessage,
	resetInput,
	scrollChatToBottom,
	updatePinCount,
	basePadding,
	lineHeight,
	maxLines,
	maxHeight,
} from "./js/chat.js";
import {
	initChatLogic,
	updateTotalUnreadCount,
	moveToContacts,
	refreshCard,
	moveToActiveChats,
	sortActiveChats,
	sortContacts,
} from "./js/chat-logic.js";
import {
	initContextMenu,
	openContextMenu,
	closeContextMenu,
	deleteMessage,
	undoDeleteMessage,
	buildForwardedMsg,
	pinMessage,
	editMessage,
	replyMessage,
} from "./js/context-menu.js";
import {
	initSelection,
	enterSelectionMode,
	cancelSelection,
	updateSelectionCount,
	handleBulkDelete,
	prepareBulkForward,
	executeBulkForward,
} from "./js/selection.js";
import {
	initProfile,
	openProfile,
	closeProfile,
	handleDeleteChat,
	handleEditNickname,
	handleEditNicknameDone,
	handleEditNicknameCancel,
	handleBlockContact,
	handleDeleteContact,
} from "./js/profile.js";
import { initCardContextMenu } from "./js/card-context-menu.js";

document.addEventListener("DOMContentLoaded", function () {
	// ─── DOM references ───────────────────────────────────────────────────────
	const logoutBtn = document.getElementById("logout");
	const chatPart = document.getElementById("chat-part");
	const mainContent = document.getElementById("main-content");
	const peoplePart = document.getElementById("people-part");
	const chatEl = document.querySelector(".chat");
	const contactsContainer = document.querySelector(".contacts-container");
	const activeChatsContainer = document.querySelector(
		".active-chats-container",
	);
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
	const msgActionText = document.querySelector(
		".message-action-preview .action-name",
	);
	const msgActionmsg = document.querySelector(
		".message-action-preview .action-message-preview",
	);
	const toaster = document.querySelector(".toaster");
	const toastMessage = document.querySelector(".toast-message");
	const toastIcon = document.querySelector(".toast-icon");
	const undoBtn = document.querySelector(".undo-btn");
	const forwardDialog = document.querySelector(".forward-dialog");
	const forwardDialogCloseBtn = document.getElementById(
		"close-forward-dialog",
	);
	const pinnedMessageContainer = document.querySelector(
		".pinned-message-container",
	);
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
	const contactProfileDetails = document.querySelector(
		".contact-profile-details",
	);
	const profileDialog = document.querySelector(".profile-dialog");
	const detailsCloseBtn = document.querySelector(
		".parts > .contact-profile-details .contact-detail-pic button",
	);
	const detailPictures = document.querySelectorAll(".detail-picture img");
	const detailNames = document.querySelectorAll(".contact-detail-name h3");
	const detailBios = document.querySelectorAll(".contact-detail-name h6");
	const detailLastSeens = document.querySelectorAll(".contact-detail-name p");
	const detailUsernames = document.querySelectorAll("#contact-username h3");
	const detailEmails = document.querySelectorAll("#contact-email h3");
	const deleteChatBtns = document.querySelectorAll("#delete-chat-btn");
	const editNameBtns = document.querySelectorAll("#edit-name-btn");
	const editNameDoneBtn = document.querySelectorAll(
		".contact-detail-name #edit-name-done-btn",
	);
	const cancelEditNameBtn = document.querySelectorAll(
		".contact-detail-name #cancel-edit-name-btn",
	);
	const blockContactBtns = document.querySelectorAll("#block-contact-btn");
	const deleteContactBtns = document.querySelectorAll("#delete-contact-btn");
	const unblockActionBtn = document.querySelectorAll("#unblock-action-btn");

	// ─── SVG icons ────────────────────────────────────────────────────────────
	const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></g></svg>`;
	const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`;
	const pinIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M15.744 4.276c1.221-2.442 4.476-2.97 6.406-1.04l6.614 6.614c1.93 1.93 1.402 5.186-1.04 6.406l-6.35 3.176a1.5 1.5 0 0 0-.753.867l-1.66 4.983a2 2 0 0 1-3.312.782l-4.149-4.15l-6.086 6.087H4v-1.415l6.086-6.085l-4.149-4.15a2 2 0 0 1 .782-3.31l4.982-1.662a1.5 1.5 0 0 0 .868-.752z"/></svg>`;

	// ─── Empty state element ──────────────────────────────────────────────────
	const emptyStateEl = createEmptyStateEl();

	// ─── Init all modules ─────────────────────────────────────────────────────
	initToast({ toaster, messageContainer, toastMessage, toastIcon, undoBtn });

	initChat({
		chatPart,
		mainContent,
		peoplePart,
		chatEl,
		contactProfileDetails,
		messageInput,
		sendMessageBtn,
		msgAction,
		cancelEditBtn,
		pinnedMessageContainer,
		pinnedMessageText,
		pinnedMessageCount,
		chatHeader,
		emptyStateEl,
	});

	initChatLogic({
		activeChatsContainer,
		contactsContainer,
		unreadMessageCount,
		onContactAction: _onContactAction,
	});

	initContextMenu({
		messageMenu,
		chatOverlay,
		editMsg,
		chatEl,
		emptyStateEl,
		messageInput,
		sendMessageBtn,
		msgAction,
		msgActionText,
		msgActionmsg,
		cancelEditBtn,
	});

	initSelection({
		chatEl,
		messageContainer,
		selectionToolbar,
		selectionCount,
		forwardDialog,
		deleteIcon,
		emptyStateEl,
		chatProfilePic,
		chatName,
		msgAction,
		msgActionText,
		msgActionmsg,
		messageInput,
		sendMessageBtn,
	});

	initProfile({
		contactProfileDetails,
		profileDialog,
		chatPart,
		peoplePart,
		detailPictures,
		detailNames,
		detailBios,
		detailLastSeens,
		detailUsernames,
		detailEmails,
		editNameDoneBtn,
		cancelEditNameBtn,
		chatEl,
		chatName,
		chatProfilePic,
		activeChatsContainer,
		contactsContainer,
		deleteIcon,
		onContactAction: _onContactAction,
	});

	initCardContextMenu(activeChatsContainer, (action, userId) => {
		state.contactUserId = userId;
		const friend = contacts.find((c) => c.id === userId);
		if (!friend) return;

		if (action === "pin") {
			friend.isPinned = !friend.isPinned;
			if (friend.isPinned) {
				moveToActiveChats(friend);
			} else {
				if (
					friend.unreadCount === 0 &&
					friend.lastMessageSeen !== false
				) {
					moveToContacts(friend);
				} else {
					refreshCard(friend);
				}
			}
			sortActiveChats();
			sortContacts();
		}
		if (action === "mute") {
			friend.isMuted = !friend.isMuted;
			refreshCard(friend);
		}
		if (action === "delete") {
			handleDeleteChat();
		}
	});

	function _onContactAction(action, userId) {
		state.contactUserId = userId;
		const friend = contacts.find((c) => c.id === userId);
		if (!friend) return;
		if (action === "pin") {
			friend.isPinned = !friend.isPinned;
			if (friend.isPinned) {
				moveToActiveChats(friend);
			} else {
				if (
					friend.unreadCount === 0 &&
					friend.lastMessageSeen !== false
				) {
					moveToContacts(friend);
				} else {
					refreshCard(friend);
				}
			}
			sortActiveChats();
			sortContacts();
		}
		if (action === "mute") {
			friend.isMuted = !friend.isMuted;
			refreshCard(friend);
		}
		if (action === "delete") {
			handleDeleteChat();
		}
		if (action === "block") {
			handleBlockContact();
			refreshCard(friend);
		}
	}

	// ─── Inject initial cards ─────────────────────────────────────────────────
	contacts.forEach((contact) => {
		if (
			contact.isPinned ||
			contact.unreadCount > 0 ||
			contact.lastMessageSeen === false
		) {
			activeChatsContainer.appendChild(createActiveChatCard(contact));
		} else {
			contactsContainer.appendChild(
				createContactCard(
					{ ...contact, hasMessages: !!contact.lastMessage },
					_onContactAction,
				),
			);
		}
		if (contact.isBlocked === true) {
			messageContainer.style.display = "none";
			unblockActionBtn[0].style.display = "flex";
		} else {
			messageContainer.style.display = "flex";
			unblockActionBtn[0].style.display = "none";
		}
	});
	updateTotalUnreadCount();

	// ─── Settings ─────────────────────────────────────────────────────────────
	if (settingsBtn) {
		settingsBtn.addEventListener("click", (e) => {
			if (window.innerWidth < 700) {
				e.stopPropagation();
				settingsList.classList.toggle("open");
			}
		});
	}

	if (searchInput) {
		searchbar.addEventListener("click", () => {
			searchbar.classList.toggle("open");
			if (searchbar.classList.contains("open")) searchInput.focus();
		});
		searchInput.addEventListener("input", () => {
			const query = searchInput.value.trim().toLowerCase();

			activeChatsContainer
				.querySelectorAll(".active-chat-wrapper")
				.forEach((wrapper) => {
					const card = wrapper.querySelector(".active-chat");
					if (!card) return;
					const friend = contacts.find(
						(c) => c.id === Number(card.dataset.userId),
					);
					if (!friend) return;
					const name = (friend.nickname || friend.name).toLowerCase();
					wrapper.style.display = name.includes(query) ? "" : "none";
				});

			contactsContainer
				.querySelectorAll(".contacts-card")
				.forEach((card) => {
					const friend = contacts.find(
						(c) => c.id === Number(card.dataset.userId),
					);
					if (!friend) return;
					const name = (friend.nickname || friend.name).toLowerCase();
					card.style.display = name.includes(query) ? "" : "none";
				});

			const activeHeader = activeChatsContainer.querySelector(".guid");
			if (activeHeader) {
				const allHidden = [
					...activeChatsContainer.querySelectorAll(
						".active-chat-wrapper",
					),
				].every((w) => w.style.display === "none");
				activeHeader.style.display = allHidden ? "none" : "";
			}

			const contactHeader = contactsContainer.querySelector(".guid");
			if (contactHeader) {
				const allHidden = [
					...contactsContainer.querySelectorAll(".contacts-card"),
				].every((c) => c.style.display === "none");
				contactHeader.style.display = allHidden ? "none" : "";
			}
		});
	}

	if (logoutBtn) {
		logoutBtn.addEventListener("click", () => {
			sessionStorage.clear();
			window.location.href = "../auth/auth.html";
		});
	}

	// ─── Close chat ───────────────────────────────────────────────────────────
	if (closeChatBtn) {
		closeChatBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			chatEl.innerHTML = "";
			const friend = contacts.find((c) => c.id === state.contactUserId);
			if (friend) {
				friend.isInChat = false;
				if (
					!friend.isPinned &&
					friend.unreadCount === 0 &&
					friend.lastMessageSeen !== false
				) {
					moveToContacts(friend);
					sortActiveChats();
					sortContacts();
				}
			}
			closeChat();
		});
	}

	// ─── Open chat — active-chats ─────────────────────────────────────────────
	if (activeChatsContainer) {
		activeChatsContainer.addEventListener("click", (e) => {
			const active = e.target.closest(".active-chat");
			if (!active) return;

			state.contactUserId = Number(active.dataset.userId);
			const friend = contacts.find((c) => c.id === state.contactUserId);
			if (!friend) return;

			friend.unreadCount = 0;
			friend.isInChat = true;
			const unreadEl = active.querySelector(
				".active-chat-unread-messages",
			);
			if (unreadEl) unreadEl.style.opacity = "0";
			updateTotalUnreadCount();

			chatProfilePic.src = friend.profilePics[0];
			chatName.textContent = friend.nickname || friend.name;
			openChat();
			injectMessages(state.contactUserId);
			scrollChatToBottom();

			if (friend.isBlocked) {
				messageContainer.style.display = "none";
				unblockActionBtn[0].style.display = "flex";
			} else {
				messageContainer.style.display = "flex";
				unblockActionBtn[0].style.display = "none";
			}

			const existingCard = activeChatsContainer.querySelector(
				`[data-user-id="${friend.id}"]`,
			);
			if (existingCard) {
				const wrapper =
					existingCard.closest(".active-chat-wrapper") ??
					existingCard;
				wrapper.replaceWith(createActiveChatCard(friend));
			}
		});
	}

	// ─── Open chat — contacts ─────────────────────────────────────────────────
	if (contactsContainer) {
		contactsContainer.addEventListener("click", (e) => {
			const card = e.target.closest(".contacts-card");
			if (!card) return;

			state.contactUserId = Number(card.dataset.userId);
			const friend = contacts.find((c) => c.id === state.contactUserId);
			if (!friend) return;

			friend.unreadCount = 0;
			friend.isInChat = true;
			updateTotalUnreadCount();

			card.remove();
			activeChatsContainer.appendChild(createActiveChatCard(friend));

			chatProfilePic.src = friend.profilePics[0];
			chatName.textContent = friend.nickname || friend.name;
			openChat();
			if (friend.isBlocked) {
				messageContainer.style.display = "none";
				unblockActionBtn[0].style.display = "flex";
			} else {
				messageContainer.style.display = "flex";
				unblockActionBtn[0].style.display = "none";
			}
			injectMessages(state.contactUserId);
			scrollChatToBottom();
		});
	}

	// ─── Message input ────────────────────────────────────────────────────────
	if (messageInput && sendMessageBtn && chatEl && messageContainer) {
		messageInput.addEventListener("input", () => {
			const nearBottom =
				chatEl.scrollTop + chatEl.clientHeight >=
				chatEl.scrollHeight - 20;
			if (nearBottom) scrollChatToBottom();

			const firstChar = messageInput.value.trim()[0];
			if (firstChar)
				messageInput.dir = /[\u0600-\u06FF]/.test(firstChar)
					? "rtl"
					: "ltr";

			if (messageInput.value.trim().length > 0) {
				sendMessageBtn.style.display = "block";
				if (cancelEditBtn.style.display === "block")
					cancelEditBtn.style.display = "none";
			} else {
				sendMessageBtn.style.display = "none";
			}

			messageInput.style.height = "auto";
			let newHeight = messageInput.scrollHeight;
			if (newHeight > maxHeight) {
				newHeight = maxHeight;
				messageInput.style.overflowY = "auto";
			} else {
				messageInput.style.overflowY = "hidden";
			}
			messageInput.style.height = newHeight + "px";

			let lines = Math.floor(messageInput.scrollHeight / lineHeight);
			if (lines < 1) lines = 1;
			if (lines > maxLines) lines = maxLines;

			if (lines < maxLines) {
				chatEl.style.paddingBottom =
					basePadding +
					2 * (lines - 1) * 0.75 +
					state.actionPreviewHeight +
					"rem";
			} else {
				chatEl.style.paddingBottom =
					basePadding +
					2 * ((maxLines - 2) * 0.75 + 0.2) +
					state.actionPreviewHeight +
					"rem";
			}
		});

		sendMessageBtn.addEventListener("click", sendMessage);
		messageInput.addEventListener("keydown", (e) => {
			if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 700) {
				e.preventDefault();
				sendMessage();
			}
		});
	}

	// ─── Chat area events ─────────────────────────────────────────────────────
	if (
		chatEl &&
		messageMenu &&
		chatOverlay &&
		pinnedMessageContainer &&
		scrollToBottomBtn
	) {
		chatEl.addEventListener("touchstart", (e) => {
			state.touchTimeout = setTimeout(() => {
				const msg = e.target.closest(".chat-message");
				if (!msg) return;
				openContextMenu(msg, e);
			}, 500);
		});

		chatEl.addEventListener("touchend", (e) => {
			if (state.isMenuOpen) {
				state.isMenuOpen = false;
				e.preventDefault();
				return;
			}
			clearTimeout(state.touchTimeout);
		});

		chatEl.addEventListener("contextmenu", (e) => {
			e.preventDefault();
			const msg = e.target.closest(".chat-message");
			if (!msg) return;
			openContextMenu(msg, e);
		});

		chatEl.addEventListener("click", (e) => {
			if (state.isSelecting) {
				const msg = e.target.closest(".chat-message");
				if (!msg) return;
				const idx = Number(msg.dataset.index);
				msg.classList.toggle("selected");
				if (state.selectedMessages.includes(idx)) {
					state.selectedMessages = state.selectedMessages.filter(
						(i) => i !== idx,
					);
				} else {
					state.selectedMessages.push(idx);
				}
				if (state.selectedMessages.length === 0) cancelSelection();
				else updateSelectionCount();
				return;
			}

			const reply = e.target.closest(".chat-reply");
			if (!reply) return;
			const targetMsg = chatEl.querySelector(
				`[data-index="${reply.dataset.replyTo}"]`,
			);
			if (targetMsg) {
				targetMsg.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
				highlightMessage(targetMsg);
			}
		});

		chatEl.addEventListener("scroll", () => {
			if (state.isProgrammaticScroll) return;
			const distanceFromBottom =
				chatEl.scrollHeight - chatEl.scrollTop - chatEl.clientHeight;
			scrollToBottomBtn.classList.toggle(
				"visible",
				distanceFromBottom > 300,
			);

			if (state.pinnedIndexes.length === 0) return;
			for (let i = state.pinnedIndexes.length - 1; i >= 0; i--) {
				const idx = state.pinnedIndexes[i];
				const msg = chatEl.querySelector(`[data-index="${idx}"]`);
				if (!msg) continue;
				const rect = msg.getBoundingClientRect();
				const chatRect = chatEl.getBoundingClientRect();
				if (rect.top >= chatRect.top && rect.top <= chatRect.bottom) {
					pinnedMessageText.dataset.index = idx;
					pinnedMessageText.textContent =
						messages[state.contactUserId][idx].text;
					updatePinCount(idx);
					break;
				}
			}
		});
	}

	// ─── Cancel edit / reply / forward ───────────────────────────────────────
	if (cancelEditBtn && msgAction) {
		cancelEditBtn.addEventListener("click", () => {
			state.isEditing = false;
			state.replyTo = null;
			state.isForwarding = false;
			state.forwardingMsg = null;
			state.forwardingMsgs = [];
			resetInput();
		});
	}

	// ─── Pinned message bar ───────────────────────────────────────────────────
	if (pinnedMessageContainer) {
		pinnedMessageContainer.addEventListener("click", () => {
			if (state.pinnedIndexes.length === 0) return;

			const currentIdx = Number(pinnedMessageText.dataset.index);
			const pos = state.pinnedIndexes.indexOf(currentIdx);
			const prevPos =
				(pos - 1 + state.pinnedIndexes.length) %
				state.pinnedIndexes.length;

			const targetMsg = chatEl.querySelector(
				`[data-index="${currentIdx}"]`,
			);
			if (targetMsg) {
				state.isProgrammaticScroll = true;
				targetMsg.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
				setTimeout(() => {
					state.isProgrammaticScroll = false;
				}, 800);
				highlightMessage(targetMsg);
			}

			const prevIdx = state.pinnedIndexes[prevPos];
			pinnedMessageText.textContent =
				messages[state.contactUserId][prevIdx].text;
			pinnedMessageText.dataset.index = prevIdx;

			pinnedMessageContainer.style.animation = "highlightPin 0.5s";
			setTimeout(() => {
				pinnedMessageContainer.style.animation = "";
			}, 500);
			updatePinCount(currentIdx);
		});
	}

	// ─── Forward dialog ───────────────────────────────────────────────────────
	if (forwardDialogCloseBtn && forwardDialog) {
		forwardDialogCloseBtn.addEventListener("click", () =>
			forwardDialog.close(),
		);

		forwardDialog.addEventListener("click", (e) => {
			const card = e.target.closest(".forwarded-contact-card");
			if (!card) return;

			const friend = contacts.find(
				(c) => c.id === Number(card.dataset.userId),
			);
			if (!friend) return;

			if (state.isSelectionForwarding) {
				const sourceName =
					contacts.find((c) => c.id === state.contactUserId)?.name ??
					"Unknown";
				executeBulkForward(friend, sourceName);
				return;
			}

			// Single message forward
			const senderName = messages[state.contactUserId][
				Number(state.msgIndex)
			].user
				? "You"
				: contacts.find((c) => c.id === state.contactUserId)?.name;

			chatProfilePic.src = friend.profilePics[0];
			chatName.textContent = friend.nickname || friend.name;
			openChat();
			if (friend.isBlocked) {
				messageContainer.style.display = "none";
				unblockActionBtn[0].style.display = "flex";
				return;
			} else {
				messageContainer.style.display = "flex";
				unblockActionBtn[0].style.display = "none";
			}
			injectMessages(friend.id);

			msgAction.style.display = "flex";
			state.actionPreviewHeight =
				msgAction.getBoundingClientRect().height / 14;
			chatEl.style.paddingBottom =
				basePadding + state.actionPreviewHeight + "rem";
			msgActionText.textContent = "Forwarding message from " + senderName;
			msgActionmsg.textContent =
				messages[state.contactUserId][Number(state.msgIndex)].text;
			messageInput.style.borderRadius = "0 0 2rem 2rem";
			sendMessageBtn.style.display = "block";
			scrollChatToBottom();

			state.isForwarding = true;
			state.forwardingMsg = buildForwardedMsg(
				messages[state.contactUserId][Number(state.msgIndex)],
				friend.id,
			);
			forwardDialog.close();
			state.contactUserId = friend.id;
		});
	}

	// ─── Scroll to bottom ─────────────────────────────────────────────────────
	if (scrollToBottomBtn) {
		scrollToBottomBtn.addEventListener("click", scrollChatToBottom);
	}

	// ─── Undo ─────────────────────────────────────────────────────────────────
	if (undoBtn) {
		undoBtn.addEventListener("click", () => {
			if (state.currentUndoAction) {
				state.currentUndoAction();
				state.currentUndoAction = null;
			}
			toaster.style.opacity = 0;
		});
	}

	// ─── Context menu actions ─────────────────────────────────────────────────
	if (copyMsg[0]) {
		copyMsg[0].addEventListener("click", () => {
			navigator.clipboard.writeText(
				messages[state.contactUserId][Number(state.msgIndex)].text,
			);
			showToast("Message copied", copyIcon);
			closeContextMenu();
		});
	}

	if (editMsg[0]) editMsg[0].addEventListener("click", editMessage);
	if (replyMsg[0]) replyMsg[0].addEventListener("click", replyMessage);
	if (pinMsg[0])
		pinMsg[0].addEventListener("click", () => pinMessage(pinIcon));

	if (deleteMsg[0]) {
		deleteMsg[0].addEventListener("click", () => {
			closeContextMenu();

			const friend = contacts.find((c) => c.id === state.contactUserId);
			const prevLastMessage = friend?.lastMessage;
			const prevLastMessageTime = friend?.lastMessageTime;
			const prevLastMessageSeen = friend?.lastMessageSeen;

			state.deleting = deleteMessage(state.selectedMsg, state.msgIndex);

			if (friend) {
				const remaining = messages[state.contactUserId].filter(
					(_, i) => i !== Number(state.msgIndex),
				);
				if (remaining.length > 0) {
					const lastMsg = remaining.at(-1);
					friend.lastMessage = lastMsg.text;
					friend.lastMessageTime = lastMsg.time;
					friend.lastMessageSeen = lastMsg.user ? false : true;
				} else {
					friend.lastMessage = "";
					friend.lastMessageTime = "";
					friend.lastMessageSeen = true;
				}
				refreshCard(friend);
				sortActiveChats();
				sortContacts();
				if (
					!friend.isPinned &&
					friend.unreadCount === 0 &&
					friend.lastMessageSeen === true
				) {
					moveToContacts(friend);
					sortActiveChats();
					sortContacts();
				}
			}

			state.currentUndoAction = () => {
				undoDeleteMessage(state.selectedMsg);
				if (friend) {
					friend.lastMessage = prevLastMessage;
					friend.lastMessageTime = prevLastMessageTime;
					friend.lastMessageSeen = prevLastMessageSeen;

					const isInContacts = contactsContainer.querySelector(
						`[data-user-id="${friend.id}"]`,
					);
					if (isInContacts) {
						moveToActiveChats(friend);
					} else {
						refreshCard(friend);
					}
					sortActiveChats();
					sortContacts();
				}
			};

			showToast("Message deleted", deleteIcon, true);
		});
	}

	if (forwardMsg[0]) {
		forwardMsg[0].addEventListener("click", () => {
			closeContextMenu();
			forwardDialog.querySelector(".forwarded-contact-dialog").innerHTML =
				"";
			contacts.forEach((contact) => {
				forwardDialog
					.querySelector(".forwarded-contact-dialog")
					.appendChild(createForwardedContactCard({ ...contact }));
			});
			forwardDialog.showModal();
		});
	}

	if (selectMsg[0]) {
		selectMsg[0].addEventListener("click", () => {
			enterSelectionMode(Number(state.msgIndex));
			closeContextMenu();
		});
	}

	// ─── Selection toolbar ────────────────────────────────────────────────────
	if (cancelSelectionBtn)
		cancelSelectionBtn.addEventListener("click", cancelSelection);
	if (selectionDeleteBtn)
		selectionDeleteBtn.addEventListener("click", handleBulkDelete);
	if (selectionForwardBtn)
		selectionForwardBtn.addEventListener("click", prepareBulkForward);

	// ─── Chat header → profile ────────────────────────────────────────────────
	if (chatHeader) {
		chatHeader.addEventListener("click", () => {
			const friend = contacts.find((c) => c.id === state.contactUserId);
			if (!friend) return;
			openProfile(friend);
		});
	}

	// ─── Profile actions ──────────────────────────────────────────────────────
	if (detailsCloseBtn)
		detailsCloseBtn.addEventListener("click", closeProfile);
	if (deleteChatBtns.length > 0)
		deleteChatBtns.forEach((b) =>
			b.addEventListener("click", handleDeleteChat),
		);
	if (editNameBtns.length > 0)
		editNameBtns.forEach((b) =>
			b.addEventListener("click", handleEditNickname),
		);
	if (editNameDoneBtn.length > 0)
		editNameDoneBtn.forEach((b) =>
			b.addEventListener("click", handleEditNicknameDone),
		);
	if (cancelEditNameBtn.length > 0)
		cancelEditNameBtn.forEach((b) =>
			b.addEventListener("click", handleEditNicknameCancel),
		);
	if (blockContactBtns.length > 0)
		blockContactBtns.forEach((b) =>
			b.addEventListener("click", handleBlockContact),
		);
	if (unblockActionBtn.length > 0)
		unblockActionBtn.forEach((b) =>
			b.addEventListener("click", handleBlockContact),
		);
	if (deleteContactBtns.length > 0)
		deleteContactBtns.forEach((b) =>
			b.addEventListener("click", handleDeleteContact),
		);

	// ─── Global click ─────────────────────────────────────────────────────────
	document.addEventListener("click", (e) => {
		if (
			!settingsList.contains(e.target) &&
			!settingsBtn.contains(e.target)
		) {
			settingsList.classList.remove("open");
		}
		if (!searchbar.contains(e.target)) {
			searchbar.classList.remove("open");
			searchInput.value = "";
			activeChatsContainer
				.querySelectorAll(".active-chat-wrapper")
				.forEach((w) => (w.style.display = ""));
			contactsContainer
				.querySelectorAll(".contacts-card")
				.forEach((c) => (c.style.display = ""));
		}
		if (
			messageMenu.style.display === "block" &&
			!messageMenu.contains(e.target)
		) {
			closeContextMenu();
		}
		if (forwardDialog.contains(e.target) && forwardDialog.open) {
			forwardDialog.close();
		}
		if (state.isProfileDialogOpen && profileDialog.contains(e.target)) {
			closeProfile();
		}
		activeChatsContainer
			.querySelectorAll(".active-chat-wrapper")
			.forEach((wrapper) => {
				const card = wrapper.querySelector(".active-chat");
				if (!card) return;
				const transform = card.style.transform;
				if (
					transform &&
					transform !== "translateX(0px)" &&
					transform !== ""
				) {
					card.style.transition = "all 0.25s ease";
					card.style.transform = "translateX(0)";
				}
			});
	});
});
