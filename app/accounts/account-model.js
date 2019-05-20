function Account(options) {
  const model = {
      id: options.id,
      accountname: options.accountname,
      accountcompany: options.accountcompany,
      _geoloc: options._geoloc,
      imageUrl: encodeURI(options.imageUrl)
  };

  return model;
}

module.exports = Account;
