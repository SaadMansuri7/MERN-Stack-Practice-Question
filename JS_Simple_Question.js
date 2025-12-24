{//Q1: how to reverse a string:
    let str = "Hello, World!";
    const strRev = Array.from(str).toReversed().join('');
    const reversed = [...str].reverse().join('');
    console.log(reversed);
    console.log(strRev);
}


{//Q2: check if the number is Even or Odd as well as sort it:
    let arr = [1, 4, 3, 6, 2, 8, 9, 7];
    let even = arr.filter(a => a % 2 === 0).sort((a, b) => a - b);
    let odd = arr.filter(a => a % 2 !== 0).sort((a, b) => b - a);
    console.log('Even : ', even);
    console.log('Odd : ', odd);
}


{//Q3: Find the largest number in an array
    let arr = [1, 4, 3, 6, 2, 8, 9, 7];
    let largest1 = Math.max(...arr); //not suitable for large arrays
    let largest2 = arr.reduce((a, b) => a > b ? a : b); //better approch

    let smallest = Math.min(...arr);
    let smallest2 = arr.reduce((a, b) => a < b ? a : b);
    console.log(`Smallest using Math: `, smallest);
    console.log(`Smallest using Reduce: `, smallest2);
    console.log('Largest using Math: ', largest1);
    console.log('Largest using Reduce: ', largest2);
}

{//Q4: Remove duplicates from an array
    let arr = [1, 4, 3, 6, 3, 8, 1, 4];
    let unique = Array.from(new Set([...arr])); //use array.from because set will return object
    console.log('Unique Array: ', unique);
}

{//Q5: Count vowels in a string
    let str = "JavaScrIpt";
    function countVowel(str) {
        const vowels = 'aeiou';
        let count = 0;

        for (let c of str) {
            if (vowels.includes(c.toLowerCase())) {
                count++;
            }
        }
        return count;
    }
    let vowelsCount = countVowel(str);
    console.log('Vowels Count: ', vowelsCount);
}

