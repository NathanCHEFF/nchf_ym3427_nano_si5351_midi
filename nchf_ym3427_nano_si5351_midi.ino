/*
si5351_example.ino - Simple example of using Si5351Arduino library
Copyright (C) 2015 - 2016 Jason Milldrum <milldrum@gmail.com>

*/

#include "si5351.h"
#include "Wire.h"

Si5351 si5351;

//YM3427
int offset[] = {0,0,0,0,0,0,0};
byte inst = 155; //0b10011000 152
byte env = 128;
byte fx = 128;
byte pwm = 176; //max volume 128, 138 lower
int voices = 1; //number of voices per key

//interface variables
byte osc = 0;
byte param = 0;

//midi notes
byte last_com = 0x90; //last midi command
const int ch_ct = 6; //number of chan/voices
byte chan[] = {
  0xff,0xff,0xff,0xff,0xff,0xff}; //fe=disabled, ff=free
byte order[] = {
  0xff,0xff,0xff,0xff,0xff,0xff,0xff}; //extra -1 to shift in
int re_order[] = {
  0,1,2,3,4,5,5}; //release order, left to right:oldest to newest

byte test = 0x80;

void setup(){
  bool i2c_found;

  //Serial.begin(31250); //MIDI baud
  Serial.begin(115200); // baud
  // Start serial and initialize the Si5351
  i2c_found = si5351.init(SI5351_CRYSTAL_LOAD_8PF, 0, 0);
  if(!i2c_found)
  {
    Serial.println("Device not found on I2C bus!");
  }

  // Set CLK0 to output 1.4 MHz
  //si5351.set_freq(140000000ULL, SI5351_CLK0);
  si5351.set_freq(140000000ULL, SI5351_CLK0);
  pinMode(11, OUTPUT);
  digitalWrite(11,1);

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
  
  if(Serial.available() > 1) {
    int loop_temp = serial_wait();
    if(loop_temp & 0x80){ //command
      last_com = loop_temp;
      handle_com(serial_wait());
    }else{ //multi-note message
      handle_com(loop_temp);
    }
  }
}
