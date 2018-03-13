/*
 * Parse the data and create a graph with the data.
 */
function parseData(createGraph) {
	Papa.parse("../data/sfpd_dispatch_data_subset.csv", {
		download: true,
		complete: function(results) {
			console.log(results.data);
			createGraph(results.data);
		}
	});
}

function createGraph(data) {
	var zipcode_finalPri = ["zipcode_finalPri"];

	// 2d array. first number is the zipcode, next number is the final_priority
	// for ex, [94121, 2], [94103, 2], ...
	for (var i = 1; i < data.length; i++) {
		var inner_arr = [];
		inner_arr.push(data[i][17]);
		inner_arr.push(data[i][23]);
		zipcode_finalPri.push(inner_arr);
	}

	// sort zipcode_finalPri by zipcode
	zipcode_finalPri.sort(sortFunction);

	// splice the undefined array at pos 0 and pos 1
	//zipcode_finalPri.splice(0, 2);

	console.log(zipcode_finalPri);

	// create 2d array. first number is the zipcode, next number is the count of 2 and 3 priorities
	// for ex, [94121, 20, 25] means there were 20 2 priorities and 25 3 priorities in 94121
	var count2 = 0;
	var count3 = 0;
	var zipcode_num2_num3 = [ [94102, 0, 0] ];

	// fill zipcode_num2_num3 with empty inner arrs
	for (var i = 0; i < 55; i++) {
		zipcode_num2_num3.push([0, 0, 0]);
	}

	console.log(zipcode_num2_num3);
	console.log(zipcode_finalPri[0][0]);
	console.log(zipcode_finalPri[0][1]);
	console.log(zipcode_finalPri[0][0] == zipcode_num2_num3[0][0]);

	var j = 0;
	for (var i = 0; i < 100; i++) {
		/* for every year in zipcode_finalPri, check if that exists in zipcode_num2_num3
		*  if it does, add one to count2 if the final_priority is 2
		*  add one to count3 if the final_priority is 3
		*  if the zipcode doesnt exist, add new year to zipcode_num2_num3
		*  and increment count2 or count3 corresspondingly
		*/
		if (zipcode_finalPri[i][0] == zipcode_num2_num3[j][0]) {
			if (zipcode_finalPri[i][1] == 2) {
				count2++;
				console.log("count2: " + count2 + " when i is " + i);
			}
			else if (zipcode_finalPri[i][1] == 3) {
				count3++;
				console.log("count3: " + count3 + " when i is " + i);
			}
		}
		else {
			// moving on to a new zipcode,
			// so add count2 and count3 to the previous zipcode and reset the counts
			zipcode_num2_num3[j-1][1] = count2;
			zipcode_num2_num3[j-1][2] = count3;
			count2 = 0;
			count3 = 0;

			// set new zipcode
			zipcode_num2_num3[j+1][0] = zipcode_finalPri[i][0];

			// increment count2 or count3
			if (zipcode_finalPri[i][1] == 2) {
				count2++;
			}
			else if (zipcode_finalPri[i][1] == 3) {
				count3++;
			}
			j++;
		}
	}
}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

parseData(createGraph);
