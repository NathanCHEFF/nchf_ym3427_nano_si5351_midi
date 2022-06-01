;var YM3427 = ( function(){
  function YM3427(){
    if (YM3427.instance_) return YM3427.instance_; // sngltn

    YM3427.prototype.channels = [ 1, 2, 3, 4, 5, 6 ]; // numb of chanel(voices)
    YM3427.prototype.busy     = [ 0, 0, 0, 0, 0, 0 ]; // ident of busy

    YM3427.prototype.regs = [8,  // instrunent
                            16, // low frequency oscilator
                            24, // ADSR Envelope https://ru.wikipedia.org/wiki/ADSR-%D0%BE%D0%B3%D0%B8%D0%B1%D0%B0%D1%8E%D1%89%D0%B0%D1%8F
                            32  // Volume / PWM
                          ];

    YM3427.prototype.reg_inst = 8;
    YM3427.prototype.reg_lfo = 16;
    YM3427.prototype.reg_inst = 24;
    YM3427.prototype.reg_inst = 32;

    YM3427.prototype.countchn = this.channels.length;

    YM3427.prototype.registers = [this.countchn-1];

    for( let i = 0; i<this.countchn; i++){
      this.registers[i] = [
        [1] = 0,
        (this.regs[1]+i) = 0,
        (this.regs[2]+i) = 0,
        (this.regs[3]+i) = 0
      ];
          console.log((this.regs[3]+i))
    }



    YM3427.prototype.port = null;
  }
  /* connect to chip */
  YM3427.prototype.connect = async function(){
    this.port = await navigator.serial.requestPort();
    await this.port.open({ baudRate :115200 });
    //console.log(this.port.getInfo())
    let textEncoder = new TextEncoderStream();
    let writableStreamClosed = textEncoder.readable.pipeTo(this.port.writable);
    this.writer = textEncoder.writable.getWriter();

    return YM3427.port;
  }

  /* send to chip */
  YM3427.prototype.send = async function(data){
    await this.writer.write(data);
  }

  YM3427.prototype.note_on = function( note, chan ){

  }

  YM3427.prototype.note_off = function( chan ){

  }

  YM3427.prototype.setChannel = function( chn, ins, lfo, env, pwm ){

  }

  YM3427.prototype.setRegister = function( chn, reg, val ){

  }

  return YM3427;
})();
