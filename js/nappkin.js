/**
 * Created by wbison on 06-11-15.
 */
 var restaurant_name = "restaurant MOS";
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
 var dofsTable = [5, 6, 0, 1, 2, 3, 4];
 var calSelect = 0;
//    var tmeSelect = 0;
 var blCalendar = {};
 var warnValueLunch = 10;
 var warnValueDiner = 10;

 var blockValueLunch = 0;
 var blockValueDiner = 0;

 var dagSeatBlock = 15;
 var dagSeatWarn = 75;

 var maanden = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
 var wdagen = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];

 jQuery(function ($) {
     $('#groepletop').hide();
     $('#person_content').hide();
     $('#datum_content').hide();
     $('#foutmsg').hide();
     $('#persoon_content').hide();
     $('#summary_content').hide();
     //$('#timeError').hide();

     var nappkin = new Nappkin(locationId);

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

     for (i = 1; i <= 7; i++) {
         $('#p' + i).click(function () {
             klikPerson($(this).attr('id').substr(1, 2));
             return false;
         });
     }

     $("#verst").click(function (event) {
         event.preventDefault();
         checkPersonalia();
         verstuur();
     });

     /*$('#nam').blur(function() {
         checkPersonalia();
     });
     // GET RESERVATION DATA
     */
     getjSon(enableStart);

 function getjSon(cBack) {
     var date = new Date(actYear, actMonth, 1);
     nappkin.getAvailabilityForMonth(date, function(s) {
         blCalendar = s;
         cBack(s)
     }, function(r) {

     });
 }
//    function seatsAvail(dta) {
//        enableStart();
//    }

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
     //alert("data:"+$('#nam').val()+"\n"+$('#noot').val());

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

         for (i = 1; i <= 9; i++) {
             $('#slot' + i).removeClass("isWarning");
             $('#slot' + i).removeClass("isBlocked");
             $('#slot' + i).addClass("isDisabled");
         }

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
//            // setup timeslot interaction
//            for (i = 0; i <= 9; i++) {
//                $('#slot' + i).click(function () {
//                    if ((!$(this).hasClass('isBlocked')) & $(this).hasClass('kvtm') & (!$(this).hasClass('isDisabled'))) {
//                        if (tmeSelect > 0) {
//                            if (1 == 2) {
//                                //restore warning flag
//                            }
//                            $('#slot' + tmeSelect).removeClass('kvtmSelected');
//                        }
//                        tmeSelect = ($(this).attr('id').substr(4, 1));
//                        //alert("slot:"+tmeSelect);
//                        $(this).addClass('kvtmSelected');
//                        //alert($('#persoon_content').is(":visible"));
//                        if ($('#persoon_content').is(":visible")) {
//                            checkPersonalia();
//                        }
//                        var cpda = $(this).html();
//                        tmeClicked(cpda);
//                    }
//                });
//            }
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
 }
 function getSeatsTotal(dg) {
     //
     var seat = 0;
     for (i = 0; i < blCalendar.result[dg].available.length; i++) {
         if (blCalendar.result[dg].available[i].isClosed == false) {
             seat += 1 * blCalendar.result[dg].available[i].count;
         }
     }
     return seat;
 }
 function updateSlotSetting() {
     //alert("update slots");
     // called after every day click

     $('#slotcontainer').empty();

     var day = reservedDay[2] - 1;
     var divRequired = false;
     var info = blCalendar.dates[day];
     selectedSlot = null;
     for(var s = 0; s < info.sections.length; s++) {
         var section = info.sections[s];
         if (!section.isClosed) {
             for (var o = 0; o < section.slots.length; o++) {
                 var slot = section.slots[o];
                 var node = $("<div class='slot'>" + slot.start + "</div>");
                 if (!slot.available) {
                     node.addClass("isBlocked");
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
                         tmeClicked(cpda);
                     });
                 }


                 $('#slotcontainer').append(node);
                 divRequired = true;
             }
         }
     }

