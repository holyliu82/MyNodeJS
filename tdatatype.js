var body = {
	'appId': '1234',
	disNumber: '17088889999',
	"number": '13810374501'
};

console.log('appId=' + body.appId);
console.log('disNumber=' + body.disNumber);
console.log('number=' + body.number);

main();

function main() {
	var body2 = {
		'appId2': '1234',
		disNumber2: '17088889999',
		"number2": '13810374501'
	};

	showPara(body2);
}

function showPara(body3) {
	console.log('appId=' + body3.appId2);
	console.log('disNumber=' + body3.disNumber2);
	console.log('number=' + body3.number2);
}