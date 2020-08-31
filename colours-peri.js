var codeblocks = document.getElementsByClassName('peridot');

function advance(script, index) { // String, Integer
    index += 1;
    return([
        script[index],
        index
    ]); // String, Integer
}

var DIGITS = '0123456789';
var ASCII  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_';
var ASCIIDIGITS = DIGITS + ASCII;

var ESCAPECHARS = {
    '\\': '\\',
    'n' : '\n',
    '\n': '\n',
    't' : '\t',
    '\'': '\'',
    '\"': '\"'
}

var KEYWORDS = {
    'var'     : ['Initializes a variable.',
                '<span class=\'lang-kwd\'>var</span> x'],
    'func'    : ['Returns a <span class=\'lang-typ\'>function</span>.',
                '<span class=\'lang-kwd\'>func</span>() -> Null {}'],
    'lambda'  : ['Returns a <span class=\'lang-typ\'>function</span>. Lambdas are single line functions that do not require you to use return.',
                '<span class=\'lang-kwd\'>func</span>() -> Null {}'],
    'and'     : ['Combines two <span class=\'lang-typ\'>bool</span>s with the <span class=\'lang-kwd\'>and</span> logical operator.',
                '<span class=\'lang-bto\'>True</span> <span class=\'lang-kwd\'>and</span> <span class=\'lang-bto\'>True</span>'],
    'or'      : ['Combines two <span class=\'lang-typ\'>bool</span>s with the <span class=\'lang-kwd\'>or</span> logical operator.',
                '<span class=\'lang-bto\'>True</span> <span class=\'lang-kwd\'>or</span> <span class=\'lang-bto\'>False</span>'],
    'not'     : ['Inverts a <span class=\'lang-typ\'>bool</span>.',
                '<span class=\'lang-kwd\'>not</span> <span class=\'lang-bto\'>False</span>'],
    'return'  : ['Returns a value from a <span class=\'lang-typ\'>function</span>.',
                '<span class=\'lang-kwd\'>return</span>(<span class=\'lang-bto\'>Null</span>)'],
    'if'      : ['Open an if statement.',
                '<span class=\'lang-kwd\'>if</span> (<span class=\'lang-bto\'>True</span>) {}'],
    'elif'    : ['Open an elif segment of an if statement.',
                '<span class=\'lang-kwd\'>if</span> (<span class=\'lang-bto\'>True</span>) {\n} <span class=\'lang-kwd\'>elif</span> (<span class=\'lang-bto\'>True</span>) {}'],
    'else'    : ['Open an else segment of an if statement.',
                '<span class=\'lang-kwd\'>if</span> (<span class=\'lang-bto\'>True</span>) {\n} <span class=\'lang-kwd\'>else</span> {}'],
    'switch'  : ['Open a switch statement.',
                '<span class=\'lang-kwd\'>switch</span> (<span class=\'lang-kwd\'>var</span> x <span class=\'lang-kwd\'>as</span> 10) {\n    <span class=\'lang-kwd\'>when</span> (x == 1) {}\n}'],
    'when'    : ['Open a when segment of a switch statement.',
                '<span class=\'lang-kwd\'>switch</span> (<span class=\'lang-kwd\'>var</span> x <span class=\'lang-kwd\'>as</span> 10) {\n    <span class=\'lang-kwd\'>when</span> (x == 1) {}\n}'],
    'as'      : ['Miscellanious keyword',
                '<span class=\'lang-kwd\'>switch</span> (<span class=\'lang-kwd\'>var</span> x <span class=\'lang-kwd\'>as</span> 10) {}'],
    'for'     : ['Open a for loop.',
                '<span class=\'lang-kwd\'>for</span> (<span class=\'lang-kwd\'>var</span> i <span class=\'lang-kwd\'>in</span> 10) {}'],
    'in'      : ['Miscellanious keyword',
                '<span class=\'lang-kwd\'>for</span> (i <span class=\'lang-kwd\'>in</span> range(10)) {}'],
    'while'   : ['Open a while loop.',
                '<span class=\'lang-kwd\'>while</span> (<span class=\'lang-bto\'>True</span>) {}'],
    'continue': ['Continues to the next iteration of the loop.',
                '<span class=\'lang-kwd\'>continue</span>()'],
    'break'   : ['Breaks out of the loop.',
                '<span class=\'lang-kwd\'>break</span>()']
}

