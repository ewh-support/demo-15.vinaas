(function($) {
    $(document).ready(function() {
        var userOS = detectOperatingSystem();
        var COOKIE_NAME = 'couchbase-download';
        var ENTERPRISE = 'enterprise';
        var COOKIE_NAME_COMMUNITY = 'couchbase-download-community';
        var COMMUNITY = 'community';

        var family = getParameterByName('family');
        var product = getParameterByName('product');
        var edition = getParameterByName('edition');
        openTabParams(family, product, edition);
        openPreReleaseTab();

        var mktoFormIds = [];
        //init marketo forms
        if (typeof MktoForms2 != 'undefined') {
            $('.section-downloads button[data-marketo-id]').each(function() {
                // get both marketo form ids and form category
                var marketoFormId = $(this).attr('data-marketo-id');
                var marketoFormIdCommunity = $(this).attr('data-marketo-community-id');
                var category = $(this).attr('data-category') || '';

                // create id array
                var ids = [marketoFormId, marketoFormIdCommunity];

                // loop over array and init forms
                ids.forEach(function (id) {
                    if (id && mktoFormIds.indexOf(id) < 0) {
                        MktoForms2.loadForm("https://app-aba.marketo.com", "302-GJY-034", id, function(form) {
                            //Add an onSuccess handler
                            form.onSuccess(function(values, followUpUrl) {
                                var vals = form.getValues();
                                var os = vals.Operating_System__c;
                                var os_version = "";
                                if (os.indexOf('linux') >= 0) {
                                    var osPart = os.split('-');
                                    if (osPart.length > 2) {
                                        os_version = osPart[2];
                                    }
                                }
                                var license = vals.Recent_Download_License__c;
                                var formId;
                                if (license === ENTERPRISE) {
                                    formId = category + ' Enterprise Edition';
                                } else if (license === COMMUNITY) {
                                    formId = category + ' Community Edition';
                                } else {
                                    formId = category;
                                }

                                // store the user properties in a cookie so we can bypass the form for future downloads
                                if (license === ENTERPRISE) {
                                    writeCookie(COOKIE_NAME, getMarketoCookie(vals));
                                } else {
                                    writeCookie(COOKIE_NAME_COMMUNITY, getMarketoCommunityCookie(vals));
                                }

                                // Hide form and shadowbox
                                $('.form-overlay').animate({'opacity': '0'}, {
                                    duration: 500, complete: function () {
                                        $('.form-overlay').css('display', 'none');
                                    }
                                });

                                dataLayer.push({
                                    event: "mktoFormSuccess",
                                    formId: formId,
                                    os: os,
                                    osVersion: os_version,
                                    productVersion: vals.Recent_Download_Version__c
                                });

                                //Take the lead to a different page on successful submit, ignoring the form's configured followUpUrl.
                                // Enable download of .exe files
                                location.href = vals.Download_URL__c;

                                //return false to prevent the submission handler continuing with its own processing
                                return false;
                            });
                        });
                        mktoFormIds.push(id);
                    }
                });
            });
        }

        $('.section-downloads .col-two .platform-box select').each(function() {
            //$(this).find('option').prop('selected', false);
            var value = $(this).find('option[value^="' + userOS + '"]:first').val();
            $(this).data("selectBox-selectBoxIt").selectOption(value);
            //$(this).change();
        });

        $('.section-downloads .version-select .select1 select').change(function(){
            var version = $(this).children(":selected").attr('data-version');
            $(this).closest('.version-select').find('button').attr('data-version', version);
        });

        $('.section-downloads button.download-form').click(function(e){
            e.stopPropagation();
            var product = $(this).attr('data-product');
            var selectedVersion = $(this).attr('data-version');
            var selectedPlatform = $(this).closest('.select-option').find('.platform-box:visible select option:selected').val();
            var selectedEdition = $(this).closest('.tabs-parent').find('li.active:visible').attr('data-edition');
            var isAddon = $(this).attr('data-addon') || 'false';
            var isPrerelease = $(this).attr('data-prerelease') || 'false';
            var url = $(this).attr('data-url') + '/' + selectedEdition + '?product=' + product + '&version=' + selectedVersion
                + '&platform=' + selectedPlatform + '&addon=' + isAddon + '&beta=' + isPrerelease;
            url = encodeURI(url);
            var useMarketo = $(this).closest('.tabs-parent').find('li.active[data-usemarketo]:visible').attr('data-usemarketo');
            var marketoId = selectedEdition === ENTERPRISE ? $(this).attr('data-marketo-id') : $(this).attr('data-marketo-community-id');

            if ((typeof MktoForms2 != 'undefined') && useMarketo === 'true' && marketoId) {
                MktoForms2.whenReady(function (form){
                    // Only submit the form whose download button's been clicked.
                    if(form.getId() == marketoId){
                        form.setValues({
                            "Download_URL__c" : url,
                            "Operating_System__c" : selectedPlatform,
                            "Recent_Download_Version__c" : selectedVersion,
                            "Recent_Download_License__c" : selectedEdition
                        });

                        var cVals = getUserCookie(COOKIE_NAME); // 13
                        var cValsCommunity = getUserCookie(COOKIE_NAME_COMMUNITY); // 8

                        /* If there's already a cookie..*/
                        if (cVals != null || (selectedEdition === COMMUNITY && cValsCommunity != null)) {
                            try{
                                // determine saved cookie type and values to use
                                var cookieType = cVals != null ? ENTERPRISE : COMMUNITY;
                                var cValsToUse = cookieType === ENTERPRISE ? cVals : cValsCommunity;
                                var valLength = cookieType === ENTERPRISE ? 13 : 8;
                                var vals = decodeURIComponent(cValsToUse).split('|');

                                // if bad cookie, open form again
                                if((typeof vals[1] == 'undefined') || vals.length < valLength){
                                    showMarketoForm(marketoId, selectedEdition);
                                }else{
                                    // get form values by cookie type
                                    var formVals = {};
                                    if (selectedEdition === ENTERPRISE) {
                                        formVals = {
                                            "FirstName" : vals[0],
                                            "LastName" : vals[1],
                                            "Email" : vals[2],
                                            "Company" : vals[3],
                                            "Role__c" : vals[4],
                                            "Phone" : vals[5],
                                            "Country" : vals[6],
                                            "State" : (vals[7]) ? vals[7] : "",
                                            "City" : vals[8]
                                        };

                                        formVals[vals[9]] = (vals[10]) ? vals[10] : "";
                                        formVals[vals[11]] = (vals[12]) ? vals[12] : "";
                                    } else {
                                        if (cookieType === ENTERPRISE) {
                                            formVals = {
                                                "Email" : vals[2],
                                                "Company" : vals[3],
                                                "Country" : vals[6],
                                                "State" : (vals[7]) ? vals[7] : ""
                                            };

                                            // add boolean values and override to match expected values for community form
                                            formVals[vals[9]] = (vals[10]) ? vals[10] : "";
                                            if (formVals[vals[9]] === 'true') {
                                                formVals[vals[9]] = 'yes';
                                            } else if (formVals[vals[9]] === 'false') {
                                                formVals[vals[9]] = 'no';
                                            }
                                            formVals['Double_Opt_in_Compliant__c'] = (vals[12]) ? vals[12] : "";
                                            if (formVals['Double_Opt_in_Compliant__c'] === 'true') {
                                                formVals[vals[9]] = 'yes';
                                            } else if (formVals['Double_Opt_in_Compliant__c'] === 'false') {
                                                formVals[vals[9]] = 'no';
                                            }
                                        } else {
                                            formVals = {
                                                "Email" : vals[0],
                                                "Company" : vals[1],
                                                "Country" : vals[2],
                                                "State" : (vals[3]) ? vals[3] : ""
                                            };

                                            formVals[vals[4]] = (vals[5]) ? vals[5] : "";
                                            formVals[vals[6]] = (vals[7]) ? vals[7] : "";
                                        }
                                    }

                                    form.setValues(formVals);

                                    // Callback that is called once for each form on the page once it's ready.
                                    form.submit();
                                }
                            }catch(e){
                                showMarketoForm(marketoId, selectedEdition);
                            }
                        }
                        /* Otherwise, display the form */
                        else {
                            showMarketoForm(marketoId, selectedEdition);
                        }
                    }
                });
            } else {
                location.href = url;
            }
        });

        // Find the button element that you want to attach the event to
        $('form[name="enquiry"],form[name="enquiryform"],form[name="enquiryCommunity"]').on("submit", function (e) {
            e.preventDefault();
            var form = this;
            if ($(form).hasClass('formerror')) {
                //Form Submission Invalid
                return false;
            }
            var marketoFormId = form['marketoFormId'].value;
            MktoForms2.whenReady(function (mktoForm) {
                // Only submit the form whose download button's been clicked.
                if (mktoForm.getId() == marketoFormId) {
                    // getFieldInfo parameter (marketo form id + _facade)
                    var fieldInfo = getFieldInfo(form);
                    mktoForm.setValues(fieldInfo);
                    if (mktoForm.validate()) {
                        mktoForm.submit();
                    } else {
                        $(form).addClass('formerror');
                    }
                }
            });
            return false;
        });

        $('.section-downloads .select-container select[data-url]').change(function() {
            var attrId = $(this).parent().attr('id');
            var url = $(this).attr('data-url');
            url = getAjaxUrl(url);
            var edition = $('.section-downloads[data-edition]').attr('data-edition');
            var productSel = $('.section-downloads .select-container #product select');
            var versionSel = $('.section-downloads .select-container #version select');
            var osSel = $('.section-downloads .select-container #os select');
            var product = productSel.val();
            var version = versionSel.val();
            if (attrId === 'product') {
                $.get(url, {'edition': edition, 'product': product}, function (data) {
                    versionSel.html($(data).find('#versions').html()).data("selectBox-selectBoxIt").refresh();
                    osSel.html($(data).find('#platforms').html()).data("selectBox-selectBoxIt").refresh();
                });
            } else if (attrId === 'version') {
                $.get(url, {'edition': edition, 'product': product, 'version': version}, function (data) {
                    osSel.html($(data).find('#platforms').html()).data("selectBox-selectBoxIt").refresh();
                });
            }
        });

        $('.download-accordion').on('click', 'a.copy-btn', function(e) {
            e.preventDefault();
            var text = $(this).attr('href');
            copyTextToClipboard(text);
            handleGTMDataLayer($(this).parent().attr("data-type","copy-button"));
        });

        $('.banner-download').on('click', 'a.copy-text', function(e) {
            e.preventDefault();
            var text = $(this).attr('href');
            copyTextToClipboard(text);
            handleGTMDataLayer(this);
        });

        $('.download-accordion,.banner-download').on('click', 'a.download-btn', function(e){
            handleGTMDataLayer(this);
        });

        $('.download-accordion,.banner-download').on('click', 'a.email-btn[data-email]', function(e){
            e.preventDefault();
            var btn = this;
            var email = $(this).attr('data-email');
            var url = $(this).attr('data-url');
            url = getAjaxUrl(url);
            var downloadUrl = $(this).prev().attr('href');
            $(btn).prop('disabled', true);
            $.get(url, {'url': downloadUrl, 'email': email}, function(data) {
                var msg = $(data).text();
                $(btn).prop('disabled', false);
                alert($.trim(msg));
            });
            handleGTMDataLayer(this);
        });

        $('.banner-download').on('change', 'select[name="platform"]', function(e){
            e.stopPropagation();
            var platform = $(this).val();
            toggleCurrentDownloadPlatforms(platform);
            toggleLatestDownloadPlatforms(platform);

            var value = togglePlatformSelection('.download-accordion', platform);
            toggleOtherDownloadPlatforms(value);
        });

        $('.download-accordion').on('change', 'select[name="platform"]', function(e){
            e.stopPropagation();
            var platform = $(this).val();
            toggleOtherDownloadPlatforms(platform);

            if (platform !== 'all') {
                toggleLatestDownloadPlatforms(platform);
                var value = togglePlatformSelection('.banner-download', platform);
                toggleCurrentDownloadPlatforms(value);
            }
        });

        var toggleLatestDownloadPlatforms = function(platform) {
            var n = 0;
            var el = $('.accordian-outer').find('*[data-platform]:visible');
            if (el.length <= 0) el = $('.accordian-outer').find('*[data-platform]:first');

            $('.accordian-outer').find('*[data-platform]').each(function() {
                var c = comparePlatforms(platform, $(this).attr('data-platform'));
                if (c > n) {
                    n = c;
                    el = $(this);
                }
                $(this).hide();
            });
            el.show();
        };

        var togglePlatformSelection = function(selector, platform) {
            var sel = $(selector).find('select[name="platform"]');
            var n = 0;
            var el = sel.find('option:selected');

            sel.find('option').each(function() {
                var c = comparePlatforms(platform, $(this).val());
                if (c > n) {
                    n = c;
                    el = $(this);
                }
                $(this).prop('selected', false);
            });
            el.prop('selected', true);
            sel.data("selectBox-selectBoxIt").refresh();
            return el.val();
        };

        var toggleCurrentDownloadPlatforms = function(platform) {
            $('.banner-download').find('*[data-platform]').each(function() {
                $(this).attr('data-platform') === platform ? $(this).show() : $(this).hide();
            });
        };

        var toggleOtherDownloadPlatforms = function(platform) {
            $('.download-accordion .accordion-inner').find('*[data-platform]').each(function() {
                if (platform === 'all') {
                    $(this).show();
                } else {
                    $(this).attr('data-platform') === platform ? $(this).show() : $(this).hide();
                }
            });
            accordionCounter(platform);
        };

        var comparePlatforms = function(p1, p2) {
            var n = Math.min(p1.length, p2.length);
            var i = 0;
            while (i < n && p1[i] === p2[i]) ++i;

            return i;
        };

        var accordionCounter = function(platform) {
            $('.download-accordion .accordion-item').each(function() {
                var counter;
                if (platform === 'all') {
                    counter = $(this).find('tr[data-platform]').length;
                } else {
                    counter = $(this).find('tr[data-platform="' + platform + '"]').length;
                }
                if (counter > 0) {
                    $(this).show().find('.item-title span.counter').html(counter);
                } else {
                    $(this).hide();
                }
            });
        };

        $('.banner-download select[name="platform"]').each(function() {
            var value = $(this).val();
            if (value === '') {
                value = $(this).find('option[value^="' + userOS + '"]:first').val();
                $(this).data("selectBox-selectBoxIt").selectOption(value);
            } else {
                accordionCounter(value);
            }
        });


        // show all platforms (dl)
        var otherDownloadsProductSelect = $(".download-accordion #product select").val();
        if(otherDownloadsProductSelect == "kubernetes-autonomous-operator"){
            $("#os.select2 select").data("selectBox-selectBoxIt").selectOption("all");
            $(".accordion-content").show();
            $(".download-accordion .btn-plus").addClass("btn-plus-minus");
        }

        // remove from initial dropdown
        removeAccordionProducts();

        function removeAccordionProductValue(value) {
            var publicCloudIndex = $(".download-accordion #product select option[value='"+ value + "']").index();
            if(publicCloudIndex > -1){
                $(".download-accordion #product select").data("selectBox-selectBoxIt").remove(publicCloudIndex);
            }
        }

        function removeAccordionProducts() {
            removeAccordionProductValue("public-cloud");
            removeAccordionProductValue("cloud-test-drive");
        }


        $('.download-accordion').on('change', 'select[name="product"]', function(e){
            e.stopPropagation();
            var attrId = $(this).parent().attr('id');
            var product = $(this).val();
            var platform = $('.download-accordion select[name="platform"]').val();
            var downloadUUID = $('.banner-download').attr('data-uuid') || '';
            var url = $(this).attr('data-url');
            var obj = {'selected-product': product, 'platform': platform, 'download-uuid': downloadUUID};
            $.each(url.split('&'), function(i, param) {
                if (i === 0) {
                    url = param;
                } else {
                    var key = param.split('=')[0];
                    if (!obj.hasOwnProperty(key)) {
                        url += '&' + param;
                    }
                }
            });
            //url = getAjaxUrl(url);
            //var edition = $('.section-downloads[data-edition]').attr('data-edition');
            $.get(url, obj, function (data) {
                $('.download-accordion').html(data);
                $('.download-accordion select').selectBoxIt();
                accordionCounter(platform);
                removeAccordionProducts();
            });
        });

        $('.go-to-links + button.red-btn').on("click", function(e){
            e.preventDefault();
            var goToUrl = $(this).closest('.select-option').find('select option:selected').val();
            window.open(goToUrl, '_blank');
        });

        /*
        $('.section-downloads button.copy-btn').click(function(e){
            e.stopPropagation();
            var text = $(this).prev('button.download-btn').attr('data-url');
            copyTextToClipboard(text);
            handleGTMDataLayer(this);
        });

        $('.section-downloads button.email-btn[data-email]').click(function(e){
            e.stopPropagation();
            var btn = this;
            var email = $(this).attr('data-email');
            var url = $(this).attr('data-url');
            url = getAjaxUrl(url);
            var downloadUrl = $(this).parent().find('button.download-btn').attr('data-url');
            $(btn).prop('disabled', true);
            $.get(url, {'url': downloadUrl, 'email': email}, function(data) {
                var msg = $(data).text();
                $(btn).prop('disabled', false);
                alert($.trim(msg));
            });
            handleGTMDataLayer(this);
        });

        $(".section-downloads .button-container a.sd-link").click(function(){

            handleGTMDataLayer(this);
        });
        */

        $('.section-downloads .top-tabs li[data-edition]').click(function(e) {
            var id = $(this).attr("id");
            $(this).closest('.col-two').next().find(".select-box").each(function(){
                var tabsId= $(this).attr('id');
                if(tabsId === id){
                    $(this).css('display','block').animate({'opacity':'1'},500);
                }
                else{
                    $(this).css({'display':'none',opacity:'0'});
                }
            });

            var edition = $(this).attr('data-edition');

            $(this).closest('.tabs-content').find('.third-tabs-container').each(function() {
                var $li = $(this).find('.view-tabs li[data-edition="' + edition + '"]:first').click();
                if ($li.length > 0) {
                    var tabId = $li.closest('.select-tabs').attr('id');
                    var $versionSel = $(this).find('.version-select select');
                    if ($versionSel.length > 0) {
                        var value = $versionSel.find('option[id="' + tabId + '"]').val();
                        $versionSel.data("selectBox-selectBoxIt").selectOption(value);
                    }
                }
            });
        });

        // for downloads only, allow internal jumping -- instead of refreshing
        $(".product-cta-block a[href*='/downloads?'], .main-nav a[href*='/downloads?']").on("click", function(e){
            e.preventDefault();
            var url = $(this).attr("href");
            if(window.location.href.indexOf("/downloads") > -1 && $(".section-downloads.feature-tabs")){
                var family = getParameterByName('family', url);
                var product = getParameterByName('product',url);
                var edition = getParameterByName('edition', url);
                openTabParams(family, product, edition);
            }else{
                window.location.href = url;
            }
        });

        // Kubernetes only - Set main download and copy links
        // if($(".banner-download [data-product='Autonomous Operator']")){
        //     var url = window.location.href;
        //     var platform = getParameterByName("platform", url);
        //     var container = "";
        //     if(platform == 'open-source-kubernetes'){
        //         container = 'Open Source Kubernetes';
        //     }else{
        //         container = 'Red Hat Openshift';
        //     }
        //
        //     var copyLinks = $(".download-links");
        //
        //     // for each banner button
        //     $(".banner-download .download-button").each(function(){
        //         var buttonContainer = $(this).parent();
        //         var buttonPlatform = buttonContainer.attr("data-platform");
        //         var buttonAnchor = $(this).find("a.download-btn");
        //         var buttonFname = buttonContainer.find("p.file-name");
        //         var copyContainer = copyLinks.find("ul[data-platform='" + buttonPlatform + "']");
        //         var copyAnchor = copyContainer.find("a.copy-text");
        //
        //         // find the equivalent in accordion
        //         var mirroredDownloadItemContainer = $(".download-accordion tr[data-product='" + container + "']").closest("tbody");
        //         var mirroredDownloadItem = mirroredDownloadItemContainer.find("tr[data-platform='" + buttonPlatform + "']");
        //         var fname = mirroredDownloadItem.find("td[data-title='FILENAME']").text();
        //         var downloadPackage = mirroredDownloadItem.find("a.download-btn").attr("href");
        //
        //         buttonAnchor.attr("href", downloadPackage);
        //         copyAnchor.attr("href", downloadPackage);
        //         buttonFname.text(fname);
        //     });
        // }

        // start download
        var dlBannerBtn = $("section.banner-download .download-btn:visible");
        if($(dlBannerBtn).length){
            document.location.href = $(dlBannerBtn).attr("href");
            handleGTMDataLayer(dlBannerBtn);

            // accordion interaction
            jQuery('.content-graphic').addClass('clicked');
            jQuery(".banner-download .animate-svg").addClass("on-load");
            jQuery(".solution-col-grid").addClass("active-hover");
            jQuery('.col-wrapper').each(function () {
                var col = jQuery(this).find('.col');
                col.addClass('column-' + col.length);
            });
            jQuery(document).on("click", ".download-accordion .item-title, .generic-accordion .item-title", function (e) {
                e.preventDefault();
                var accordion = jQuery(this).closest(".download-accordion");
                accordion.find(".btn-plus").not(jQuery(this).find('.btn-plus')).removeClass("btn-plus-minus");
                accordion.find(".accordion-item .accordion-content").not(jQuery(this).parents(".accordion-item").find(".accordion-content")).slideUp();
                jQuery(this).find('.btn-plus').toggleClass("btn-plus-minus");
                jQuery(this).parents(".accordion-item").find(".accordion-content").stop(true).slideToggle();
            });
        }


    });

    function openTabParams(family, product, edition){
        if (family) {
            $('.section-downloads,.section-tabs').find('li[data-family="' + family + '"]').click();
        }
        if (edition) {
            $('.section-downloads,.section-tabs').find('li[data-edition="' + edition + '"]').click();
        }
        if (product) {
            var offset = $('.section-downloads,.section-tabs').find('li[data-product="' + product + '"]').click().offset();
            if (offset && offset.top) {
                $('html,body').animate({
                    scrollTop: offset.top
                }, 700);
            }
        }
    }

    function  openPreReleaseTab() {
        var activeDownloadTab = $(".section-downloads .tabs li.active[data-family='server']");
        if(activeDownloadTab.length){
            $('.tabs-content[id="server"] li[id$="-pre-release-versions"]').click();
        }
    }

    function handleGTMDataLayer(el){

        var parent = $(el).parent().parent();
        var os = $(parent).attr("data-os");
        var version = $(parent).attr("data-version");
        var type = $(el).attr("data-type");
        var productType = $(parent).attr("data-product");
        try {
            dataLayer.push({
                event: "downloadClick",
                os: os,
                productVersion: version,
                type: type,
                productType: productType
            });
        } catch(e) {
            //ignored
        }

    }

    function getAjaxUrl(url) {
        var ret = '';
        $.each(url.split('&'), function(i, param) {
            if (i == 0) {
                ret = param;
            } else if (param.startsWith('_')) {
                ret += '&' + param;
            }
        });
        return ret;
    }

    function showMarketoForm(marketoFormId, selectedEdition) {
        // show proper form overlay and update marketoId
        var formOverlay = $('.form-overlay[data-js-form-type="' + selectedEdition +'"]');
        formOverlay.css('display','block').animate({'opacity':'1'},500);
        formOverlay.find('input[name="marketoFormId"]').val(marketoFormId);
    }

    // returns an object with key/value pairs (FACADE fields)
    function getFieldInfo(form) {
        // get input, select, and textarea elements
        var allFields = {};
        $(':input[name]', form).each(function () {
            if ($(this).is(':checkbox:checked') && this.name) {
                allFields[this.name] = this.value || 'no';
            } else {
                allFields[this.name] = this.value;
            }
        });

        return allFields;
    }

    function detectOperatingSystem(){
        // This script sets OSName variable as follows:
        // "Windows"    for all versions of Windows
        // "MacOS"      for all versions of Macintosh OS
        // "Linux"      for all versions of Linux
        // "UNIX"       for all other UNIX flavors
        // "Unknown OS" indicates failure to detect the OS

        var OSName="unknown";
        if (navigator.appVersion.indexOf("Win")!=-1) OSName="windows";
        if (navigator.appVersion.indexOf("Mac")!=-1) OSName="osx";
        if (navigator.appVersion.indexOf("X11")!=-1) OSName="unix";
        if (navigator.appVersion.indexOf("Linux")!=-1) OSName="linux";
        if (navigator.appVersion.indexOf("Android")!=-1) OSName="android";
        if (navigator.userAgent.indexOf("like Mac") != -1) OSName = "ios";

        return OSName;
    }

    function getUserCookie(cname) {
        var cnameEq = cname+'=';
        var ca = document.cookie.split(';');
        for (var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(cnameEq) != -1) {
                return c.substring(cnameEq.length, c.length);
            }
        }
        return null;
    }
    function writeCookie (cName, cVal) {
        var expire = new Date();
        expire.setDate(expire.getDate() + 30);
        document.cookie = cName + "=" + encodeURIComponent(cVal) + ";expires=" + expire.toString() + "; path=/";
    }
    function getMarketoCookie (vals) {
        var cVal = vals.FirstName+'|' +
            vals.LastName +'|' +
            vals.Email    +'|' +
            vals.Company  +'|' +
            vals.Role__c    +'|' +
            vals.Phone  +'|' +
            vals.Country  +'|' +
            vals.State  +'|' +
            vals.City;

        cVal += '|' + 'termsandConditions' + '|'  + vals['termsandConditions'];

        var tos = ['Double_Opt_in_Compliant__c', 'doubleOptinCompliantCanada', 'doubleOptinCompliantEnglish'];
        $.each(tos, function(i, v) {
            if (vals[v]) {
                cVal += '|' + v + '|' + vals[v];
                return false;
            }
            if (i == tos.length - 1) {
                cVal += '||';
            }
        });
        return cVal;
    }
    function getMarketoCommunityCookie (vals) {
        var cVal = vals.Email   + '|' +
          vals.Company          + '|' +
          vals.Country          + '|' +
          vals.State;

        cVal += '|' + 'termsandConditions' + '|'  + vals['termsandConditions'];

        var tos = ['Double_Opt_in_Compliant__c', 'doubleOptinCompliantCanada', 'doubleOptinCompliantEnglish'];
        $.each(tos, function(i, v) {
            if (vals[v]) {
                cVal += '|' + v + '|' + vals[v];
                return false;
            }
            if (i == tos.length - 1) {
                cVal += '||';
            }
        });
        return cVal;
    }

    function copyTextToClipboard(text) {
        var textArea = document.createElement("textarea");

        //
        // *** This styling is an extra step which is likely not required. ***
        //
        // Why is it here? To ensure:
        // 1. the element is able to have focus and selection.
        // 2. if element was to flash render it has minimal visual impact.
        // 3. less flakyness with selection and copying which **might** occur if
        //    the textarea element is not visible.
        //
        // The likelihood is the element won't even render, not even a flash,
        // so some of these are just precautions. However in IE the element
        // is visible whilst the popup box asking the user for permission for
        // the web page to copy to the clipboard.
        //

        // Place in top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;

        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textArea.style.width = '2em';
        textArea.style.height = '2em';

        // We don't need padding, reducing the size if it does flash render.
        textArea.style.padding = 0;

        // Clean up any borders.
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';

        // Avoid flash of white box if rendered for any reason.
        textArea.style.background = 'transparent';


        textArea.value = text;

        document.body.appendChild(textArea);

        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }

        document.body.removeChild(textArea);
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
})(jQuery);
