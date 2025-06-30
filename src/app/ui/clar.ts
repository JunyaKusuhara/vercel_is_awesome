// 元日の曜日番号を取得する関数
function weekOf1st (num:number) {
	let sum = 0;
	let dayOfweek = 0;

	// うるう年も考慮して年間日数を取得する関数
	const daysInYear = function (n:number) {
		if ((n % 4 === 0) && !((n % 100 === 0) && !(n % 400 === 0))){
			return 366;
		} else {
			return 365;
		}
	}

	if (num > 2025) {										// 2025年を基準に翌年以降の年
		for(let i=0; 2025+i < num; i++){
			sum += daysInYear(2025+i);
		}

		dayOfweek = (3+sum)%7;					// 7の余剰が週を表す番号となる

	} else if(num < 2025) {								// 2025年を基準に前年以前の年
		for(let i=0; 2025-i > num; i++){
			sum += daysInYear(2024-i);
		}

		dayOfweek = 3 < (sum%7) ? 7+3-(sum%7) : 3-(sum%7);	// 週を遡る

	} else {															// 2025年の場合
		dayOfweek = 3;
	}

	return dayOfweek;
};

/*テストコード
for(let i=2020; i<2040; i++){
console.log(i,weekOf1st(i));
}
*/

// 年間の月日データを作成する関数
function createMonths (num:number) {
	const months = [];
	const leap = (num % 4 === 0) && !((num % 100 === 0) && !(num % 400 === 0));	// 平潤
	const endOfMonth =												// うるう年とそれ以外で月の長さを分ける
		leap
		?
		[31,29,31,30,31,30,31,31,30,31,30,31]
		:
		[31,28,31,30,31,30,31,31,30,31,30,31];

	let weekCounter = weekOf1st(num);					// 元日の曜日番号を取得

	for(let i=0; i<=11; i++){										// 月データ作成
		const month = [];

		for(let j=0; j < endOfMonth[i]; j++){
			const day = {														// 日データのオブジェクト
					dayOfWeek: weekCounter%7,				// 曜日番号
					holiday: false,												// 祝日
			};
			month.push(day);
			weekCounter++;
		}

		months.push(month);
	}

	return months;
};

// 祝日を月日に割り当てる関数✅
function createHolidays(number:number, months:{dayOfWeek:number;holiday:boolean}[][]) {

	const holidays = [
			[0],
			[10,22],
			[],
			[28],
			[2,3,4],
			[],
			[],
			[10],
			[],
			[],
			[2,22],
			[],
	]


	// 成人の日（1月）、スポーツの日（10月）（第2月曜日）追加
	function secondMonday(month:{dayOfWeek:number}[]){
		const weekOfStart = month[0].dayOfWeek;
		if (weekOfStart === 0 || weekOfStart === 1) {
			return 8 - weekOfStart;
		} else {
			return 15 - weekOfStart;
		}
	}

	holidays[0].push (secondMonday(months[0]));						// 成人の日追加
	holidays[9].push (secondMonday(months[9]));						// スポーツの日追加


	// 海の日（7月）、敬老の日（9月）（第3月曜日）追加
	function thirdMonday(month:{dayOfWeek:number}[]){
		const weekOfStart = month[0].dayOfWeek;
		if (weekOfStart === 0 || weekOfStart === 1) {
			return 15 - weekOfStart;
		} else {
			return 22 - weekOfStart;
		}
	}

	holidays[6].push (thirdMonday(months[6]));							// 海の日追加
	holidays[8].push (thirdMonday(months[8]));							// 敬老の日追加


	// 春分日（3月）・秋分日（9月）
	const sprAuts = [
			//2020-
			{spr:19,aut:21},
			{spr:19,aut:22},
			{spr:20,aut:22},
			{spr:20,aut:22},
			{spr:19,aut:21},

			{spr:19,aut:22},
			{spr:19,aut:22},
			{spr:20,aut:22},
			{spr:19,aut:21},
			{spr:19,aut:22},

			//2030-
			{spr:19,aut:22},
			{spr:20,aut:22},
			{spr:19,aut:21},
			{spr:19,aut:22},
			{spr:19,aut:22},

			{spr:20,aut:22},
			{spr:19,aut:21},
			{spr:19,aut:22},
			{spr:19,aut:22},
			{spr:20,aut:22},

			//2040-
			{spr:19,aut:21},
			{spr:19,aut:22},
			{spr:19,aut:22},
			{spr:20,aut:22},
			{spr:19,aut:21},

			{spr:19,aut:21},
			{spr:19,aut:22},
			{spr:20,aut:22},
			{spr:19,aut:21},
			{spr:19,aut:21},

			//2050-
			{spr:19,aut:22},
	]

	if (number >= 2020 && number <= 2050) {
		const sprAut = sprAuts[(number-2020)];
		holidays[2].push(sprAut.spr);
		holidays[8].push(sprAut.aut);
	} else {									// 2020-2050年の範囲外は、春分日20日、秋分日23日に仮に固定
		holidays[2].push(19);
		holidays[8].push(22);
	}

	// 法3条3項の休日（3連休）
	if((holidays[8][1]-holidays[8][0]) === 2) {
		holidays[8].push(holidays[8][0]+1);
	}


	// yearオブジェクトに当てはめる

	for(let i=0; i<=11; i++){
		for(const holiday of holidays[i]){
			const day = months[i][holiday];
			const nextDay = months[i][holiday+1];
			
			// 法3条2項の休日（振替休日）
			if (day.dayOfWeek === 0 || day.holiday === true) {
					day.holiday = true
					nextDay.holiday = true
			} else {
					day.holiday = true
			} 
		}
	}
}

/*敬老の日と秋分の日が重なる可能性があるが、
	翌日振替休日扱いにした
*/

// すべての年の月日データ（Mapオブジェクト）を作成する関数
function createYears (startNum:number, endNum?: number) {
	const years = new Map();

	const months = createMonths(startNum);							// 開始年の月日データを作成する
	createHolidays(startNum, months);										// 祝日を当てはめる

	years.set(startNum, months);

	if(endNum){
		for(let i = startNum+1; i <= endNum; i++){
			const months = createMonths(i);
			createHolidays(i, months);	
		
			years.set(i, months);
		}
	}

	return years;
}

export default createYears