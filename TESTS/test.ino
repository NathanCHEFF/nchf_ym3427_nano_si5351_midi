/*
sorces from

  https://github.com/Skidlz/YM3427 [ Special thanks zacknelson1@gmail.com ! ]
  si5351_example.ino - Simple example of using Si5351Arduino library
  Copyright (C) 2015 - 2016 Jason Milldrum <milldrum@gmail.com>
*/

#include "si5351.h"
#include "Wire.h"

Si5351 si5351;

void setup(){
  reset_chip();
  //Serial.begin(31250); //MIDI baud
  Serial.begin(115200); // baud
  // Start serial and initialize the Si5351
  si5351.init(SI5351_CRYSTAL_LOAD_8PF, 0, 0);
  // Set CLK0 to output 1.4 MHz
  si5351.set_freq(140000000ULL, SI5351_CLK0);
  si5351.update_status();
  
  // Setup IO Pins
  // PORTB pin1 = reset
  // PORTB pin0 = serial clock 
  // PORTD pin7 = serial data
  DDRB = 0xff;
  DDRD = 0b11111110; //0=input
  global_pwm_set(129);
  global_env_set(163);
  reset_chip();
  delay(3);
}

void loop(){
  
  byte inst = 152;
  byte chan = 1;
  byte note = 63; 
  int delays = 300;

  send_packet(chan + 8,  inst); //set inst
  send_packet(chan + 16, 134);  //LFO
  send_packet(chan + 24, 156);  //ENV
  send_packet(chan + 32, 180);  //VOL 0b10110100
   
  // PLAY NOTE
  // code from you ym_function.c. 
  note--; //chip is one semitone flat vs MIDI
  byte oct = (note / 12) << 4;
  note %= 12;
  note += (1 + (note / 3)) | oct;
  Serial.print("note is");
  Serial.println(note);
  
  send_packet(chan + 8, inst); //instrument
  _delay_ms(3);
  send_packet(chan, note | 0x80); //octave+note
   _delay_ms(300);
  send_packet(chan + 8, inst + 48); //instrument
  
  delay(delays);
  //voice off
  send_packet(chan + 8, inst & 0b11001111); 
  /**/
  delay(delays);
}
