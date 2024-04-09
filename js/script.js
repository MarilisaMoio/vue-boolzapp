const { createApp } = Vue;

createApp({
    data() {
        return {
            contacts: [{
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent',
                    read: "true",
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent',
                    read: "true",
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received',
                    read: "true",
                }],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent',
                    read: "true",
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received',
                    read: "true",
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'received',
                    read: "true",
                }],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received',
                    read: "true",
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent',
                    read: "true",
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received',
                    read: "true",
                }],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent',
                    read: "true",
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received',
                    read: "true",
                }],
            }],
			activeChat: 0,
			writtenMessage: "",
			dateTime: luxon.DateTime,
			filterValue: "",
            isVisible: false,
            isLogged: false,
        };
    },
    methods: {
		thisIsActive(index){
			this.activeChat = index;
		},
		sendNewMessage(){
			const actualDateTime = this.dateTime.now();
			const newMessage = {}
			const newFormat = { ...this.dateTime.DATE_SHORT, ...this.dateTime.DATETIME_SHORT_WITH_SECONDS}
            const thisSpecificChat = this.activeChat;

            this.isLogged = true;
			newMessage.message = this.writtenMessage;
			newMessage.date = actualDateTime.setLocale("fr").toLocaleString(newFormat);
			newMessage.status = "sent";
            newMessage.read = "true";

			this.contacts[thisSpecificChat].messages.push(newMessage);
            setTimeout(this.scrollDown, 50);
			this.writtenMessage = ""
			setTimeout(() => {
				const respondDateTime = this.dateTime.now();
				const newMessage = {}
                const randomResponse = ["Ok", "Dai, va bene", "Ora non posso parlare, ci sentiamo dopo", "Daje", "Sì, a dopo", "Forza Ascoli", "Ne parliamo poi"]
				const randomNumber = Math.ceil(Math.random() * (randomResponse.length - 1));

				newMessage.message = randomResponse[randomNumber];
				
				newMessage.date = respondDateTime.setLocale("fr").toLocaleString(newFormat);
				newMessage.status = "received";
                console.log(this.activeChat)
                newMessage.read = this.activeChat === thisSpecificChat ? true : false;

				this.contacts[thisSpecificChat].messages.push(newMessage);
                console.log(newMessage)
                setTimeout(this.scrollDown, 50);
                setTimeout(() => {
                    const respondDateTime = this.dateTime.now();
                    const newMessage = {}
                    const randomResponse = ["Ok", "Dai, va bene", "Ora non posso parlare, ci sentiamo dopo", "Daje", "Sì, a dopo", "Forza Ascoli", "Ne parliamo poi"]
                    const randomNumber = Math.ceil(Math.random() * (randomResponse.length - 1));
    
                    newMessage.message = randomResponse[randomNumber];
                    
                    newMessage.date = respondDateTime.setLocale("fr").toLocaleString(newFormat);
                    newMessage.status = "received";
                    console.log(this.activeChat)
                    newMessage.read = this.activeChat === thisSpecificChat ? true : false;
    
                    this.contacts[thisSpecificChat].messages.push(newMessage);
                    console.log(newMessage)
                    setTimeout(this.scrollDown, 50);
                }, 1000)
			}, 2000)
            setTimeout(() => {
                this.isLogged = false;
            }, 3000)
		},
        notRead(index){
            const unread = this.contacts[index].messages.filter((message) => !message.read);
            return unread.length;
        },
        everythingRead(){
            this.contacts[this.activeChat].messages.forEach((message) => {
                message.read = true;
            })
        },
        scrollDown(){
            const chat = document.querySelector(".chat");
            chat.scrollTop = chat.scrollHeight;
        },
		filterContacts(){
            this.contacts.forEach((contact) => {
                lowerName = contact.name.toLowerCase();
				contact.visible = lowerName.includes(this.filterValue.toLowerCase());
			})
		},
        visibilityOn(){
            this.isVisible = true;
        },
        visibilityOff(){
            this.isVisible = false;
        },
		eliminateMsg(activeChat, index){
            this.visibilityOff()
            this.contacts[activeChat].messages.splice(index, 1);
		},
        clearFilter(){
            this.filterValue = ""
        }
    }
}).mount('#app');
