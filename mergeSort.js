
function mergeSort(array) {
	if (array.length === 1) return array; //Escape clause to get out of recursion and begin merging
  let sortedArray = [];
  
  //Split the problem up recursively
  const mid = Math.floor(array.length/2)
  let leftSide = mergeSort(array.slice(0, mid));
  let rightSide = mergeSort(array.slice(mid));
  
  //Merge into a new array
  ((l, r) => {
  	let i = 0, j=0;
  
		while (i < l.length && j < r.length) {
			l[i] < r[j] ? sortedArray.push(l[i++]) : sortedArray.push(r[j++]);
		}
    while(i < l.length) sortedArray.push(l[i++]);
    while(j < r.length) sortedArray.push(r[j++]);

	})(leftSide, rightSide);
  
  return sortedArray;
 }

 export default mergeSort;