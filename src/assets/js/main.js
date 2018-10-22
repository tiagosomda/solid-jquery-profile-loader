
$('#profile .load-profile').click(() => {loadDataBtn()});

const MYWEBID = 'https://adalovelace.solidtest.space/profile/card#me';

function loadDataBtn()
{
    var webid = $('#custom-webid').val();

    if(webid ===  undefined || webid === '')
    {
        webid = MYWEBID;
    }

    loadProfile(webid);
}

async function loadProfile(webid)
{
    loadingProfile();

    var rdfHelper = await RDFHelper(webid);

    var data = {};
    data.name = rdfHelper.getValueFromVCard('fn');
    data.role = rdfHelper.getValueFromVCard('role');
    data.company = rdfHelper.getValueFromVCard('organization-name');
    data.photo = rdfHelper.getValueFromVCard('hasPhoto');
    data.webid = webid;

    const hasEmail = rdfHelper.getValueFromVCard('hasEmail');
    if(hasEmail)
    {
        var mailto = rdfHelper.getValueFromVCard('value', hasEmail);
        data.email = mailto && mailto.split('mailto:')[1];
    }

    setProfile(data);
}

function setProfile(profile)
{
    
    $('#profile #name').text(profile.name);
    $('#profile #role').text(profile.role);
    $('#profile #company').text(profile.company);
    $('#profile #email').text(profile.email);
    $('#custom-webid').val(profile.webid);
    
    // set profile photo and 
    $("#profile #profile-image")
    .on("load", function() {
        profileLoaded();
    })
    .on('error', function() { 
        $("#profile #profile-image").attr("src", "https://avatars3.githubusercontent.com/u/14262490");
    })
    .attr("src", profile.photo);
}

loadingProfile = function()
{
    $('#loading-profile-image').show();
    $('#profile-image').hide();
    $('#profile .solid-info').hide();
}


profileLoaded = function()
{
    $('#loading-profile-image').hide();
        
    $('#profile .profile-info').show(1500);
    $('#profile-image').show(1000);
}