var BUILTINFUNC = {
    'throw': [{'exception': 'exception'},
                'Throws the given <span class=\'lang-typ\'>exception</span>.'],
    'assert': [{'condition': 'bool', 'message=': '<span class=\'lang-str\'>\'\'</span>'},
                'Checks if the condition is <span class=\'lang-bto\'>True</span>. If it is not, throws an <span class=\'lang-typ\'>AssertionException</span>.'],
    'panic' : [{'message': 'str'},
                'Raises a <span class=\'lang-typ\'>PanicException</span>. PanicExceptions can not be handled by handlers.'],
    'print' : [{'message': 'str', 'prefix=': '<span class=\'lang-str\'>\'\'</span>', 'suffix=': '<span class=\'lang-str\'>\'\\n\'</span>'},
                'Prints the given message to the console.'],
    'range' : [{'stop': 'int', 'start=': '<span class=\'lang-lit\'>0</span>', 'step=': '<span class=\'lang-lit\'>1</span>'},
                'Returns an <span class=\'lang-typ\'>array</span> containing a range of integers.'],
}

var TYPES = {
    'type'  : [{'obj': 'any'},
                'Returns the corresponding <span class=\'lang-typ\'>Built-In Function</span> of the given object.'],
    'str'   : [{'obj': 'any'},
                'Returns the given object as a string.'],
    'int'   : [{'obj': 'any'},
                'Returns the given object as an integer.'],
    'float' : [{'obj': 'any'},
                'Returns the given object as a floating point number.'],
    'bool'  : [{'obj': 'any'},
                'Returns the given object as a boolean.'],
    'array' : [{'obj': 'any'},
                'Returns the given object as an array.'],
    'tuple' : [{'obj': 'any'},
                'Retuns the given object as a tuple.'],
    'id'    : [{'obj': 'any'},
                'Retuns an <span class=\'lang-typ\'>id</span> corresponding the given object.']
}

var BUILTINTYPEOBJ = {
    'True': 'Boolean',
    'False': 'Boolean',
    'Null': 'NullType',
    '__peridot__': 'Array'
}

var script; // String
var val; // Array
var index; // Integer
var char; // String
var num; // String
var dots; // Integer
var quotetype; // String
var string; // String
var escaped; // Boolean
var identifier; // String
var comment; // String
var result; // String
var args; // Array
var keys; // Array
var values; // Array

