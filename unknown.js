function collatz(n){
    return n <= 1 ? 0 : n%2 === 0 ? 1+collatz(Math.floor(n/2)) : 1+collatz(3*n+1);
};
for (var n=0; n<Math.pow(2,256); ++n)
    console.log(collatz(n));
