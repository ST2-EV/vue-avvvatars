// Mersenne Twister from https://gist.github.com/banksean/300494
/*
A C-program for MT19937, with initialization improved 2002/1/26.
Coded by Takuji Nishimura and Makoto Matsumoto.

Before using, initialize the state by using init_genrand(seed)
or init_by_array(init_key, key_length).

Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

1. Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.

3. The names of its contributors may not be used to endorse or promote
products derived from this software without specific prior written
permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


Any feedback is very welcome.
http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/
const MersenneTwister = function (self, seed) {
  if (seed === undefined) {
    // kept random number same size as time used previously to ensure no unexpected results downstream
    seed = Math.floor(Math.random() * Math.pow(10, 13));
  }
  /* Period parameters */
  self.N = 624;
  self.M = 397;
  self.MATRIX_A = 0x9908b0df;   /* constant vector a */
  self.UPPER_MASK = 0x80000000; /* most significant w-r bits */
  self.LOWER_MASK = 0x7fffffff; /* least significant r bits */
  self.mt = new Array(self.N); /* the array for the state vector */
  self.mti = self.N + 1; /* mti==N + 1 means mt[N] is not initialized */
  self.init_genrand(seed);
}

/* initializes mt[N] with a seed */
MersenneTwister.prototype.init_genrand = function (s) {
  self.mt[0] = s >>> 0;
  for (self.mti = 1; self.mti < self.N; self.mti++) {
    s = self.mt[self.mti - 1] ^ (self.mt[self.mti - 1] >>> 30);
    self.mt[self.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) + self.mti;
    /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
    /* In the previous versions, MSBs of the seed affect   */
    /* only MSBs of the array mt[].                        */
    /* 2002/01/09 modified by Makoto Matsumoto             */
    self.mt[self.mti] >>>= 0;
    /* for >32 bit machines */
  }
};

/* initialize by an array with array-length */
/* init_key is the array for initializing keys */
/* key_length is its length */
/* slight change for C++, 2004/2/26 */
MersenneTwister.prototype.init_by_array = function (init_key, key_length) {
  var i = 1, j = 0, k, s;
  self.init_genrand(19650218);
  k = (self.N > key_length ? self.N : key_length);
  for (; k; k--) {
    s = self.mt[i - 1] ^ (self.mt[i - 1] >>> 30);
    self.mt[i] = (self.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525))) + init_key[j] + j; /* non linear */
    self.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
    i++;
    j++;
    if (i >= self.N) { self.mt[0] = self.mt[self.N - 1]; i = 1; }
    if (j >= key_length) { j = 0; }
  }
  for (k = self.N - 1; k; k--) {
    s = self.mt[i - 1] ^ (self.mt[i - 1] >>> 30);
    self.mt[i] = (self.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941)) - i; /* non linear */
    self.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
    i++;
    if (i >= self.N) { self.mt[0] = self.mt[self.N - 1]; i = 1; }
  }

  self.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
};

/* generates a random number on [0,0xffffffff]-interval */
MersenneTwister.prototype.genrand_int32 = function () {
  var y;
  var mag01 = new Array(0x0, self.MATRIX_A);
  /* mag01[x] = x * MATRIX_A  for x=0,1 */

  if (self.mti >= self.N) { /* generate N words at one time */
    var kk;

    if (self.mti === self.N + 1) {   /* if init_genrand() has not been called, */
      self.init_genrand(5489); /* a default initial seed is used */
    }
    for (kk = 0; kk < self.N - self.M; kk++) {
      y = (self.mt[kk] & self.UPPER_MASK) | (self.mt[kk + 1] & self.LOWER_MASK);
      self.mt[kk] = self.mt[kk + self.M] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    for (; kk < self.N - 1; kk++) {
      y = (self.mt[kk] & self.UPPER_MASK) | (self.mt[kk + 1] & self.LOWER_MASK);
      self.mt[kk] = self.mt[kk + (self.M - self.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    y = (self.mt[self.N - 1] & self.UPPER_MASK) | (self.mt[0] & self.LOWER_MASK);
    self.mt[self.N - 1] = self.mt[self.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

    self.mti = 0;
  }

  y = self.mt[self.mti++];

  /* Tempering */
  y ^= (y >>> 11);
  y ^= (y << 7) & 0x9d2c5680;
  y ^= (y << 15) & 0xefc60000;
  y ^= (y >>> 18);
  return y >>> 0;
};

/* generates a random number on [0,0x7fffffff]-interval */
MersenneTwister.prototype.genrand_int31 = function () {
  return (self.genrand_int32() >>> 1);
};

/* generates a random number on [0,1]-real-interval */
MersenneTwister.prototype.genrand_real1 = function () {
  return self.genrand_int32() * (1.0 / 4294967295.0);
  /* divided by 2^32-1 */
};

/* generates a random number on [0,1)-real-interval */
MersenneTwister.prototype.random = function () {
  return self.genrand_int32() * (1.0 / 4294967296.0);
  /* divided by 2^32 */
};

/* generates a random number on (0,1)-real-interval */
MersenneTwister.prototype.genrand_real3 = function () {
  return (self.genrand_int32() + 0.5) * (1.0 / 4294967296.0);
  /* divided by 2^32 */
};

/* generates a random number on [0,1) with 53-bit resolution*/
MersenneTwister.prototype.genrand_res53 = function () {
  var a = self.genrand_int32() >>> 5, b = self.genrand_int32() >>> 6;
  return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
};

export default MersenneTwister