/**
 * Created by Matthew on 3/5/2016.
 */


/**
 * Item is a constructor for an Item object.  It's the basic organizational element.
 * Item(...) returns an item that does great awesome fun stuff.
 * @param name
 * @param description
 * @param tags
 * @param startTime
 * @param endTime
 * @constructor
 */
function Item(name, description, tags, startTime, endTime) {
    var that = this;
    that.name = name;
    that.description = description;
    that.tags = tags.split(" ");
    that.startTime = startTime;
    that.endTime = endTime;

    //methods

    return that;
}