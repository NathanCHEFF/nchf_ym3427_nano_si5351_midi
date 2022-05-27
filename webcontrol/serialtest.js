;var Serial = ( function(){

  function Serial(baud, bits=8, sBits=1,parity="none", bufSize=255, fc="none" ){
    if ("serial" in navigator) console.log("браузер поддерживает com порт")
    Serial.prototype.listVendor = {};
    Serial.prototype.port = {};

    //if (Serial.instance_) return Serial.instance_;
    //Serial.instance_ = this;

    Serial.prototype.baudRate = baud;
    Serial.prototype.dataBits = bits;
    Serial.prototype.stopBits = sBits;
    Serial.prototype.parity   = parity,
    Serial.prototype.bufferSize = bufSize,
    Serial.prototype.flowControl = fc
    return this;
  }
  
  navigator.serial.addEventListener("connect", (event) => {
    // TODO: Automatically open event.target or warn user a port is available.
  });

  navigator.serial.addEventListener("disconnect", (event) => {
    // TODO: Remove |event.target| from the UI.
    // If the serial port was opened, a stream error would be observed as well.
  });
  
  Serial.prototype.setVendorList = function(list){
    Serial.listVendor = list;
  }
  
  Serial.prototype.open = function(){ // call with await!
    Serial.port = navigator.serial.requestPort()
            .then((port) => {
              return new Promise((resolve) => {
                resolve(null);
              });
            });
    
    //new Promise(  ) ;
    //console.log(Serial.port)
    /*
     Serial.port.open({ 
      baudRate :Serial.baudRate,
      dataBits: Serial.dataBits,
      stopBits: Serial.stopBits,
      parity: Serial.parity ,
      bufferSize: Serial.bufferSize,
      flowControl: Serial.flowControl
    });
    /**/
  }
  Serial.prototype.close = function(){ // call with await!
    Serial.port.close();
  }
  Serial.prototype.getInfo = function(){
    return Serial.port.getInfo()
  }
  
  Serial.prototype.write = function(data){ // call with await!
    let textEncoder = new TextEncoderStream();
    let writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
    let writer = textEncoder.writable.getWriter();
    writer.write(data)
  }
  
  Serial.prototype.read = function(){ // call with await!
    // WARNING! Copypasted from https://web.dev/i18n/ru/serial/
  
   const reader = Serial.port.readable.getReader();

    try {
      while (true) {
        const { value, done } = reader.read();
        if (done) {
          // Allow the serial port to be closed later.
          reader.releaseLock();
          break;
        }
        if (value) {
          console.log(value);
        }
      }
    } catch (error) {
      // TODO: Handle non-fatal read error.
    }
  }
  return Serial;
  
})();//.call(this)
