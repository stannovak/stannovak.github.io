var CountryList = [
    {"id":"004","name":"Afghanistan","code":"AF","dial":"93"},
	{"id":"008","name":"Albania","code":"AL","dial":"355"},
	{"id":"012","name":"Algeria","code":"DZ","dial":"213"},
	{"id":"016","name":"American Samoa","code":"AS","dial":"1-684"},
	{"id":"020","name":"Andorra","code":"AD","dial":"376"},
	{"id":"024","name":"Angola","code":"AO","dial":"244"},
	{"id":"660","name":"Anguilla","code":"AI","dial":"1-264"},
	{"id":"010","name":"Antarctica","code":"AQ","dial":"672"},
	{"id":"028","name":"Antigua and Barbuda","code":"AG","dial":"1-268"},
	{"id":"032","name":"Argentina","code":"AR","dial":"54"},
	{"id":"051","name":"Armenia","code":"AM","dial":"374"},
	{"id":"533","name":"Aruba","code":"AW","dial":"297"},
	{"id":"036","name":"Australia","code":"AU","dial":"61"},
	{"id":"040","name":"Austria","code":"AT","dial":"43"},
	{"id":"031","name":"Azerbaijan","code":"AZ","dial":"994"},
	{"id":"044","name":"Bahamas","code":"BS","dial":"1-242"},
	{"id":"048","name":"Bahrain","code":"BH","dial":"973"},
	{"id":"050","name":"Bangladesh","code":"BD","dial":"880"},
	{"id":"052","name":"Barbados","code":"BB","dial":"1-246"},
	{"id":"112","name":"Belarus","code":"BY","dial":"375"},
	{"id":"056","name":"Belgium","code":"BE","dial":"32"},
	{"id":"084","name":"Belize","code":"BZ","dial":"501"},
	{"id":"204","name":"Benin","code":"BJ","dial":"229"},
	{"id":"060","name":"Bermuda","code":"BM","dial":"1-441"},
	{"id":"064","name":"Bhutan","code":"BT","dial":"975"},
	{"id":"068","name":"Bolivia, Plurinational State of","code":"BO","dial":"591"},
	{"id":"535","name":"Bonaire, Sint Eustatius and Saba","code":"BQ","dial":"599"},
	{"id":"070","name":"Bosnia and Herzegovina","code":"BA","dial":"387"},
	{"id":"072","name":"Botswana","code":"BW","dial":"267"},
	{"id":"074","name":"Bouvet Island","code":"BV","dial":"47"},
	{"id":"076","name":"Brazil","code":"BR","dial":"55"},
	{"id":"086","name":"British Indian Ocean Territory","code":"IO","dial":"246"},
	{"id":"096","name":"Brunei Darussalam","code":"BN","dial":"673"},
	{"id":"100","name":"Bulgaria","code":"BG","dial":"359"},
	{"id":"854","name":"Burkina Faso","code":"BF","dial":"226"},
	{"id":"108","name":"Burundi","code":"BI","dial":"257"},
	{"id":"116","name":"Cambodia","code":"KH","dial":"855"},
	{"id":"120","name":"Cameroon","code":"CM","dial":"237"},
	{"id":"124","name":"Canada","code":"CA","dial":"1"},
	{"id":"132","name":"Cape Verde","code":"CV","dial":"238"},
	{"id":"136","name":"Cayman Islands","code":"KY","dial":"1-345"},
	{"id":"140","name":"Central African Republic","code":"CF","dial":"236"},
	{"id":"148","name":"Chad","code":"TD","dial":"235"},
	{"id":"152","name":"Chile","code":"CL","dial":"56"},
	{"id":"156","name":"China","code":"CN","dial":"86"},
	{"id":"162","name":"Christmas Island","code":"CX","dial":"61"},
	{"id":"166","name":"Cocos (Keeling) Islands","code":"CC","dial":"61"},
	{"id":"170","name":"Colombia","code":"CO","dial":"57"},
	{"id":"174","name":"Comoros","code":"KM","dial":"269"},
	{"id":"178","name":"Congo","code":"CG","dial":"242"},
	{"id":"180","name":"Congo, the Democratic Republic of the","code":"CD","dial":"243"},
	{"id":"184","name":"Cook Islands","code":"CK","dial":"682"},
	{"id":"188","name":"Costa Rica","code":"CR","dial":"506"},
	{"id":"191","name":"Croatia","code":"HR","dial":"385"},
	{"id":"192","name":"Cuba","code":"CU","dial":"53"},
	{"id":"196","name":"Cyprus","code":"CY","dial":"357"},
	{"id":"203","name":"Czech Republic","code":"CZ","dial":"420"},
	{"id":"384","name":"Cote d'Ivoire","code":"CI","dial":"225"},
	{"id":"208","name":"Denmark","code":"DK","dial":"45"},
	{"id":"262","name":"Djibouti","code":"DJ","dial":"253"},
	{"id":"212","name":"Dominica","code":"DM","dial":"1-767"},
	{"id":"214","name":"Dominican Republic","code":"DO","dial":"1-809"},
	{"id":"218","name":"Ecuador","code":"EC","dial":"593"},
	{"id":"818","name":"Egypt","code":"EG","dial":"20"},
	{"id":"222","name":"El Salvador","code":"SV","dial":"503"},
	{"id":"226","name":"Equatorial Guinea","code":"GQ","dial":"240"},
	{"id":"232","name":"Eritrea","code":"ER","dial":"291"},
	{"id":"233","name":"Estonia","code":"EE","dial":"372"},
	{"id":"231","name":"Ethiopia","code":"ET","dial":"251"},
	{"id":"238","name":"Falkland Islands (Malvinas)","code":"FK","dial":"500"},
	{"id":"234","name":"Faroe Islands","code":"FO","dial":"298"},
	{"id":"242","name":"Fiji","code":"FJ","dial":"679"},
	{"id":"246","name":"Finland","code":"FI","dial":"358"},
	{"id":"250","name":"France","code":"FR","dial":"33"},
	{"id":"254","name":"French Guiana","code":"GF","dial":"594"},
	{"id":"258","name":"French Polynesia","code":"PF","dial":"689"},
	{"id":"260","name":"French Southern Territories","code":"TF","dial":"262"},
	{"id":"266","name":"Gabon","code":"GA","dial":"241"},
	{"id":"270","name":"Gambia","code":"GM","dial":"220"},
	{"id":"268","name":"Georgia","code":"GE","dial":"995"},
	{"id":"276","name":"Germany","code":"DE","dial":"49"},
	{"id":"288","name":"Ghana","code":"GH","dial":"233"},
	{"id":"292","name":"Gibraltar","code":"GI","dial":"350"},
	{"id":"300","name":"Greece","code":"GR","dial":"30"},
	{"id":"304","name":"Greenland","code":"GL","dial":"299"},
	{"id":"308","name":"Grenada","code":"GD","dial":"1-473"},
	{"id":"312","name":"Guadeloupe","code":"GP","dial":"590"},
	{"id":"316","name":"Guam","code":"GU","dial":"1-671"},
	{"id":"320","name":"Guatemala","code":"GT","dial":"502"},
	{"id":"831","name":"Guernsey","code":"GG","dial":"44"},
	{"id":"324","name":"Guinea","code":"GN","dial":"224"},
	{"id":"624","name":"Guinea-Bissau","code":"GW","dial":"245"},
	{"id":"328","name":"Guyana","code":"GY","dial":"592"},
	{"id":"332","name":"Haiti","code":"HT","dial":"509"},
	{"id":"334","name":"Heard Island and McDonald Islands","code":"HM","dial":"672"},
	{"id":"336","name":"Holy See (Vatican City State)","code":"VA","dial":"39-06"},
	{"id":"340","name":"Honduras","code":"HN","dial":"504"},
	{"id":"344","name":"Hong Kong","code":"HK","dial":"852"},
	{"id":"348","name":"Hungary","code":"HU","dial":"36"},
	{"id":"352","name":"Iceland","code":"IS","dial":"354"},
	{"id":"356","name":"India","code":"IN","dial":"91"},
	{"id":"360","name":"Indonesia","code":"ID","dial":"62"},
	{"id":"364","name":"Iran, Islamic Republic of","code":"IR","dial":"98"},
	{"id":"368","name":"Iraq","code":"IQ","dial":"964"},
	{"id":"372","name":"Ireland","code":"IE","dial":"353"},
	{"id":"833","name":"Isle of Man","code":"IM","dial":"44"},
	{"id":"376","name":"Israel","code":"IL","dial":"972"},
	{"id":"380","name":"Italy","code":"IT","dial":"39"},
	{"id":"388","name":"Jamaica","code":"JM","dial":"1-876"},
	{"id":"392","name":"Japan","code":"JP","dial":"81"},
	{"id":"832","name":"Jersey","code":"JE","dial":"44"},
	{"id":"400","name":"Jordan","code":"JO","dial":"962"},
	{"id":"398","name":"Kazakhstan","code":"KZ","dial":"7"},
	{"id":"404","name":"Kenya","code":"KE","dial":"254"},
	{"id":"296","name":"Kiribati","code":"KI","dial":"686"},
	{"id":"408","name":"Korea, Democratic People's Republic of","code":"KP","dial":"850"},
	{"id":"410","name":"Korea, Republic of","code":"KR","dial":"82"},
	{"id":"414","name":"Kuwait","code":"KW","dial":"965"},
	{"id":"417","name":"Kyrgyzstan","code":"KG","dial":"996"},
	{"id":"418","name":"Lao People's Democratic Republic","code":"LA","dial":"856"},
	{"id":"428","name":"Latvia","code":"LV","dial":"371"},
	{"id":"422","name":"Lebanon","code":"LB","dial":"961"},
	{"id":"426","name":"Lesotho","code":"LS","dial":"266"},
	{"id":"430","name":"Liberia","code":"LR","dial":"231"},
	{"id":"434","name":"Libya","code":"LY","dial":"218"},
	{"id":"438","name":"Liechtenstein","code":"LI","dial":"423"},
	{"id":"440","name":"Lithuania","code":"LT","dial":"370"},
	{"id":"442","name":"Luxembourg","code":"LU","dial":"352"},
	{"id":"446","name":"Macao","code":"MO","dial":"853"},
	{"id":"807","name":"Macedonia, the Former Yugoslav Republic of","code":"MK","dial":"389"},
	{"id":"450","name":"Madagascar","code":"MG","dial":"261"},
	{"id":"454","name":"Malawi","code":"MW","dial":"265"},
	{"id":"458","name":"Malaysia","code":"MY","dial":"60"},
	{"id":"462","name":"Maldives","code":"MV","dial":"960"},
	{"id":"466","name":"Mali","code":"ML","dial":"223"},
	{"id":"470","name":"Malta","code":"MT","dial":"356"},
	{"id":"584","name":"Marshall Islands","code":"MH","dial":"692"},
	{"id":"474","name":"Martinique","code":"MQ","dial":"596"},
	{"id":"478","name":"Mauritania","code":"MR","dial":"222"},
	{"id":"480","name":"Mauritius","code":"MU","dial":"230"},
	{"id":"175","name":"Mayotte","code":"YT","dial":"262"},
	{"id":"484","name":"Mexico","code":"MX","dial":"52"},
	{"id":"583","name":"Micronesia, Federated States of","code":"FM","dial":"691"},
	{"id":"498","name":"Moldova, Republic of","code":"MD","dial":"373"},
	{"id":"492","name":"Monaco","code":"MC","dial":"377"},
	{"id":"496","name":"Mongolia","code":"MN","dial":"976"},
	{"id":"499","name":"Montenegro","code":"ME","dial":"382"},
	{"id":"500","name":"Montserrat","code":"MS","dial":"1-664"},
	{"id":"504","name":"Morocco","code":"MA","dial":"212"},
	{"id":"508","name":"Mozambique","code":"MZ","dial":"258"},
	{"id":"104","name":"Myanmar","code":"MM","dial":"95"},
	{"id":"516","name":"Namibia","code":"NA","dial":"264"},
	{"id":"520","name":"Nauru","code":"NR","dial":"674"},
	{"id":"524","name":"Nepal","code":"NP","dial":"977"},
	{"id":"528","name":"Netherlands","code":"NL","dial":"31"},
	{"id":"540","name":"New Caledonia","code":"NC","dial":"687"},
	{"id":"554","name":"New Zealand","code":"NZ","dial":"64"},
	{"id":"558","name":"Nicaragua","code":"NI","dial":"505"},
	{"id":"562","name":"Niger","code":"NE","dial":"227"},
	{"id":"566","name":"Nigeria","code":"NG","dial":"234"},
	{"id":"570","name":"Niue","code":"NU","dial":"683"},
	{"id":"574","name":"Norfolk Island","code":"NF","dial":"672"},
	{"id":"580","name":"Northern Mariana Islands","code":"MP","dial":"1-670"},
	{"id":"578","name":"Norway","code":"NO","dial":"47"},
	{"id":"512","name":"Oman","code":"OM","dial":"968"},
	{"id":"586","name":"Pakistan","code":"PK","dial":"92"},
	{"id":"585","name":"Palau","code":"PW","dial":"680"},
	{"id":"275","name":"Palestine, State of","code":"PS","dial":"970"},
	{"id":"591","name":"Panama","code":"PA","dial":"507"},
	{"id":"598","name":"Papua New Guinea","code":"PG","dial":"675"},
	{"id":"600","name":"Paraguay","code":"PY","dial":"595"},
	{"id":"604","name":"Peru","code":"PE","dial":"51"},
	{"id":"608","name":"Philippines","code":"PH","dial":"63"},
	{"id":"612","name":"Pitcairn","code":"PN","dial":"870"},
	{"id":"616","name":"Poland","code":"PL","dial":"48"},
	{"id":"620","name":"Portugal","code":"PT","dial":"351"},
	{"id":"630","name":"Puerto Rico","code":"PR","dial":"1"},
	{"id":"634","name":"Qatar","code":"QA","dial":"974"},
	{"id":"642","name":"Romania","code":"RO","dial":"40"},
	{"id":"643","name":"Russian Federation","code":"RU","dial":"7"},
	{"id":"646","name":"Rwanda","code":"RW","dial":"250"},
	{"id":"638","name":"Reunion","code":"RE","dial":"262"},
	{"id":"652","name":"Saint Bartholemy","code":"BL","dial":"590"},
	{"id":"659","name":"Saint Kitts and Nevis","code":"KN","dial":"1-869"},
	{"id":"662","name":"Saint Lucia","code":"LC","dial":"1-758"},
	{"id":"663","name":"Saint Martin (French part)","code":"MF","dial":"590"},
	{"id":"666","name":"Saint Pierre and Miquelon","code":"PM","dial":"508"},
	{"id":"670","name":"Saint Vincent and the Grenadines","code":"VC","dial":"1-784"},
	{"id":"882","name":"Samoa","code":"WS","dial":"685"},
	{"id":"674","name":"San Marino","code":"SM","dial":"378"},
	{"id":"678","name":"Sao Tome and Principe","code":"ST","dial":"239"},
	{"id":"682","name":"Saudi Arabia","code":"SA","dial":"966"},
	{"id":"686","name":"Senegal","code":"SN","dial":"221"},
	{"id":"688","name":"Serbia","code":"RS","dial":"381 p"},
	{"id":"690","name":"Seychelles","code":"SC","dial":"248"},
	{"id":"694","name":"Sierra Leone","code":"SL","dial":"232"},
	{"id":"702","name":"Singapore","code":"SG","dial":"65"},
	{"id":"534","name":"Sint Maarten (Dutch part)","code":"SX","dial":"1-721"},
	{"id":"703","name":"Slovakia","code":"SK","dial":"421"},
	{"id":"705","name":"Slovenia","code":"SI","dial":"386"},
	{"id":"090","name":"Solomon Islands","code":"SB","dial":"677"},
	{"id":"706","name":"Somalia","code":"SO","dial":"252"},
	{"id":"710","name":"South Africa","code":"ZA","dial":"27"},
	{"id":"239","name":"South Georgia and the South Sandwich Islands","code":"GS","dial":"500"},
	{"id":"728","name":"South Sudan","code":"SS","dial":"211"},
	{"id":"724","name":"Spain","code":"ES","dial":"34"},
	{"id":"144","name":"Sri Lanka","code":"LK","dial":"94"},
	{"id":"729","name":"Sudan","code":"SD","dial":"249"},
	{"id":"740","name":"Suriname","code":"SR","dial":"597"},
	{"id":"744","name":"Svalbard and Jan Mayen","code":"SJ","dial":"47"},
	{"id":"748","name":"Swaziland","code":"SZ","dial":"268"},
	{"id":"752","name":"Sweden","code":"SE","dial":"46"},
	{"id":"756","name":"Switzerland","code":"CH","dial":"41"},
	{"id":"760","name":"Syrian Arab Republic","code":"SY","dial":"963"},
	{"id":"158","name":"Taiwan, Province of China","code":"TW","dial":"886"},
	{"id":"762","name":"Tajikistan","code":"TJ","dial":"992"},
	{"id":"834","name":"Tanzania, United Republic of","code":"TZ","dial":"255"},
	{"id":"764","name":"Thailand","code":"TH","dial":"66"},
	{"id":"626","name":"Timor-Leste","code":"TL","dial":"670"},
	{"id":"768","name":"Togo","code":"TG","dial":"228"},
	{"id":"772","name":"Tokelau","code":"TK","dial":"690"},
	{"id":"776","name":"Tonga","code":"TO","dial":"676"},
	{"id":"780","name":"Trinidad and Tobago","code":"TT","dial":"1-868"},
	{"id":"788","name":"Tunisia","code":"TN","dial":"216"},
	{"id":"792","name":"Turkey","code":"TR","dial":"90"},
	{"id":"795","name":"Turkmenistan","code":"TM","dial":"993"},
	{"id":"796","name":"Turks and Caicos Islands","code":"TC","dial":"1-649"},
	{"id":"798","name":"Tuvalu","code":"TV","dial":"688"},
	{"id":"800","name":"Uganda","code":"UG","dial":"256"},
	{"id":"804","name":"Ukraine","code":"UA","dial":"380"},
	{"id":"784","name":"United Arab Emirates","code":"AE","dial":"971"},
	{"id":"826","name":"United Kingdom","code":"GB","dial":"44"},
	{"id":"840","name":"United States","code":"US","dial":"1"},
	{"id":"858","name":"Uruguay","code":"UY","dial":"598"},
	{"id":"860","name":"Uzbekistan","code":"UZ","dial":"998"},
	{"id":"548","name":"Vanuatu","code":"VU","dial":"678"},
	{"id":"862","name":"Venezuela, Bolivarian Republic of","code":"VE","dial":"58"},
	{"id":"704","name":"Viet Nam","code":"VN","dial":"84"},
	{"id":"092","name":"Virgin Islands, British","code":"VG","dial":"1-284"},
	{"id":"850","name":"Virgin Islands, U.S.","code":"VI","dial":"1-340"},
	{"id":"876","name":"Wallis and Futuna","code":"WF","dial":"681"},
	{"id":"732","name":"Western Sahara","code":"EH","dial":"212"},
	{"id":"887","name":"Yemen","code":"YE","dial":"967"},
	{"id":"894","name":"Zambia","code":"ZM","dial":"260"},
	{"id":"716","name":"Zimbabwe","code":"ZW","dial":"263"}
];

var USStateList = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};

try {
    setupCountry();
} catch (err){console.log('cc.js: ' + err);}
