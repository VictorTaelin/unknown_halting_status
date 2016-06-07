## Small programs with unknown halting status

The halting problem always puzzled me. It says there is no algorithm that can determine if an arbitrary program halts. That seemed counter-intuitive; for example, this program:

```javascript
var x = 7;
var y = x + x;
console.log(y);
```

Certainly halts, as it outputs `14`. Similarly, this program:

```javascript
var x = 7;
while (x > 3) {
    x = x + 1;
};
console.log(x);
```

Certainly doesn't terminate, and a human can quickly determine it: all it takes is a quick inspection to see that `x` will never be less than 3, thus the loop will never stop. In fact, I couldn't remember of a single program I've even seen that I wasn't able to determine if it terminates with enough inspection. Huge, complex programs such as compilers might fall in that category, but that is just because they are too big to inspect; it still feels that, with enough time and patience, one could do it.

That lead me to look for a small, simple example of program with that property. That is, I wanted to isolate the mechanism that makes it so hard to solve the halting problem. Turns out this ~72 bytes [Binary λ-calculus](https://en.wikipedia.org/wiki/Binary_lambda_calculus) expression is a candidate:

    01001001000100010001000101100111101111001110010101000001110011101000000111001110
    10010000011100111010000001110011101000000111001110100000000111000011100111110100
    00101011000000000010111011100101011111000000111001011111101101011010000000100000
    10000001011100000000001110010101010101010111100000011100101010110000000001110000
    00000111100000000011110000000001100001010101100000001110000000110000000100000001
    00000000010010111110111100000010101111110000001100000011100111110000101101101110
    00110000101100010111001011111011110000001110010111111000011110011110011110101000
    0010110101000011010

If it terminates, it returns a list with all the numbers from the serie [A006577](https://oeis.org/A006577) from 0 til 2^256 - all [church encoded](https://en.wikipedia.org/wiki/Church_encoding). This series lists the amount of recursive calls it takes for the [Collatz](https://en.wikipedia.org/wiki/Collatz_conjecture) function to halt. While we do know that `collatz` halts for all numbers up to about `2^64`, it is not known whether it halts for every natural number, so, nobody can tell if this particular program will ever terminate. 

This program can also be written in a more conventional syntax; for example, in Scheme, this is:

    ((λ(a)((λ(b)((λ(c)((λ(d)((λ(e)((λ(f)e) ((d (a b)) (c (λ(f)(λ(g)(f (f (f (f (f (f
    (f (f g)))))))))))))) ((λ(e)((λ(f)((d (fe)) (c ((((λ(g)(λ(h)(g (g h)))) (λ(g)(λ(
    h)(g (g h))))) ((λ(g)(λ(h)(g (g h)))) (λ(g)(λ(h)(g (g h)))))) (λ(g)(λ(h)(g (g h)
    ))))))) (λ(f)(λ(g)((f (λ(h)(λ(i)(λ(j)(λ(k)(j ((((((((i (λ(l)(λ(m)(l ((((m (λ(n)(
    λ(o)(λ(p)(λ(q)o))))) (λ(n)(λ(o)(λ(p)(λ(qn))))) (λ(n)(λ(o)(λ(p)(λ(q)n))))) (λ(n)
    (λ(o)(λ(p)(λ(q)p))))))))) (λ(l)((((l (λ(m)(λ(n)(λ(o)m)))) (λ(m)(λ(n)(λ(o)n)))) (
    λ(m)(λ(n)(λ(o)o)))) (λ(m)(λ(n)(λ(o)o))))) (λ(l)(λ(m)(λ(n)(λ(o)o))))) ((h h) (λ(
    l)(λ(m)(((i (λ(n)(λ(o)(o (λ(p)(λ(q)(p (n(λ(r)((r q) p)))))))))) (λ(n)m)) (λ(n)((
    n (λ(o)o)) l))))))) ((h h) (λ(l)(λ(m)(l (i (λ(n)(l (l (l n))))) m)))))) (λ(l)(λ
    (m)m))) j) k))))))) g))))) (λ(e)(e e)))) (λ(d)(λ(e)(λ(f)(e (λ(g)(f (d g))))))))
    ) (λ(c)(((c (λ(d)(λ(e)(λ(f)(λ(g)((f e) (((d (λ(h)(λ(i)(h ((e h) i))))) f) g)))))
    )) (λ(d)(λ(e)(λ(f)f)))) (λ(d)(λ(e)e))))) (λ(b)(b b)))) (λ(a)(λ(b)((λ(c)((λ(d)((
    λ(e)((λ(f)((λ(g)((a g) b)) (λ(g)(λ(h)((λ(i)((λ(j)((λ(k)(e ((((c h) i) j) k))) (λ
    (k)(λ(l)l)))) ((g g) (e ((f h) (λ(j)(λ(k(j (j (j k)))))))))) ((g g) (d h)))))))
    (λ(f)(λ(g)(λ(h)(f (g h))))))) (λ(e)(λ(f)(λ(g)(f ((e f) g))))))) (λ(d)(λ(e)(λ(f)(
    (λ(g)((λ(h)(((d g) h) (λ(i)((i (λ(j)j)) )))) (λ(h)f))) (λ(g)(λ(h)(h (λ(i)(λ(j)(
    i (g (λ(k)((k j) i))))))))))))))) (λ(c)((λ(d)((λ(e)(((c d) e) (λ(f)(λ(g)(λ(h)(λ(
    i)i)))))) (λ(e)((((e (λ(f)(λ(g)(λ(h)f))) (λ(f)(λ(g)(λ(h)g)))) (λ(f)(λ(g)(λ(h)h)
    ))) (λ(f)(λ(g)(λ(h)h))))))) (λ(d)(λ(e)(d((((e (λ(f)(λ(g)(λ(h)(λ(i)g))))) (λ(f)(λ
    (g)(λ(h)(λ(i)f))))) (λ(f)(λ(g)(λ(h)(λ(i)f))))) (λ(f)(λ(g)(λ(h)(λ(i)h))))))))))))))

Its original, human-readable implementation, in [Caramel](http://github.com/maiavictor/caramel), is [on this repository](https://github.com/MaiaVictor/unknown_halting_status/blob/master/unknown.mel). A brief:

```haskell
-- Receives fix and a natural, returns the number of
-- recursive calls until the collatz function halts.
collatz fix n = (fix go n)

    -- The recursive search
    go go n = (succ (even_odd_or_leq_one n even odd leq1))
        even = (go go (half n))
        odd  = (go go (succ (mul n 3)))
        leq1 = 0

    -- Tests if number is even, odd, or <= 1
    even_odd_or_leq_one n = (n succ zero (a b c d -> d))
        succ pred eoz = (pred (eoz (a b c d -> b) (a b c d -> a) (a b c d -> a) (a b c d -> c)))
        zero eoz = (eoz (a b c -> a) (a b c -> b) (a b c -> c) (a b c -> c))

    -- Half of a natural number
    half n f x = (n succ zero (t -> (t (x -> x) f)))
        succ pred fns = (fns (a b -> (a (pred (t -> (t b a))))))
        zero fns = x

    -- Successor of a natural number
    succ nat succ zero = (succ (nat succ zero))

    -- Multiplication of two natural numbers
    mul a b succ = (a (b succ))
```

I find the λ-calculus convenient for this because conventional languages have too many built ins. For example, we can write a relatively short (~162 bytes gzipped) JS program that does something similar:

```javascript
function collatz(n){
    return n <= 1 ? 0 : n%2 === 0 ? 1+collatz(Math.floor(n/2)) : 1+collatz(3*n+1);
};
for (var n=0; n<Math.pow(2,256); ++n)
    console.log(collatz(n));
```

But there, a relatively complex modulus function takes one 1 byte (`%`) while a simple function definition takes a lot. This schews the complexity of programs in favor of numbers and mathematical operators. The λ-calculus has no built-ins and is, thus, more neutral in that sense; the size of program is more concise with respect to its inherent complexity.

While this program is quite short, it is still too complex. It involkes all sorts of mathematical functions: addition, multiplication, division, as well as list functions. As such, it is not easy to pinpoint the particular trait of this program that makes it so hard to understand. There are certainly much shorter programs with the same property. Something related to busy beavers come to mind, but I don't know enough about them to craft such a term. So, that opens the question: **what are the shortest λ-terms with unknown terminability?**

---

You can take a look at the original λ-calculus function that generated this program [here](https://github.com/maiavictor/unknown_terminability). You can also test it by installing [Caramel](http://github.com/maiavictor/caramel) and typing `mel test` on the terminal.
