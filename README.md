# nchf_ym3427_nano_si5351_midi
Info/Code for Yamaha's YM3427 IC
based on 
  https://github.com/Skidlz/YM3427
  https://github.com/etherkit/Si5351Arduino
  Copyright (C) 2015 - 2016 Jason Milldrum <milldrum@gmail.com>
  
i could not find any quartz on 1.4mHz, so i used si5351 as reference frequency generator.

USES:
 - arduino (i use the nano168)
 - Si5351 
 - ym3427
 
CONNECTING:
  - Si5351 to arduino on pins A4 & A5 (sda, scl)
  - Si5351 to ym3427 from CLK0 to 1st pin of ym3427 through resistor 1 kOmh*
  - arduino to ym3427 from
      // PORTB pin1 = reset
      // PORTB pin0 = serial clock 
      // PORTD pin7 = serial data
      
AFTER CONNECTINGS:
  check Si5351 output signal** 
  try send any symbol on monitor ports and get the sound on analog output on ym3427
 
* 
in this point my formwave of signal changed beetwen resistor from meander to saw.but it stil work  

**
if youre osciloscope dont read such frequency jus try delete few symbols 0 in the main code of arduino
on  line  @si5351.set_freq(140000000ULL, SI5351_CLK0);@
140000000ULL - is setting freq
but if you dont have osciloscope - try set this frequency on 440 Hz and and compare it like sound of note A 1 octave)

or just compile and use it)!

YM3427 pinout:
5-6v  audio    ?5v sr_clock nc nc reset sr_clock
16    15       14  13       12 11 10    9
-------------------------------------------
|                                         |
|                  YM3427                 |
|*                                        |
-------------------------------------------
1     2        3   4        5  6  7     8
clock sr_data  ?5v gnd      nc nc ?5v   gnd