//        //travel through timeslots
//        for (cl = 0; cl < blCalendar.result[(reservedDay[2] - 1)].available.length; cl++) {
//            $('#slot' + (cl + 1)).removeClass("isDisabled");
//            $('#slot' + (cl + 1)).removeClass("isBlocked");
//            $('#slot' + (cl + 1)).removeClass("isWarning");
//            //alert(String(blCalendar.result[(reservedDay[2]-1)].available[cl].count));
//            var slotAvailabilityInfo = blCalendar.result[(reservedDay[2] - 1)].available[cl];
//            if (slotAvailabilityInfo.isClosed) {
//                // timeslot is closed
//                $('#slot' + (cl + 1)).addClass("isDisabled");
//                // reservation on time which is disabled?
//            }
//            else {
//                // otherwise count available seats
//                var avl = slotAvailabilityInfo.count;
//                //alert(avl);
//                var dinerflag = 0;
//                if (cl < 3) {
//                    // lunch limit
//                    if (avl < blockValueLunch) {
//                        dinerflag = 2;
//                    } else if (avl < warnValueLunch) {
//                        dinerflag = 1;
//                    }
//                } else {
//                    // diner limit
//                    if (avl < blockValueDiner) {
//                        dinerflag = 2;
//                    } else if (avl < warnValueDiner) {
//                        dinerflag = 1;
//                    }
//                }
//                if (dinerflag != 0) {
//                    if (dinerflag == 2) {
//                        $('#slot' + (cl + 1)).addClass("isBlocked");
//                        // reservation on time which is full?
//                        if ((cl + 1) == tmeSelect) {
//                            $('#tijd').html("-");
//                            $('#slot' + tmeSelect).removeClass('kvtmSelected');
//                            tmeSelect = 0;
//                        }
//                    } else if (dinerflag == 1) {
//                        $('#slot' + (cl + 1)).addClass("isWarning");
//                    }
//                }
//            }
//        }
 }
 function dayClicked(dd) {
     reservedDay = [actYear, actMonth, dd];
     updateSlotSetting();
     $('#datum').html(wdagen[new Date(actYear, actMonth, dd).getDay()] + " " + dd + " " + maanden[actMonth]);
     checkContinue();
 }
 function tmeClicked(dd) {
     //reservedDay=[actYear,actMonth,dd];
     $('#tijd').html(dd);
     checkContinue();
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

 function infoForDayOfMonth(day) {
     if (!blCalendar) return;
     return blCalendar.dates[day];
 }

 function fillCalendar() {
     //alert("filling dates");
     // clear old
//        tmeSelect = 0;
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
         $('#dt' + xx).removeClass("kvWarning");
         $('#dt' + xx).addClass("kv");
     }

     for (xx = 1; xx < 10; xx++) {
         $('#slot' + xx).removeClass('kvtmSelected');
         $('#slot' + xx).removeClass("isBlocked");
         $('#slot' + xx).removeClass("isWarning");
         $('#slot' + xx).addClass("isDisabled");
     }
     $('#maandnaam').html(maanden[actMonth] + " " + actYear);

     dofs = dofsTable[firstMonthDay(actMonth, actYear)];
     for (xx = 1; xx <= daysInMonth(actMonth, actYear) ; xx++) {
         //
         $('#dt' + (xx + dofs)).html(xx);
         if (today[0] == actYear & today[1] == actMonth & today[2] == xx) {
             $('#dt' + (xx + dofs)).addClass("kvActive");
         } else {
             if (actYear < today[0] | (actYear == today[0] & actMonth < today[1]) | ((actYear <= today[0] & actMonth <= today[1]) & xx < today[2])) {
                 $('#dt' + (xx + dofs)).addClass("kvDisabled");
             } else {
                 $('#dt' + (xx + dofs)).addClass("kvFilled");
             }
         }

         if (blCalendar.isClosed(xx-1)) {
             $('#dt' + (xx + dofs)).removeClass("kvFilled");
             $('#dt' + (xx + dofs)).addClass("kvDisabled");
         }
         else {

         }

//            var allClosed = 0;
//            for (dayC = 0; dayC < blCalendar.result[(xx - 1)].available.length; dayC++) {
//                if (blCalendar.result[(xx - 1)].available[dayC].isClosed) {
//                    allClosed++;
//                }
//            }
//            switch (allClosed) {
//            case 9:
//                $('#dt' + (xx + dofs)).removeClass("kvFilled");
//                $('#dt' + (xx + dofs)).addClass("kvDisabled");
//                break;
//            default:
//                var dagSeat = getSeatsTotal(xx - 1);
//                if (dagSeat < dagSeatBlock) {
//                    $('#dt' + (xx + dofs)).addClass("kvBlocked");
//                } else if (dagSeat < dagSeatWarn) {
//                    $('#dt' + (xx + dofs)).addClass("kvWarning");
//                }
//            }
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

         var hours = 20;
         var minutes = 0;
         nappkin.createNewReservation(
                 new Date(reservedDay[0], reservedDay[1], reservedDay[2], hours, minutes),
                 aantalPersonen,
                 $('#nam').val(),
                 $('#eml').val(),
                 $('#tel').val(),
                 $('#noot').val(),
                 'nl',
                 reserveResult
         );

//            var reservationObject = {
//                name:  $('#nam').val(),
//                countGuests: aantalPersonen,
//                startsOn: reservedDay[0] + "-" + pad2(reservedDay[1] + 1) + "-" + pad2(reservedDay[2]) + "T" + $('#tijd').html() + ":00",
//                email: $('#eml').val(),
//                notes: $('#noot').val(),
//                mailingList: $('#infoaan').attr("checked"),
//                phone: $('#tel').val(),
//                locationId: locationId,
//                localTime: true
//            };
//            $.ajax({
//                type: 'POST',
//                url: baseUrl + "reservation",
//                data: JSON.stringify(reservationObject),
//                success: reserveResult,
//                contentType: 'application/json'
//            });
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
         $('#summary_content').append("<br><br>U wilt" + nwsUpd + " nieuws ontvangen over " + restaurant_name);
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
     enableDate();
     if (pp == 7) {
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
 }

 function getParameterByName(name) {
     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
     var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
         results = regex.exec(location.search);
     return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
 }
 });
