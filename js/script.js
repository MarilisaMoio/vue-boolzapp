const { createApp } = Vue;

createApp({
    data() {
        return {
            contacts: [{
                name: 'Michele',
                avatar: '_1',
                visible: true,
                logged: false,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent',
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent',
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received',
                }],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                logged: false,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent',
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received',
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'received',
                }],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                logged: false,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received',
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent',
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received',
                }],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                logged: false,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent',
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received',
                }],
            }],
			activeChat: 0,
			writtenMessage: "",
			dateTime: luxon.DateTime,
			filterValue: "",
            isVisible: false,
            counterUnread: [
                [],
                [],
                [],
                [],
            ],
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

            this.contacts[thisSpecificChat].logged = true;
			newMessage.message = this.writtenMessage;
			newMessage.date = actualDateTime.setLocale("fr").toLocaleString(newFormat);
			newMessage.status = "sent";

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
                if(this.activeChat !== thisSpecificChat){
                    this.counterUnread[thisSpecificChat].push(newMessage);
                }

				this.contacts[thisSpecificChat].messages.push(newMessage);
                setTimeout(this.scrollDown, 50);
			}, 1000)
            setTimeout(() => {
                this.contacts[thisSpecificChat].logged = false;
            }, 3000)
		},
        everythingRead(){
            this.counterUnread[this.activeChat] = []
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
