class UserDto {
    constructor(user) {
      this.id = user._id;
      this.email = user.email;
      this.name = user.name;
      this.age = user.age;
      this.city = user.city;
      this.zipCode = user.zipCode;
    }
  }
  
  module.exports = UserDto;
  