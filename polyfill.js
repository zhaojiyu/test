(function() {
    if (!Array.prototype.at) {
        Array.prototype.at = function (index) {
            if (index >= 0)
                return this[index];
            else return this[this.length + index];
        }
    };
    if (!performance.mark || typeof performance.mark('test') === 'undefined') {
        var marks = {};
        var measures = [];
    
        performance.mark = function(markName) {
            var mark = {
                name: markName,
                entryType: 'mark',
                startTime: performance.now(),
                duration: 0
            };
            marks[markName] = mark;
            return mark; 
        };
    
        performance.measure = function(measureName, startMark, endMark) {
            var startTime = marks[startMark] ? marks[startMark].startTime : 0;
            var endTime = marks[endMark] ? marks[endMark].startTime : performance.now();
            var measure = {
                name: measureName,
                entryType: 'measure',
                startTime: startTime,
                duration: endTime - startTime
            };
            measures.push(measure);
            return measure; 
        };
    
        performance.getEntriesByName = function(name, type) {
            if (type === 'mark') {
                return marks[name] ? [marks[name]] : [];
            } else if (type === 'measure') {
                return measures.filter(function(measure) {
                    return measure.name === name;
                });
            } else {
                var entries = [];
                if (marks[name]) entries.push(marks[name]);
                entries = entries.concat(measures.filter(function(measure) {
                    return measure.name === name;
                }));
                return entries;
            }
        };
    
        performance.clearMarks = function(name) {
            if (name) {
                delete marks[name];
            } else {
                marks = {};
            }
        };
    
        performance.clearMeasures = function(name) {
            if (name) {
                measures = measures.filter(function(measure) {
                    return measure.name !== name;
                });
            } else {
                measures = [];
            }
        };
    }
})();
