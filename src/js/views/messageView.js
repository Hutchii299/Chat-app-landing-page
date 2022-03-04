// import image1 from '../../images/dog-image-1.jpg';
// import image2 from '../../images/dog-image-2.jpg';
// import image3 from '../../images/dog-image-3.jpg';



class MessageView {
    _parentElement = document.querySelector('.phone__messages');
    _bubble = document.querySelector('.loading-bubble');
    _dogImages = ['/src/images/dog-image-1.jpg', '/src/images/dog-image-2.jpg', '/src/images/dog-image-3.jpg'];
    _data;
    _messages;
    _messagesLoaded = 0;

    createMessages(data) {
        this._data = data;
        this._parentElement.insertAdjacentHTML('beforeend', this._generateMarkup().join(''));
        this._messages = Array.from(this._parentElement.querySelectorAll('.msg'));

        return this._messages.length;
    }

    loadMessage() {
        this._bubble.style.opacity = 0;
        this._messages[this._messagesLoaded].style.opacity = 1;
        this._messagesLoaded += 1;

        if (this._messagesLoaded + 1 > this._messages.length) return;
        if ((this._data[this._messagesLoaded].type === 'message' || this._data[this._messagesLoaded].type === 'pay') && this._data[this._messagesLoaded].align === 'left') {
            this._bubble.style.opacity = 1;
        }
    }

    loadBubble() {
        this._bubble.style.opacity = 1;
    }

    _generateMarkup() {
        return this._data.map(this._generateMarkupSwitch.bind(this));
    }

    _generateMarkupSwitch(element) {
        let markUp = '';
        if (element.type === 'message') {

            markUp = this._generateMessageComponent(element);
        }
        if (element.type === 'image') {
            markUp = this._generatePictureComponent(element);
        }
        if (element.type === 'pay') {

            markUp = this._generatePriceComponent(element);
        }

        return markUp;
    }

    _generateMessageComponent(element) {

        return `
            <div class="msg phone__messages-msg phone__messages-msg-${element.align} ">
                ${element.text}
            </div>
        `;
    }

    _generatePictureComponent(element) {
        return `
            <div class="msg phone__messages-image-container  ">
                ${element.photosSrc.map((_, index) => {
            return this._createImageMarkup(index);
        }).join('')}
            </div>
        `;
    }

    _createImageMarkup(index) {
        return `
            <img
            class="phone__messages-image-container-img"
            src="${this._dogImages[index]}"
            alt="doggy-${index}"
            />`
    }

    _generatePriceComponent(element) {
        return `
            <div class="msg phone__messages-pay ">
                <div class="phone__messages-pay__circle"></div>
                <p class="phone__messages-pay__text">${element.text}</p>
                <h2 class="phone__messages-pay__money">$${element.price}</h2>
            </div>
        `
    }

    addHanderInit(handler) {
        window.addEventListener('load', handler);
    }

}

export default new MessageView();