for (i=0;i< codeblocks.length ;i++) {
    codeblock = codeblocks[i]
    script = codeblocks[i].innerHTML;
    script = script.replace(/&lt;/, '<')
    script = script.replace(/&gt;/, '>')
    index = -1;
    char = undefined;
    tokens = [];

    val=advance(script,index);char=val[0];index=val[1];

    while (char != undefined) {

        if ('​'.includes(char)) {
            val=advance(script,index);char=val[0];index=val[1];
        }

        else if (' '.includes(char)) {
            tokens.push(['SPACE'])
            val=advance(script,index);char=val[0];index=val[1];
        }

        else if ('\t'.includes(char)) {
            tokens.push(['TAB'])
            val=advance(script,index);char=val[0];index=val[1];
        }

        else if ('\n'.includes(char)) {
            tokens.push(['EOL']);
            val=advance(script,index);char=val[0];index=val[1];
        }

        else if (DIGITS.includes(char)) {
            num = '';
            dots = 0;
            while (char != undefined && (DIGITS+'.').includes(char)) {
                if (char == '.') {
                    dots += 1;
                    num += '.'
                } else {
                    num += char
                }
                val=advance(script,index);char=val[0];index=val[1];
            }
            if (dots == 0) {
                tokens.push(['LITERAL', num])
            } else if (dots == 1) {
                tokens.push(['LITERAL', num])
            } else {
                tokens.push(['INVALID', num, '<strong class=\'lang-exc\'>SyntaxException</strong>: <span class=\'lang-typ\'>Float</span> may only contain one dot.'])
            }
        }

        else if ('"\''.includes(char)) {
            quotetype = char;
            string = quotetype;
            escaped = false;
            val=advance(script,index);char=val[0];index=val[1];
            while (char != undefined && (char != quotetype || escaped)) {
                if (escaped) {
                    escchar = ESCAPECHARS[char];
                    tokens.push(['STRING', string]);
                    string = '';
                    if (escchar == undefined) {
                        tokens.push(['INVALID', '\\' + char, '<strong class=\'lang-exc\'>EscapeException</strong>: <span class=\'lang-str\'>\'' + char + '\'</span> can not be escaped.']);
                    } else {
                        tokens.push(['ESCAPED', '\\' + char])
                    }
                    escaped = false;
                } else {
                    if (char == '\\') {
                        escaped = true;
                    } else if (char == '\n') {
                        tokens.push(['STRING', string]);
                        string = '';
                        tokens.push(['INVALID', '&nbsp;', '<strong class=\'lang-exc\'>SyntaxException</strong>: Invalid EOL'])
                        tokens.push(['EOL'])
                        break
                    } else {
                        string += char
                    }
                }
                val=advance(script,index);char=val[0];index=val[1];
            }
            if (char == undefined) {
                tokens.push(['INVALID', char, '<strong class=\'lang-exc\'>SyntaxException</strong>: Invalid EOF'])
            }
            tokens.push(['STRING', string + char])
            val=advance(script,index);char=val[0];index=val[1];
        }

        else if ('+-*/^=<>'.includes(char)) {
            tokens.push(['OPERATION', char]);
            val=advance(script,index);char=val[0];index=val[1];
        }

        else if (',(){}[]'.includes(char)) {
            tokens.push(['PUNCTUATION', char]);
            val=advance(script,index);char=val[0];index=val[1];
        }

        else if (ASCII.includes(char)) {
            identifier = '';
            while (char != undefined && ASCIIDIGITS.includes(char)) {
                identifier += char;
                val=advance(script,index);char=val[0];index=val[1];
            }
            if (Object.keys(KEYWORDS).indexOf(identifier) >= 0) {
                tokens.push(['KEYWORD', identifier, 'Keyword <span class=\'lang-kwd\'>' + identifier + '</span><br /><br />' + KEYWORDS[identifier][0] + '<br /><br />' + KEYWORDS[identifier][1]])
            } else if (Object.keys(BUILTINFUNC).indexOf(identifier) >= 0) {
                args = [];
                keys = Object.keys(BUILTINFUNC[identifier][0])
                values = Object.values(BUILTINFUNC[identifier][0])
                for (j=0;j< keys.length ;j++) {
                    if (keys[j].endsWith('=')) {
                        combiner = ' = ';
                        keys[j] = keys[j].slice(0, -1);
                        value = values[j]
                    } else {
                        combiner = ': ';
                        value = '<span class=\'lang-typ\'>' + values[j] + '</span>'
                    }
                    args.push('<strong>' + keys[j] + '</strong>' + combiner + value);
                }
                args = args.join(', ')
                tokens.push(['BUILTINFUNC', identifier, '<span class=\'lang-typ\'>Built-In Function</span> <strong class=\'lang-bif\'>' + identifier + '</strong>(<br />&nbsp;&nbsp;' + args + '<br />)<br /><br />' + BUILTINFUNC[identifier][1]])
            } else if (Object.keys(TYPES).indexOf(identifier) >= 0) {
                args = [];
                keys = Object.keys(TYPES[identifier][0])
                values = Object.values(TYPES[identifier][0])
                for (j=0;j< keys.length ;j++) {
                    if (keys[j].endsWith('=')) {
                        combiner = ' = ';
                        keys[j] = keys[j].slice(0, -1);
                        value = values[j]
                    } else {
                        combiner = ': ';
                        value = '<span class=\'lang-typ\'>' + values[j] + '</span>'
                    }
                    args.push('<strong>' + keys[j] + '</strong>' + combiner + value);
                }
                args = args.join(', ')
                tokens.push(['TYPE', identifier, '<span class=\'lang-typ\'>Type</span> <strong class=\'lang-typ\'>' + identifier + '</strong>(<br />&nbsp;&nbsp;' + args + '<br />)<br /><br />' + TYPES[identifier][1]])
            } else if (Object.keys(BUILTINTYPEOBJ).indexOf(identifier) >= 0) {
                tokens.push(['BUILTINTYPEOBJ', identifier, '<span class=\'lang-typ\'>' + BUILTINTYPEOBJ[identifier] + '</span> <strong class=\'lang-bto\'>' + identifier + '</strong>'])
            } else {
                tokens.push(['IDENTIFIER', identifier])
            }
        }

        else if ('#'.includes(char)) {
            comment = '#';
            val=advance(script,index);char=val[0];index=val[1];
            if (char == '=') {
                comment += '=';
                while (true) {
                    val=advance(script,index);char=val[0];index=val[1];
                    if (char == undefined) {
                        break
                    }
                    else if (char == '=') {
                        comment += char;
                        val=advance(script,index);char=val[0];index=val[1];
                        if (char == '#') {
                            break
                        }
                    }
                    else if (char == '\n') {
                        comment += '<br />';
                    }
                    else if (char == ' ') {
                        comment += '&nbsp;';
                    }
                    else  {
                        comment += char;
                    }
                }
                if (char == undefined) {
                    tokens.push(['COMMENT', comment])
                    tokens.push(['INVALID', ' ', '<strong class=\'lang-exc\'>SyntaxException</strong>: Invalid EOF']);
                } else {
                    comment += char;
                    val=advance(script,index);char=val[0];index=val[1];
                    tokens.push(['COMMENT', comment])
                }
            } else {
                while (['\n', undefined].indexOf(char) < 0) {
                    comment += char;
                    val=advance(script,index);char=val[0];index=val[1];
                }
                tokens.push(['COMMENT', comment]);
            }
        }

        else {
            tokens.push(['INVALID', char, '<strong class=\'lang-exc\'>SyntaxException</strong>: Illegal character <span class=\'lang-str\'>\'' + char + '\'</span>']);
            val=advance(script,index);char=val[0];index=val[1];
        }
    }

    result = '';
    for (j=0;j< tokens.length ;j++) {
        token = tokens[j];
        if (token[0] == 'SPACE') {
            result += ' ';
        } else if (token[0] == 'TAB') {
            result += '\t';
        } else if (token[0] == 'EOL') {
            result += '\n';
        } else if (token[0] == 'LITERAL') {
            result += '<div class=\'lang lang-lit\'>' + token[1] + '</div>';
        } else if (token[0] == 'INVALID') {
            result += '<div class=\'lang lang-inv\'>' + token[1] + '<span class=\'tooltip\'> ' + token[2] + '</span></div>';
        } else if (token[0] == 'ESCAPED') {
            result += '<div class=\'lang lang-esc\'>' + token[1] + '</div>';
        } else if (token[0] == 'STRING') {
            result += '<div class=\'lang lang-str\'>' + token[1] + '</div>';
        } else if (token[0] == 'OPERATION') {
            result += '<div class=\'lang lang-opr\'>' + token[1] + '</div>';
        } else if (token[0] == 'PUNCTUATION') {
            result += '<div class=\'lang lang-pun\'>' + token[1] + '</div>';
        } else if (token[0] == 'KEYWORD') {
            result += '<div class=\'lang lang-kwd\'>' + token[1] + '<span class=\'tooltip\'>' + token[2] +  '</span></div>';
        } else if (token[0] == 'BUILTINFUNC') {
            result += '<div class=\'lang lang-bif\'>' + token[1] + '<span class=\'tooltip\'>' + token[2] +  '</span></div>';
        } else if (token[0] == 'TYPE') {
            result += '<div class=\'lang lang-typ\'>' + token[1] + '<span class=\'tooltip\'>' + token[2] +  '</span></div>';
        } else if (token[0] == 'BUILTINTYPEOBJ') {
            result += '<div class=\'lang lang-bto\'>' + token[1] + '<span class=\'tooltip\'>' + token[2] +  '</span></div>';
        } else if (token[0] == 'IDENTIFIER') {
            result += '<div class=\'lang lang-idn\'>' + token[1] + '</div>';
        } else if (token[0] == 'COMMENT') {
            result += '<div class=\'lang lang-com\'>' + token[1] + '</div>';
        }
    }

    codeblock.innerHTML = result;
}