{//Q6: Check if a string is a pallindrome
    let str = "SaaS";
    let str2 = "JavaScript";

    //option 1
    function isPallindrome1(str) {
        let reversed = [...str].reverse().join('');
        return str === reversed;
    }
    let isPal1 = isPallindrome1(str);
    console.log(`Is ${str} Pallindrome: `, isPal1);

    //option 2 better approch due to high performance
    function isPallindrome2(str) {
        let left = 0;
        let right = str.length - 1;

        while (left < right) {
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    }
    let isPal2 = isPallindrome2(str2);
    console.log(`Is ${str2} Pallindrome: `, isPal2);
}

{//Q7: Sum of an Array:
    let arr = [1, 4, 3, 6, 2, 8, 9, 7];
    let sum = arr.reduce((a, b) => a + b);
    console.log('Sum : ', sum);
}

{//Q8: Convert String to Title Case:
    let str = 'hellO worlD';
    let title = str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    //where \b: Finds a word boundary(the start of a word). \w: Selects the first alphanumeric character of that word.
    console.log('Title Case: ', title);
}

{//Q9: Factorial of a Number:
    let a = 9; factorial = 1;
    for (let i = 1; i <= a; i++) {
        factorial = factorial * i;
    }
    console.log(`Factorial of ${a}: `, factorial);
}

{//Q10: Find the Number of occurance of value:
    let arr = [1, 2, 2, 3, 2]; count = {};
    arr.forEach(num => { count[num] = (count[num] || 0) + 1 })
    console.log(`Number of Occurance: `, count);
}

{//Q11: Check if two strings are anagrams:
    const isAnagram = (str1, str2) => {
        const normalize = (s) => s.toLowerCase().split('').sort().join('');
        return normalize(str1) === normalize(str2)
    }
    console.log(isAnagram("listen", "silent"));
    console.log(isAnagram("hello", "world"));
}

{//Q12: Find the sum of digits of a number:
    let number = 12345;
    let sum = number.toString().split('').reduce((acc, num) => acc + Number(num), 0);
    console.log(`Sum of ${number} is:`, sum);
}

{//Q13: Find the second largest number in an array:
    const arr = [10, 5, 40, 20, 8, 40];
    let secondLargest = Array.from(new Set([...arr])).sort((a, b) => b - a)[1];
    console.log(`Second Largest is:`, secondLargest);
}

{//Q14: Find the missing number in an array (1 to n):
    const findMissingNum = (arr, n) => {
        const expectedSum = (n * (n + 1)) / 2;
        console.log('Expected Sum: ', expectedSum);
        const actualSum = arr.reduce((a, n) => a + n, 0);
        console.log('Actual Sum: ', actualSum);
        return expectedSum - actualSum;
    }
    const arr = [1, 2, 4, 5, 3, 7];
    const missing = findMissingNum(arr, arr.length + 1);
    console.log(`Missing Number is:`, missing);
}

{//Q15: Remove falsy values from an array:
    const arr = [0, 1, false, 2, "", 3, null, undefined, "hello", NaN];
    const cleanArr = arr.filter(Boolean);
    console.log('Cleaned Array: ', cleanArr);
}

{//Q16: Check if a number is prime:
    const isPrime = (n) => {
        if (n < 1) return false;
        if (n <= 3) return true;
        if (n % 2 === 0 || n % 3 === 0) return false;
        // All primes > 3 follow the pattern 6k ± 1
        for (let i = 5; i * i <= n; i += 6) {
            if (n % i === 0 || n % (i + 2) === 0) return false;
        }
        return true;
    }

    let num = 11;
    console.log(`${num} is prime:`, isPrime(num));
}

{//Q17: Find the First non repeating character in a string:
    const findNonRepeating = (str) => {
        const charCount = {};
        for (let char of str) {
            charCount[char] = (charCount[char] || 0) + 1;
        }
        // return charCount;
        for (let char of str) {
            if (charCount[char] === 1) {
                return char;
            }
        }
        return null;
    }
    let str = "aabbcde";
    let nonRepeat = findNonRepeating(str);
    console.log('First Non-Repeating Character: ', nonRepeat);
}

{//Q18: Reverse Words in Sentence:
    const str = "Hello World From JavaScript";
    const reversed = str.split(' ').reverse().join(' ')
    console.log('Reversed: ', reversed);
}

{//Q19: Check if the array is sorted:
    const isArrSorted = (arr) => {
        for (let i = 0; i <= arr.length; i++) {
            if (arr[i] > arr[i + 1]) {
                return false;
            }
        }
        return true;
    }
    let arr = [1, 2, 4, 3];
    const isSorted = isArrSorted(arr);
    console.log('Sorted: ', isSorted);
}

{//Q20: Find the intersection of two arrays:
    const arr1 = [1, 2, 2, 3, 4];
    const arr2 = [3, 4, 4, 5];
    const set1 = new Set([...arr1]);
    const set2 = new Set([...arr2]);
    const intersection = set1.intersection(set2);
    console.log('Intersection: ', [...intersection]);
}

{//Q21: Find the longest word in a sentence:
    const sen = "The quick brown fox jumped overrrrrrr the lazy dog";
    const longest = sen.split(' ').reduce((cur, next) => cur.length > next.length ? cur : next);
    console.log('Longest : ', longest);
}

{//Q22: Count the number of words in a sentence:
    const sen = "The quick brown fox jumped overrrrrrr the lazy dog";
    const wordCount = sen.split(' ').length;
    console.log('Words in a Sentence: ', wordCount);
}

{//Q23: Merge two arrays and remove duplicates:
    const arr1 = [1, 2];
    const arr2 = [2, 3, 4];
    const merged = [...arr1, ...arr2];
    const mergedWithoutDuplicates = new Set([...merged])
    console.log('Merged without Duplicate values: ', [...mergedWithoutDuplicates]);
}

{//Q24: Generate a Fibonacci sequence up to n terms:
    const genFibo = (num) => {
        if (num <= 0) return [];
        if (num === 1) return [0];
        let fibonacci = [0, 1];
        for (let i = 2; i < num; i++) {
            fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
        }
        return fibonacci;
    }
    const n = 5;
    const fibo = genFibo(n);
    console.log(`Fibonacci of ${n} is: `, fibo);
}