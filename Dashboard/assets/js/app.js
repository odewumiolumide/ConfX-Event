(function ($) {
  'use strict';

  // sidebar submenu collapsible js
  $(".sidebar-menu .dropdown").on("click", function(){
    var item = $(this);
    item.siblings(".dropdown").children(".sidebar-submenu").slideUp();

    item.siblings(".dropdown").removeClass("dropdown-open");

    item.siblings(".dropdown").removeClass("open");

    item.children(".sidebar-submenu").slideToggle();

    item.toggleClass("dropdown-open");
  });

  $(".sidebar-toggle").on("click", function(){
    $(this).toggleClass("active");
    $(".sidebar").toggleClass("active");
    $(".dashboard-main").toggleClass("active");
  });

  $(".sidebar-mobile-toggle").on("click", function(){
    $(".sidebar").addClass("sidebar-open");
    $("body").addClass("overlay-active");
  });

  $(".sidebar-close-btn").on("click", function(){
    $(".sidebar").removeClass("sidebar-open");
    $("body").removeClass("overlay-active");
  });

  //to keep the current page active
  $(function () {
    for (
      var nk = window.location,
        o = $("ul#sidebar-menu a")
          .filter(function () {
            return this.href == nk;
          })
          .addClass("active-page") // anchor
          .parent()
          .addClass("active-page");
      ;

    ) {
      // li
      if (!o.is("li")) break;
      o = o.parent().addClass("show").parent().addClass("open");
    }
  });

/**
* Utility function to calculate the current theme setting.
* Look for a local storage value.
* Fall back to system setting.
* Fall back to light mode.
*/
function calculateSettingAsThemeString({ localStorageTheme }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }
  return "light";
}

/**
* Utility function to update the button text and aria-label.
*/
function updateButton({ buttonEl, isDark }) {
  const newCta = isDark ? "dark" : "light";
  // use an aria-label if you are omitting text on the button
  // and using a sun/moon icon, for example
  buttonEl.setAttribute("aria-label", newCta);
  buttonEl.innerText = newCta;
}

/**
* Utility function to update the theme setting on the html tag
*/
function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

/**
* 1. Grab what we need from the DOM and system settings on page load
*/
const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");

/**
* 2. Work out the current site settings
*/
let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme });

/**
* 3. Update the theme setting and button text accoridng to current settings
*/
updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

/**
* 4. Add an event listener to toggle the theme
*/
button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateButton({ buttonEl: button, isDark: newTheme === "dark" });
  updateThemeOnHtmlEl({ theme: newTheme });

  currentThemeSetting = newTheme;
}); 

// =========================== Table Header Checkbox checked all js Start ================================
$('#selectAll').on('change', function () {
  $('.form-check .form-check-input').prop('checked', $(this).prop('checked')); 
}); 

  // Remove Table Tr when click on remove btn start
  $('.remove-btn').on('click', function () {
    $(this).closest('tr').remove(); 

    // Check if the table has no rows left
    if ($('.table tbody tr').length === 0) {
      $('.table').addClass('bg-danger');

      // Show notification
      $('.no-items-found').show();
    }
  });
  // Remove Table Tr when click on remove btn end
})(jQuery);



// Langauge Transltor //

const translations = {
  english: {
      dashboard: "Dashboard",
      chooseLanguage: "Choose Your Language",
      notifications: "Notifications",
      userName: "Shaidul Islam",
      seeAllNotifications: "See All Notifications",
      myProfile: "My Profile",
      inbox: "Inbox",
      settings: "Settings",
      logOut: "Log Out",
  },
  mandarin: {
      dashboard: "仪表板",
      chooseLanguage: "选择您的语言",
      notifications: "通知",
      userName: "沙伊杜尔·伊斯兰",
      seeAllNotifications: "查看所有通知",
      myProfile: "我的个人资料",
      inbox: "收件箱",
      settings: "设置",
      logOut: "登出",
  },
  hindi: {
      dashboard: "डैशबोर्ड",
      chooseLanguage: "अपनी भाषा चुनें",
      notifications: "सूचनाएँ",
      userName: "शैदुल इस्लाम",
      seeAllNotifications: "सभी सूचनाएँ देखें",
      myProfile: "मेरी प्रोफ़ाइल",
      inbox: "इनबॉक्स",
      settings: "सेटिंग",
      logOut: "लॉग आउट",
  },
  arabic: {
      dashboard: "لوحة القيادة",
      chooseLanguage: "اختر لغتك",
      notifications: "الإشعارات",
      userName: "شيدول إسلام",
      seeAllNotifications: "عرض جميع الإشعارات",
      myProfile: "ملفي",
      inbox: "صندوق الوارد",
      settings: "الإعدادات",
      logOut: "تسجيل الخروج",
  },
  bengali: {
      dashboard: "ড্যাশবোর্ড",
      chooseLanguage: "আপনার ভাষা নির্বাচন করুন",
      notifications: "বিজ্ঞপ্তি",
      userName: "শাইদুল ইসলাম",
      seeAllNotifications: "সকল বিজ্ঞপ্তি দেখুন",
      myProfile: "আমার প্রোফাইল",
      inbox: "ইনবক্স",
      settings: "সেটিংস",
      logOut: "লগ আউট",
  },
  portuguese: {
      dashboard: "Painel",
      chooseLanguage: "Escolha seu idioma",
      notifications: "Notificações",
      userName: "Shaidul Islam",
      seeAllNotifications: "Ver todas as notificações",
      myProfile: "Meu Perfil",
      inbox: "Caixa de entrada",
      settings: "Configurações",
      logOut: "Sair",
  },
  russian: {
      dashboard: "Панель управления",
      chooseLanguage: "Выберите язык",
      notifications: "Уведомления",
      userName: "Шаидул Ислам",
      seeAllNotifications: "Посмотреть все уведомления",
      myProfile: "Мой профиль",
      inbox: "Входящие",
      settings: "Настройки",
      logOut: "Выйти",
  },
  turkish: {
      dashboard: "Gösterge Paneli",
      chooseLanguage: "Dil Seçin",
      notifications: "Bildirimler",
      userName: "Shaidul İslam",
      seeAllNotifications: "Tüm Bildirimleri Gör",
      myProfile: "Profilim",
      inbox: "Gelen Kutusu",
      settings: "Ayarlar",
      logOut: "Çıkış Yap",
  },
  french: {
      dashboard: "Tableau de bord",
      chooseLanguage: "Choisissez votre langue",
      notifications: "Notifications",
      userName: "Shaidul Islam",
      seeAllNotifications: "Voir toutes les notifications",
      myProfile: "Mon Profil",
      inbox: "Boîte de réception",
      settings: "Paramètres",
      logOut: "Déconnexion",
  }
};

