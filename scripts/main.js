let ham_menu = document.querySelector('.nav');
let ham_btn = document.getElementById('checkbox4');
let slideIndex = 1; //SLIDER
const btn_subm = document.querySelector('.btn_subm'); //Кнопка отправки
let btn_status = document.querySelector('.btn-status');

function hamchange(){
    //click hamburger
    ham_menu.classList.toggle('active-nav');
}
function changeSize(){
    //change width
    changeScroll();
    if(document.documentElement.clientWidth >= 610 && ham_btn.checked){
        ham_btn.checked = false;
        hamchange();
    }
}
function changeScroll(){
    //scrolling window
    let top_logo = document.querySelector('.logo').style;
    let top_menu = document.querySelector('.top-menu');
    let menu = document.querySelector('.menu').style;
    let top_contact = document.querySelector('.top-contact').style;
    // console.log(pageYOffset);

    
    if(pageYOffset > 96 && document.documentElement.clientWidth >= 1060){
        top_logo.height = '40px';
        top_menu.classList.add('menu-scroll');
        top_menu.classList.add('menu-scroll-anim');
        top_contact.display = 'none';
        menu.marginTop = '0';
        ham_menu.classList.remove('m-menu-scroll');
        top_logo.display = 'block';
        document.body.style.marginTop = '96px';
    }else if (pageYOffset > 136 && document.documentElement.clientWidth < 1060 && document.documentElement.clientWidth > 440){
        top_logo.display = 'none';
        top_menu.classList.add('menu-scroll');
        top_menu.classList.add('menu-scroll-anim');
        top_contact.display = 'none';
        menu.marginTop = '0';
        document.body.style.marginTop = '136px';
        if(document.documentElement.clientWidth <= 650){
            ham_menu.classList.add('m-menu-scroll');
        }else{
            ham_menu.classList.remove('m-menu-scroll');
        }
    }else if (pageYOffset > 216 && document.documentElement.clientWidth < 440){
        top_logo.display = 'none';
        top_menu.classList.add('menu-scroll');
        top_contact.display = 'none';
        menu.marginTop = '0';
        document.body.style.marginTop = '216px';
        ham_menu.classList.add('m-menu-scroll');
        top_menu.classList.add('menu-scroll-anim');
    }else{
        top_logo.height = '70px';
        top_menu.classList.remove('menu-scroll');
        top_contact.display = 'flex';
        top_logo.display = 'block';
        ham_menu.classList.remove('m-menu-scroll');
        document.body.style.marginTop = '0px';
        top_menu.classList.remove('menu-scroll-anim');
        if(pageYOffset <= 96 && document.documentElement.clientWidth >= 1060){
            menu.marginTop = '0px';
        }else{
            menu.marginTop = '10px';
        }
    }
    // lickSlide();
}

//SLIDER
function plusSlide() {
    showSlides(slideIndex += 1);
}

function minusSlide() {
    showSlides(slideIndex -= 1);  
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("item-header");
    let dots = document.getElementsByClassName("slider-dots_item");

    if(n > slides.length){
        slideIndex = 1;
    }
    if(n < 1){
        slideIndex = slides.length;
    }
    for(let i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }
    for(let i = 0; i <dots.length; i++){
        dots[i].className = dots[i].className.replace("active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

const anchors = document.querySelectorAll('a[href*="#"]')
//Перемотка
for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href').substr(1)
    if(blockID == "contact"){
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
        // document.getElementById(blockID).scrollIntoView(top)
    }
  })
}

//    Проверка обратной связи

const changeContact = function(){
    if (document.getElementById("phone").value.replace(/\s/g, '') != ""){
        document.getElementById("mail").placeholder = 'Не обязательно'
    }
    else if (document.getElementById("mail").value.replace(/\s/g, '') != ""){
        document.getElementById("phone").placeholder = 'Не обязательно'
    }
    else{
        document.getElementById("phone").placeholder = 'Достаточно тел. или почту';
        document.getElementById("mail").placeholder = 'Достаточно тел. или почту';
    }
}

btn_subm.addEventListener('click', function(){
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("mail").value;
    const text = document.getElementById("text").value;

    if ((text.replace(/\s/g, '') != "") && (name.replace(/\s/g, '') != "") && ((phone.replace(/\s/g, '') != "") || (email.replace(/\s/g, '') != ""))){
        $.ajax({
            url: "mail.php",
            type: "POST",
            cache: false,
            data: {'name' : name,
                'phone' : phone,
                'email' : email,
                'text' : text},
            dataType: 'html',
            beforeSend:function(){
                $(".btn-subm").prop("disabled", true);
                btn_subm.style.display = "none";
                btn_status.style.display = "block";
                btn_status.style.borderColor = "#ffee00";
                btn_status.innerHTML = "<p>ОТПРАВКА</p>"
                // btn_subm.style.backgroundColor = '#777777';
                // btn_subm.style.color = '#000';
                // btn_subm.textContent = 'Отправка...';
            },
            success:function(data){
                // btn_subm.style.backgroundColor = '#808080';
                // btn_subm.style.color = '#fff';
                // btn_subm.textContent = 'Заявка отправлена';
                btn_status.style.borderColor = "#14bf04";
                btn_status.innerHTML = "<p>ОТПРАВЛЕНО</p>"
                $("#name").prop("disabled", true);
                $("#phone").prop("disabled", true);
                $("#mail").prop("disabled", true);
                $("#text").prop("disabled", true);
            }
        })
    }
    else{
        if((name.replace(/\s/g, '') == "")){
            alert("Имя не заполнено!");
        }else if((text.replace(/\s/g, '') == "")){
            alert("Не заполено поле сообщения");
        }else{
            alert("Не заполены поля телефона или почты!");
        }
    }
})

