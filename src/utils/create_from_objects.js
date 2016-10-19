var createFromObjects = function (name, gid, key, frame, exists, autoCull, group, CustomClass, adjustY, area) {

    if (exists === undefined) { exists = true; }
    if (autoCull === undefined) { autoCull = false; }
    if (group === undefined) { group = this.game.world; }
    if (CustomClass === undefined) { CustomClass = Phaser.Sprite; }
    if (adjustY === undefined) { adjustY = true; }


    if (!this.objects[name])
    {
        console.warn('Tilemap.createFromObjects: Invalid objectgroup name given: ' + name);
        return;
    }

    for (var i = 0; i < this.objects[name].length; i++)
    {
        var found = false;
        var obj = this.objects[name][i];

        if (obj.gid !== undefined && typeof gid === 'number' && obj.gid === gid)
        {
            found = true;
        }
        else if (obj.id !== undefined && typeof gid === 'number' && obj.id === gid)
        {
            found = true;
        }
        else if (obj.name !== undefined && typeof gid === 'string' && obj.name === gid)
        {
            found = true;
        }
        if (area !== undefined && found) {
            var x = obj.x/32;
            var y = obj.y/32;
            found = false;
            if (area.in_area(x, y)){
                if (area.previous_area === undefined ){
                    found = true;
                } else{
                    found = !area.previous_area.in_area(x, y);
                }

            }
        }
        if (found)
        {
            var sprite = new CustomClass(this.game, parseFloat(obj.x, 10), parseFloat(obj.y, 10), key, frame);

            sprite.name = obj.name;
            sprite.visible = obj.visible;
            sprite.autoCull = autoCull;
            sprite.exists = exists;

            if (obj.width)
            {
                sprite.width = obj.width;
            }

            if (obj.height)
            {
                sprite.height = obj.height;
            }

            if (obj.rotation)
            {
                sprite.angle = obj.rotation;
            }

            if (adjustY)
            {
                sprite.y -= sprite.height;
            }

            group.add(sprite);

            for (var property in obj.properties)
            {
                group.set(sprite, property, obj.properties[property], false, false, 0, true);
            }
        }
    }
};


export default createFromObjects;
