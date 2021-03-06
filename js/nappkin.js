
 var locationId = 2;
 var locationName = "Demo Bedrijf";

 var nappkin = new Nappkin(locationId);
 var fouten = false;
 var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
 var aantalPersonen = 0;
 var startEnable = 0;
 var datumEnable = 0;
 var persoonEnable = 0;
 var summaryEnable = 0;
 var ivs = 0;
 var actYear = new Date().getFullYear();
 var actMonth = new Date().getMonth();
 var actDay = new Date().getDate();
 var dofs = 0;
 // convertion day offset mon-sun
 var today = [actYear, actMonth, actDay];
 var reservedDay = [0, 0, 0];
 var reservedTime = {};
 var dofsTable = [5, 6, 0, 1, 2, 3, 4];
 var calSelect = 0;
 var availabilityInfo = {};

 var maanden = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
 var wdagen = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];

 function daysInMonth(iMonth, iYear) {
     return 32 - new Date(iYear, iMonth, 32).getDate();
 }
 function firstMonthDay(iMonth, iYear) {
     var firstDay = new Date(iYear, iMonth, 1);
     return firstDay.getDay();;
 }
 function setupMonth(mm) {
     disableVerstuur();
     if (mm < 0) {
         actYear--;
         actMonth = 11;
     } else if (mm > 11) {
         actYear++;
         actMonth = 0;
     } else {
         actMonth = mm;
     }
     getjSon(fillCalendar);
 }

 jQuery(document).ready(function () {
     $('#groepletop').hide();
     $('#person_content').hide();
     $('#datum_content').hide();
     $('#foutmsg').hide();
     $('#persoon_content').hide();
     $('#summary_content').hide();
     $('#slot_panel').hide();

     $("#verst").click(function (event) {
         event.preventDefault();
         checkPersonalia();
         verstuur();
     });

     getjSon(enableStart);
 });

 function setupPaxPicker() {
     var max = availabilityInfo.maxGroupSize || 6;
     for(var i = 1; i <= max + 1; i++) {
         var label = i <= max ? i : (i-1)+"+";
         var node = $("<span class='personlist' name='p"+ i +"' id='p" + i + "'>" + label + "</span>");
         node.click(function () {
             klikPerson($(this).attr('id').substr(1, 2));
             return false;
         });
         $('#pax_container').append(node);
     }
 }

 function getjSon(cBack) {
     var date = new Date(actYear, actMonth, 1);
     nappkin.getAvailabilityForMonth(date, function(s) {
         availabilityInfo = s;
         if (!availabilityInfo.maxGroupSize) {
             availabilityInfo.maxGroupSize = 6;
         }
         cBack(s)
     }, function(r) {

     });
 }

 function disableVerstuur() {
     //
     $('#subButton').removeClass('verstuur_active')
     $('#subButton').addClass('verstuur_inactive')
 }

 function checkPersonalia() {
     fouten = false;
     $('#nam').removeClass('invul_error')
     $('#eml').removeClass('invul_error')
     $('#tel').removeClass('invul_error')
     if (!selectedSlot) {
         fouten = true;
     }
     if ($('#nam').val() == "") {
         fouten = true;
         $('#nam').addClass('invul_error')
     } else {
         $('#persoon').html($('#nam').val());
     }
     if ($('#tel').val() == "" & aantalPersonen == 7) {
         fouten = true;
         $('#tel').addClass('invul_error')
     }
     if (reg.test($('#eml').val()) == false) {
         $('#eml').addClass('invul_error')
         fouten = true;
     }
     if (fouten == false) {
         $('#foutmsg').hide();
         $('#subButton').removeClass('verstuur_inactive')
         $('#subButton').addClass('verstuur_active')
         //$('#drop2').removeClass('drop_verstuur_inactive')
         //$('#drop2').addClass('drop_verstuur_active')
         // activate verstuur
     } else {
         $('#subButton').removeClass('verstuur_active')
         $('#subButton').addClass('verstuur_inactive')
         $('#foutmsg').show();
         //$('#drop2').removeClass('drop_verstuur_active')
         //$('#drop2').addClass('drop_verstuur_inactive')
     }
 }

 function setupDatum() {
     $('#head_datum').click(function () {
         var ivs = $('#datum_content').is(":visible");

         $('#datum_content').slideToggle('fast');
         if (ivs) {
             $('#drop1').css({ "background-position": "-26px 0px" });
         } else {
             $('#drop1').css({ "background-position": "0px 0px" });
         }

     });
 }

 function setupPersoon() {
     $('#head_persoon').click(function () {
         var ivs = $('#persoon_content').is(":visible");

         $('#persoon_content').slideToggle('fast');
         if (ivs) {
             $('#drop2').css({ "background-position": "-26px 0px" });
         } else {
             $('#drop2').css({ "background-position": "0px 0px" });
         }

     });
 }

 function enableStart() {
     if (startEnable == 0) {
         startEnable = 1;
         $('#head_personen').click(function () {
             ivs = $('#person_content').is(":visible");

             $('#person_content').slideToggle('fast');
             if (ivs) {
                 $('#drop0').css({ "background-position": "-26px 0px" });
             } else {
                 $('#drop0').css({ "background-position": "0px 0px" });
             }
         });
         $("#head_personen").removeClass("part_title_inactive");
         $("#head_personen").addClass("part_title_active");
         $("#drop0").removeClass("drop_disabled");
         $("#drop0").addClass("drop_active");
         $('#person_content').slideDown("fast");
         //
        setupPaxPicker();
     }
 }
 function enableDate() {
     if (datumEnable == 0) {
         datumEnable = 1;
         $("#head_datum").removeClass("part_title_inactive");
         $("#head_datum").addClass("part_title_active");
         $("#drop1").removeClass("drop_disabled");
         $("#drop1").addClass("drop_active");
         $('#datum_content').slideDown("fast");

         $('#maandprev').click(function () {
             //event.preventDefault();
             setupMonth(actMonth - 1);
             return false;
         });
         $('#maandnext').click(function () {
             //event.preventDefault();
             setupMonth(actMonth + 1);
             return false;
         });
         //setup day calendar interaction
         for (xx = 0; xx <= 41; xx++) {
             $('#dt' + xx).click(function () {
                 if (((!$(this).hasClass('kvDisabled')) & (!$(this).hasClass('kvBlocked'))) & $(this).html() != "") {
                     if (calSelect > 0) {
                         $('#dt' + calSelect).removeClass('kvSelected');
                     }
                     $(this).addClass('kvSelected');
                     calSelect = ($(this).attr('id').substr(2, 2));
                     var cpda = $(this).html();
                     dayClicked(cpda);
                 }
             });
         }
         fillCalendar();
         setupDatum();
     }
     else {
         // different number of guests
         fillCalendar();
     }
 }

 function updateSlotSetting() {
     // called after every day click

     $('#slotcontainer').empty();

     var day = reservedDay[2] - 1;
     var divRequired = false;
     var info = availabilityInfo.dates[day];
     selectedSlot = null;
     for(var s = 0; s < info.sections.length; s++) {
         var section = info.sections[s];
         if (!section.isClosed) {
             for (var o = 0; o < section.slots.length; o++) {
                 var slot = section.slots[o];
                 var node = $("<div class='slot'>" + slot.start + "</div>");
                 if (slot.available < aantalPersonen) {
                     node.addClass("kvBlocked");
                     node.prop("title","Volgeboekt");
                 }
                 else {
                     node.addClass("kvFilled");
                 }
                 if (!o && divRequired) {
                     $('#slotcontainer').append("<div class='section_divider'></div>");
                 }

                 if (slot.available) {
                     node.click(function () {
                         if (selectedSlot) {
                             $(selectedSlot).removeClass('selected');
                         }
                         selectedSlot = this;
                         $(selectedSlot).addClass('selected');
                         //alert($('#persoon_content').is(":visible"));
                         if ($('#persoon_content').is(":visible")) {
                             checkPersonalia();
                         }
                         var cpda = $(selectedSlot).html();
                         timeClicked(cpda);
                     });
                 }


                 $('#slotcontainer').append(node);
                 divRequired = true;
             }
         }
     }
 }
 function dayClicked(dd) {
     reservedDay = [actYear, actMonth, dd];
     $('#slot_panel').show();
     updateSlotSetting();
     $('#datum').html(wdagen[new Date(actYear, actMonth, dd).getDay()] + " " + dd + " " + maanden[actMonth]);
     checkContinue();
 }

 function timeClicked(dd) {
     reservedTime = getTimeObject(dd);
     $('#tijd').html(dd);
     checkContinue();
 }

 function getTimeObject(slotTime) {
     var parts = slotTime.split(":");
     return {hours: parseInt(parts[0]), minutes: parseInt(parts[1])};
 }

 function checkContinue() {
     if (calSelect > 0 && selectedSlot) {
         var ivs = $('#person_content').is(":visible");
         if (ivs) {
             $('#drop0').css({ "background-position": "-26px 0px" });
             $('#person_content').slideUp("fase");
         }

         enablePersoon();
     }
 }

 function fillCalendar() {
     $('#tijd').html("-");
     for (xx = 0; xx <= 41; xx++) {
         $('#dt' + xx).html("");
         if (calSelect > 0) {
             $('#dt' + calSelect).removeClass('kvSelected');
         }
         $('#dt' + xx).removeClass("kvFilled");
         $('#dt' + xx).removeClass("kvDisabled");
         $('#dt' + xx).removeClass("kvActive");
         $('#dt' + xx).removeClass("kvBlocked");
         $('#dt' + xx).addClass("kv");
     }

     $('#maandnaam').html(maanden[actMonth] + " " + actYear);

     dofs = dofsTable[firstMonthDay(actMonth, actYear)];
     for (xx = 1; xx <= daysInMonth(actMonth, actYear) ; xx++) {
         //
         var node = $('#dt' + (xx + dofs));
         node.html(xx);
         if (today[0] == actYear & today[1] == actMonth & today[2] == xx) {
             node.addClass("kvActive");
         } else {
             if (actYear < today[0] | (actYear == today[0] & actMonth < today[1]) | ((actYear <= today[0] & actMonth <= today[1]) & xx < today[2])) {
                 node.addClass("kvDisabled");
             } else {
                 node.addClass("kvFilled");
             }
         }

         if (availabilityInfo.isClosedOnDay(xx-1)) {
             node.removeClass("kvFilled");
             node.addClass("kvDisabled");
         }
         else {
             if (availabilityInfo.isAvailableOnDay(xx-1, aantalPersonen)) {
                 node.removeClass("kvBlocked");
                 node.prop("title","");
             }
             else {
                 node.removeClass("kvFilled");
                 node.addClass("kvBlocked");
                 node.prop("title","Volgeboekt");
             }
         }
     }
 }

 function pad2(number) {
     return (number < 10 ? '0' : '') + number
 }

 function verstuur() {
     if (fouten == false) {
         var dta = "Reservering:" + aantalPersonen + " personen, " + reservedDay[0] + "/" + pad2(reservedDay[1] + 1) + "/" + pad2(reservedDay[2]) + ", tijd:" + $('#tijd').html() + "\n";
         aantalPersonen
         dta += "Naam:" + $('#nam').val() + "\n";
         dta += "Email:" + $('#eml').val() + "\n";
         dta += "Telefoon:" + $('#tel').val() + "\n";
         dta += "Noot:" + $('#noot').val() + "\n";

         var reservation = {
             date: new Date(reservedDay[0], reservedDay[1], reservedDay[2], reservedTime.hours, reservedTime.minutes),
             pax: aantalPersonen,
             name: $('#nam').val(),
             email: $('#eml').val(),
             phone: $('#tel').val(),
             notes: $('#noot').val(),
             language: 'nl'
         }
         nappkin.createNewReservation(
             reservation,
             reserveResult
         );

     }
     return false;
 }
 function reserveResult(dt) {
     enableSummary();
 }
 function enableSummary() {
     if (summaryEnable == 0) {
         summaryEnable = 1;
         $('#head_personen').unbind('click');
         $('#head_datum').unbind('click');
         $('#head_persoon').unbind('click');

         $('#person_content').slideUp("fast");
         $('#drop0').css({ "background-position": "-26px 0px" });
         $('#drop1').css({ "background-position": "-26px 0px" });
         $('#drop2').css({ "background-position": "-26px 0px" });
         $('#datum_content').slideUp("fast");
         $('#persoon_content').slideUp("fast");
         $('#summary_content').slideDown("fast");

         $("#head_summary").removeClass("part_title_inactive");
         $("#head_summary").addClass("part_title_active");
         $("#drop3").removeClass("drop_disabled");
         $("#drop3").addClass("drop_active");
         $('#summary_content').html("Bovenstaande gegevens zijn verstuurd naar <strong>" + $('#eml').val() + "</strong><br>");
         if ($('#tel').val() != "") {
             $('#summary_content').append("<br><strong>Telefoon:</strong><br>" + $('#tel').val());
         }
         if ($('#noot').val() != "") {
             $('#summary_content').append("<br><strong>Notitie:</strong><br>" + $('#noot').val());
         }
         var nwsUpd = "";
         if (!$('#infoaan').attr("checked")) {
             nwsUpd = " geen";
         }
         $('#summary_content').append("<br><br>U wilt" + nwsUpd + " nieuws ontvangen over " + locationName);
         $('#summary_content').append("<br><br><a href='index.html' target='_self' class='opnieuwlink'>Klik hier</a> als u een nieuwe reservering wilt maken");

     }
 }
 function enablePersoon() {
     if (persoonEnable == 0) {
         persoonEnable = 1;
         $('#eml').keypress(function () {
             checkPersonalia();
         });
         $('#nam').blur(function () {
             checkPersonalia();
         });
         $('#eml').blur(function () {
             checkPersonalia();
         });
         $('#tel').blur(function () {
             checkPersonalia();
         });
         $('#noot').blur(function () {
             checkPersonalia();
         });
         $("#head_persoon").removeClass("part_title_inactive");
         $("#head_persoon").addClass("part_title_active");
         $("#drop2").removeClass("drop_disabled");
         $("#drop2").addClass("drop_active");
         $('#persoon_content').slideDown("fast");
         setupPersoon();
     }
 }

 function klikPerson(pp) {
     if (pp > availabilityInfo.maxGroupSize) {
         $('#persons').html("groepsreservering/aanvraag");
         $('#groepletop').slideDown("fast");
     } else {
         $('#persons').html(pp);
         $('#groepletop').slideUp("fast");
     }
     if (aantalPersonen > 0) {
         $("#p" + aantalPersonen).removeClass("actief");
         $("#p" + pp).addClass("inactief");
     }
     $("#p" + pp).removeClass("inactief");
     $("#p" + pp).addClass("actief");

     aantalPersonen = pp;
     enableDate();
 }