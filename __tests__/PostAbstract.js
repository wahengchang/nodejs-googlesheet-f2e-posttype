const pa = require('../dataObject/ControlerPostObjectAbstract');

test("Abstract classes can't be instantiated.", () => {
  try {
    new pa(123)
  }
  catch(e){
    expect(e.message).toBe("Abstract classes can't be instantiated.")
  }
});


class Temp extends pa {
  constructor(id) {
    super(id)
  }
}

test("Abstract classes, function should be implement", () => {
  try {
    const t = new Temp(123)
    expect().toBe('should not go here')
  }
  catch(e) {
    expect(e.message).toBe('function should be implement')
  }
});


test("Abstract classes, require id", () => {
  try {
    const t = new Temp()
    expect().toBe('should not go here')
  }
  catch(e) {
    expect(e.message).toBe('id is required, but NULL')
  }
});