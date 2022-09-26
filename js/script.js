
function togglePaddingOfBody() {
  if (!document.body.classList.contains("no-scroll")) {
    let paddingValue = window.innerWidth - document.documentElement.clientWidth + 'px'
    document.body.style.paddingRight = paddingValue
  } else {
    document.body.style.paddingRight = '0px'
  } 
}
window.onload = function () {
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 100);
}
const iconMenu = document.querySelector(".icon-menu");
const navMenu = document.querySelector(".header__nav--menu");
const navMenuItems = document.querySelectorAll(".header__nav--item");
const header = document.querySelector(".header");
let animSpd = 1000
let firstClick = true
let liquidMenu = anime({
  targets: '.shape-overlays .shape-overlays__path',
  d: [
   //{value: "M 100 100 L 100 100 C 100 100 100 86.505 100 71.5831 C 100 42.5652 100 42.5542 100 26.0823 C 100 12.3867 100 0 100 0 L 100 0 Z"},
    {value: "M 100 100 L 28.6653 100 C 28.6653 100 25.8856 92.9194 55.9328 75.5921 C 91.23 57.2649 28.8915 42.8215 28.6653 28.2204 C 28.9391 12.1194 66.0845 0 66.0845 0 L 100 0 Z"},
    {value: "M 100 100 L 0 100 C 0 100 0 86.7723 0 75.5921 C 0 45.7724 0 45.7614 0 28.2204 C 0 12.1194 0 0 0 0 L 100 0 Z"},
  ],
  easing: 'easeOutQuad',
  duration: animSpd,
  delay: anime.stagger(50),
  autoplay: false
});  
//burger menu
iconMenu.addEventListener("click", () => {
  if(header.classList.contains("fixed")) {
    header.classList.remove("fixed")
    setTimeout(() => {
      header.classList.add("fixed")
    }, animSpd);   
  }
  iconMenu.classList.toggle("active");
  navMenuItems.forEach(item => {
    item.classList.toggle("isOpened")
  })
  if (firstClick) {
    liquidMenu.play()
  } else {
    liquidMenu.reverse()
    liquidMenu.play()
  }
  firstClick = false
  togglePaddingOfBody()
  document.body.classList.toggle("no-scroll")
})  
//animation on scroll
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 700) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed")
  }
  let windowTop = window.pageYOffset;
  let animate = document.querySelectorAll(".animate");
  animate.forEach(item => {
    if (!item.classList.contains("animated")) {
      item.style.visibility = "hidden"
    }
    function offset(item) {
      let rect = item.getBoundingClientRect();
      let scrollLeft = window.pageXOffsetLeft || document.documentElement.scrollLeft;
      let scrollTop = window.pageYOffsetLeft || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    let itemTop = offset(item).top;
    let itemPoint = Math.abs(window.innerHeight - item.offsetHeight * 0.5);
    if (item.offsetHeight === undefined) {
      let itemParent = item.parentNode;
      itemPoint = window.innerHeight - itemParent.offsetHeight / 2;
    }
    if (windowTop > itemTop - itemPoint) {
      let animation = item.getAttribute("data-animation");
      item.style.visibility = "visible"
      item.classList.add(animation);
      item.classList.add("animated");
    }
  })
})
//section title animation
titles = document.querySelectorAll(".section-title")
titles.forEach(title => {
  let innerMass = title.innerHTML.split(/<br>/g)
  title.textContent = ""
  let charIndex = 0
  innerMass.forEach( lines => {
    line = lines.split(" ")
    let lineWrapper = document.createElement("span")
    lineWrapper.classList.add("lineWrapper")
    title.append(lineWrapper)
    line.forEach(item => {
      let wordWrapper = item.split(" ")
      wordWrapper.forEach(word => {
        let wordSpan = document.createElement('span')
        wordSpan.classList.add("wordWrapper")
        lineWrapper.append(wordSpan)
        let chars = word.split("")
        chars.forEach(char => {
          let charSpan = document.createElement("span")
          charSpan.innerHTML = char
          charSpan.classList.add("char")
          charSpan.classList.add("animate")
          charSpan.setAttribute("data-animation","fadeInUp")
          charSpan.setAttribute("style",`--char-i: ${charIndex}`)
          wordSpan.append(charSpan)
          charIndex++
        }) 
      })
    })
  })
})
//mainslider
if (document.querySelector(".mainslider__swiper")) {
     const mainSwiper = new Swiper(".mainslider__swiper", {
      slidesPerView: 1,
      spaceBetween: 18,
      freeMode: true,
      navigation: {
        nextEl: '.mainslider__btn--next',
        prevEl: '.mainslider__btn--prev',
      },
      loop: true,
      speed: 800,
    });  
}
//booking
if (document.querySelector(".date-booking")) {
  let now = new Date()
  const mainBooking = document.querySelector(".main-booking")
  const bookingHeader = document.querySelectorAll(".date-booking__body")
  const calendar = document.querySelector(".dycalendar")
  const timeBtn = document.querySelectorAll(".time__btn")
  const peopleBtn = document.querySelectorAll(".people__btn")
  const textDate = document.querySelectorAll(".date-booking__text--date")
  const textTime = document.querySelectorAll(".date-booking__text--time")
  const textPeople = document.querySelectorAll(".date-booking__text--people")
  const modalLbl = document.querySelector(".date-booking__lbl")
  let month,
    year
  setDate(now.getDate(), now.getMonth() + 1, now.getFullYear())
  bookingHeader.forEach(item => {
    item.addEventListener("click", e => {
      if (!item.classList.contains("active")) {
        bookingHeader.forEach(el => {
          el.classList.remove("active")
        })
        item.classList.add("active")
        modalLbl.textContent = "Choose" + " " + item.querySelector(".date-booking__title").textContent.toLowerCase()
        clickOutside()
      } else {
        if (item.querySelector(".date-booking__select").contains(e.target) && !e.target.classList.contains("selected")) {
          return
        } else {
          item.classList.remove("active");
        }
      }
    })
  })
  //draw calendar
  dycalendar.draw({
    target: ".dycalendar",
    type: 'month',
    monthformat: "full",
    highlighttargetdate: true,
    prevnextbutton: "show"
  });
  disable()
  let selectDateBtn;
  calendar.addEventListener("click", e => {
    if (e.target.classList.contains("dycalendar__btn")) {
      if (selectDateBtn) { // убрать 
        selectDateBtn.classList.remove("selected")
      }
      selectDateBtn = e.target;
      selectDateBtn.classList.add("selected")
      nowDate = selectDateBtn.textContent
      nowMonth = month + 1
      nowYear = year
      setDate(nowDate, nowMonth, nowYear)
      if (nowDate != now.getDate()) {
        timeBtn.forEach(item => {
          item.classList.remove("disable")
        })
      } else {
        timeBtn.forEach(item => {
          let time = item.textContent.split(":")
          if (now.setHours(time[0], time[1], 0, 0) - Date.now() < 1800000) {
            item.classList.add("disable")
            item.classList.remove("selected")
          }
        })
      }
      checkSelected(document.querySelector(".date-booking__body--time"))
    }
    if (e.target.classList.contains("dycalendar-prev-next-btn")) {
      setTimeout(disable, 0)
    }
  })
  // time
  let selectTimeBtn
  timeBtn.forEach(item => {
    let time = item.textContent.split(":")
    if (now.setHours(time[0], time[1], 0, 0) - Date.now() < 1800000) {
      item.classList.add("disable")
    }
    item.addEventListener("click", e => {
      if (selectTimeBtn) { // убрать 
        selectTimeBtn.classList.remove("selected")
      }
      selectTimeBtn = e.target;
      selectTimeBtn.classList.add("selected")
      let selectTimeBtnArray = selectTimeBtn.textContent.split(":")
      textTime.forEach(item => {
        item.textContent = selectTimeBtnArray[0] + "." + selectTimeBtnArray[1]
      })
      checkSelected(document.querySelector(".date-booking__body--people"))
    })
  })
  // people
  let selectPeopleBtn
  peopleBtn.forEach(item => {
    item.addEventListener("click", e => {
      if (selectPeopleBtn) { // убрать 
        selectPeopleBtn.classList.remove("selected")
      }
      selectPeopleBtn = e.target;
      selectPeopleBtn.classList.add("selected")
      textPeople.forEach(item => {
        item.textContent = selectPeopleBtn.textContent
      })
      checkSelected(document.querySelector(".date-booking__body--date"))
    })
  })
  function setDate(nowDate, nowMonth, nowYear) {
    if (nowDate < 10) {
      nowDate = "0" + nowDate
    }
    if (nowMonth < 10) {
      nowMonth = "0" + nowMonth
    }
    textDate.forEach(item => {
      item.textContent = nowDate + "-" + nowMonth + "-" + nowYear
    })
  }
  function clickOutside() {
    document.addEventListener("click", function clicked(event) {
      if (!mainBooking.contains(event.target) && !event.target.classList.contains("dycalendar-prev-next-btn")) {
        mainBooking.classList.remove("active")
        bookingHeader.forEach(el => {
          el.classList.remove("active")
        })
        document.removeEventListener('click', clicked);
      }
    });
  }
  function disable() {
    month = JSON.parse(calendar.querySelector(".dycalendar-header").dataset.option).month
    year = JSON.parse(calendar.querySelector(".dycalendar-header").dataset.option).year
    let disableDays = calendar.querySelectorAll(".dycalendar__btn")
    let prevBtns = calendar.querySelectorAll(".prev-btn")
    disableDays.forEach(item => {
      if (now.getFullYear() == year && now.getMonth() == month && now.getDate() > item.textContent) {
        item.classList.add("disable")
      }
    })
    prevBtns.forEach(item => {
      if (now.getFullYear() == year && now.getMonth() == month) {
        item.classList.add("disable")
      }
    })
  }
  function checkSelected(nextItem) {
    if (document.querySelectorAll(".selected").length === 3) {
      mainBooking.classList.remove("active")
      bookingHeader.forEach(item => {
        item.classList.remove(".active")
      })
    } else {
      nextItem.classList.add("active")
      modalLbl.textContent = "Choose" + " " + nextItem.querySelector(".date-booking__title").textContent.toLowerCase()
    }
  }
  //modal booking
  if (document.querySelector(".modal-booking")) {
    const modalHeader = document.querySelectorAll(".modal-booking__body")
    const modalClose = document.querySelector(".date-booking__close")
    for (let i = 0; i < modalHeader.length; i++) {
      modalHeader[i].addEventListener("click", () => {
        if (!mainBooking.classList.contains("active")) {
          mainBooking.classList.add("active")
          modalLbl.textContent = "Choose" + " " + modalHeader[i].textContent.toLowerCase()
          bookingHeader.forEach(item => {
            item.classList.remove("active")
          })
          bookingHeader[i].classList.add("active")
          modalClickOutside()
        }
      })
    }
    modalClose.addEventListener("click", () => {
      mainBooking.classList.remove("active")
      bookingHeader.forEach(item => {
        item.classList.remove("active")
      })
    })
    function modalClickOutside() {
      document.addEventListener("click", function modalclicked(event) {
        if (event.target == mainBooking) {
          mainBooking.classList.remove("active")
          bookingHeader.forEach(item => {
            item.classList.remove("active")
          })
          document.removeEventListener("click", modalclicked)
        }
      })
    }
  }
} 
