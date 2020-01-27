module.exports = {
  extends: [
    'mouse'
    <%_ if (prettier) { _%>
    'mouse/prettier'
    <%_ } _%>
  ],
};
