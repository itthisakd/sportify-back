"use strict";
const { Account } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const female = [
      "https://images.unsplash.com/photo-1617209399013-f2b9354b961f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1517438984742-1262db08379e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGV4ZXJjaXNpbmd8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1578882113036-761708189373?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGV4ZXJjaXNpbmd8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1540580015362-b650926ff6d7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGV4ZXJjaXNpbmd8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1578882113036-761708189373?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGV4ZXJjaXNpbmd8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1582752452509-1f278716bace?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTd8fHNwb3J0c3xlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1586439496903-c96e9f18f212?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=862&q=80",
      "https://images.unsplash.com/photo-1614887339021-4cb44276e170?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHNwb3J0c3xlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1583198331847-19936ee3a751?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHNwb3J0c3xlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1551632494-bba43419b32b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHNwb3J0c3xlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHNwb3J0c3xlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3BvcnRzfGVufDB8MXwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1581122584612-713f89daa8eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGV4ZXJjaXNpbmd8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1579704650564-77f58515575b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTR8fHNwb3J0c3xlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1596247865408-cb5107b24afc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAwfHxzcG9ydHN8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1560362614-89027598847b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTkxfHxzcG9ydHN8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1563620915-8478239e9aab?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA1fHxzcG9ydHN8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1595702419650-865a696a443e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTkzfHxzcG9ydHN8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1613686984084-9f435566e105?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjQ3fHxzcG9ydHN8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1614365766650-c7e3575af33b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjUyfHxzcG9ydHN8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1613686933606-7f86f06d0d78?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjU2fHxzcG9ydHN8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1619915003354-4a6a5fc5459f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjcwfHxzcG9ydHN8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1576921874520-1c3fa53f2674?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjczfHxzcG9ydHN8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1569597795164-572e58711351?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjc0fHxzcG9ydHN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1610768764270-790fbec18178?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjc4fHxzcG9ydHN8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1576226565048-f377166d7e7f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjg1fHxzcG9ydHN8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1610902774158-d7d2f446df70?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzQ0fHxzcG9ydHN8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1617085606193-6b17105cff2a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzU1fHxzcG9ydHN8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1617085606193-6b17105cff2a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzU1fHxzcG9ydHN8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1593164842249-d74fc06dae05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzc2fHxzcG9ydHN8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1584797079913-f5408e4a5fcf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzc0fHxzcG9ydHN8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1590556409324-aa1d726e5c3c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZpdG5lc3N8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1547852356-b20668106c51?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGZpdG5lc3N8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1601568870191-8c417f7e0077?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGZpdG5lc3N8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1520334435999-d992362bb3ad?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGZpdG5lc3N8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1548690312-e3b507d8c110?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGZpdG5lc3N8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1597216174311-cb8bf6e6ef9b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZpdG5lc3N8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1584863495140-a320b13a11a8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fGZpdG5lc3N8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDN8fGZpdG5lc3N8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1599552683573-9dc48255fe85?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fGZpdG5lc3N8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1586790167861-6e87cdff91b9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fGZpdG5lc3N8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1480179087180-d9f0ec044897?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTN8fGZpdG5lc3N8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1571504576237-3c214a43f441?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njd8fGZpdG5lc3N8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1606663368493-131f4f97c095?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fGZpdG5lc3N8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1597586309204-ab40c927296d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzh8fGZpdG5lc3N8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1586323289103-e309634e2a1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODZ8fGZpdG5lc3N8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    ];
    const male = [
      "https://images.unsplash.com/photo-1579758682665-53a1a614eea6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1602520628350-fbf9db1f02ae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1549476464-37392f717541?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1597452485683-0e0bde820f87?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=804&q=80",
      "https://images.unsplash.com/flagged/photo-1597786772028-7859f6dcb903?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=670&q=80",
      "https://images.unsplash.com/photo-1527702661892-27f4752848c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1552573102-2b44b44d85b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1602339786708-26ad0b0aeedb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1598971862093-42c04c83871a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80",
      "https://images.unsplash.com/photo-1527588574470-7152d7c3c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502765782516-722af1ae6086?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1619289398153-72635686c702?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=802&q=80",
      "https://images.unsplash.com/flagged/photo-1558759103-88e62f9438f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1610768764104-ad1bd4763668?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1619678309629-23bb8fa744cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=664&q=80",
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1554139844-af2fc8ad3a3a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1528151358198-569380ceb640?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1615227571075-7d3ed6f55d67?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1516386564067-f06afb572168?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1563765538654-41d961f7db1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1612957753858-3ed536c929d1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=628&q=80",
      "https://images.unsplash.com/photo-1589204094620-277f790a960b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
      "https://images.unsplash.com/photo-1575419001506-ca514725329c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1577633603610-ce31392c8aa9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1575437119316-9d1a1da69df0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1605640107219-93fdd6e33e5d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1581093686959-108b3114cc49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1592632789004-57d4354f2499?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80",
    ];

    const accounts = await Account.findAll({ attributes: ["id", "gender"] });
    //[{id: 1, gender:"m"}, {id: 1, gender:"m"}, {id: 1, gender:"m"}, {id: 1, gender:"m"}]

    let Fcounter = -1 % female.length;
    let Mcounter = -1 % male.length;

    const data = accounts.map((acc) => {
      if (acc.gender === "m") {
        Mcounter++;
        return {
          account_id: acc.id,
          media: male[Mcounter],
          created_at: new Date(),
          updated_at: new Date(),
        };
      } else {
        Fcounter++;
        return {
          account_id: acc.id,
          media: female[Fcounter],
          created_at: new Date(),
          updated_at: new Date(),
        };
      }
    });

    console.log("data", data);
    return queryInterface.bulkInsert("media", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    const toDelete = await Media.findAll();
    await queryInterface.bulkDelete("media", toDelete, {});
  },
};