document.getElementById("phone").addEventListener('input', changeContact);
document.getElementById("mail").addEventListener('input', changeContact);
// Проверка обратной связи END

// Таблица с прайсом
var $tabs = function (target) {
var
    _elemTabs = (typeof target === 'string' ? document.querySelector(target) : target),
    _eventTabsShow,
    _showTab = function (tabsLinkTarget) {
    var tabsPaneTarget, tabsLinkActive, tabsPaneShow;
    tabsPaneTarget = document.querySelector(tabsLinkTarget.getAttribute('href'));
    tabsLinkActive = tabsLinkTarget.parentElement.querySelector('.tabs__link_active');
    tabsPaneShow = tabsPaneTarget.parentElement.querySelector('.tabs__pane_show');
    // если следующая вкладка равна активной, то завершаем работу
    if (tabsLinkTarget === tabsLinkActive) {
        return;
    }
    // удаляем классы у текущих активных элементов
    if (tabsLinkActive !== null) {
        tabsLinkActive.classList.remove('tabs__link_active');
    }
    if (tabsPaneShow !== null) {
        tabsPaneShow.classList.remove('tabs__pane_show');
    }
    // добавляем классы к элементам (в завимости от выбранной вкладки)
    tabsLinkTarget.classList.add('tabs__link_active');
    tabsPaneTarget.classList.add('tabs__pane_show');
    document.dispatchEvent(_eventTabsShow);
    },
    _switchTabTo = function (tabsLinkIndex) {
    var tabsLinks = _elemTabs.querySelectorAll('.tabs__link');
    if (tabsLinks.length > 0) {
        if (tabsLinkIndex > tabsLinks.length) {
        tabsLinkIndex = tabsLinks.length;
        } else if (tabsLinkIndex < 1) {
        tabsLinkIndex = 1;
        }
        _showTab(tabsLinks[tabsLinkIndex - 1]);
    }
    };

_eventTabsShow = new CustomEvent('tab.show', { detail: _elemTabs });

_elemTabs.addEventListener('click', function (e) {
    var tabsLinkTarget = e.target;
    // завершаем выполнение функции, если кликнули не по ссылке
    if (!tabsLinkTarget.classList.contains('tabs__link')) {
    return;
    }
    // отменяем стандартное действие
    e.preventDefault();
    _showTab(tabsLinkTarget);
});

return {
    showTab: function (target) {
    _showTab(target);
    },
    switchTabTo: function (index) {
    _switchTabTo(index);
    }
}

};


// Таблица с прайсом END

// Спойлеры
document.querySelectorAll('.spoiler-head').forEach(el => {
    el.addEventListener('click', function() {
        el_arrow = this.querySelector('span i');
        el_body = this.parentElement.querySelector('.spoiler-body');
        if(el_body.style.display == "block"){
            el_arrow.style.transform = "rotate(0deg)";
            el_body.style.display = "none";
        }else{
            el_arrow.style.transform = "rotate(45deg)";
            el_body.style.display = "block";
        }
    });
});


document.querySelector('.nav').addEventListener('click', function(){
    ham_btn.checked = false;
    ham_menu.classList.remove('active-nav');
})


ham_btn.addEventListener('click', hamchange);
window.addEventListener('resize', changeSize);
window.addEventListener('scroll', changeScroll);

//При прогрузки страницы
window.onload = function(){
    changeSize();
    if(document.querySelector('.slider-top')){
        setInterval(plusSlide, 10000);
    }
    if(document.querySelector('.tabs')){
        let $_GET = {};
        (location.search.substr(1)).split('&').map(function(v){$_GET[v.split('=')[0]] = (v.split('=')[1]);});
        if($_GET.id){
            $tabs('.tabs').switchTabTo($_GET.id);
        }else{
            $tabs('.tabs')
        }
    }
    $('.slider-reviews').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
              breakpoint: 1160,
              settings: {
                slidesToShow: 2
              }
            },
            {
                breakpoint: 560,
                settings: {
                  slidesToShow: 1
                }
            },
        ]
    });
};


