class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;
  constructor(carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo(){
    let trunkString;

    this.isTrunkOpen
    ? trunkString = 'Trunk is opened'
    : trunkString = 'Trunk is closed';

    console.log(`${this.#brand} ${this.#model},
      Speed: ${this.speed} km/hr
      ${trunkString}`);
  }
  go(){
    this.isTrunkOpen
    ? ''
    : this.speed += 5;
  }
  brake(){
    this.speed -= 5;
  }
  openTrunk(){
    this.speed === 0
    ? this.isTrunkOpen = true
    : '';
  }
  closeTrunk(){
    this.isTrunkOpen = false;
  }
}

class Racecar extends Car {
  #brand;
  #model;
  accelaration;
  topSpeed;
  constructor(carDetails){
    super(carDetails);
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.accelaration = carDetails.accelaration;
    this.topSpeed = carDetails.topSpeed;
  }
  displayInfo(){
    console.log(`${this.#brand} ${this.#model}
      top speed: ${this.topSpeed} km/hr
      ${this.speed} km/hr`);
  }
  openTrunk(){
    '';
  }
  closeTrunk(){
    '';
  }
  go(){
    this.speed + this.accelaration < 300
    ? this.speed += this.accelaration
    : this.speed = this.topSpeed;
  }
}

const Car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
})

const Car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
})

console.log(Car1);
console.log(Car2);

Car1.openTrunk();
Car1.go();
Car1.displayInfo();
Car1.closeTrunk();
Car1.go();
Car1.displayInfo();
Car1.openTrunk();
Car1.displayInfo();

const racecar1 = new Racecar({
  brand: 'McLaren',
  model: 'F1',
  accelaration: 20,
  topSpeed: 300
})

racecar1.displayInfo();
racecar1.openTrunk();
racecar1.displayInfo();
racecar1.go();
racecar1.openTrunk();
racecar1.go();
racecar1.displayInfo();
racecar1.brake();
racecar1.displayInfo();
racecar1.go();

racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.displayInfo();

racecar1.go();

racecar1.displayInfo();

Car1.brand = 'Honda';
Car1.displayInfo();