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
    'var'    : ['Initializes a variable.',
                    '<span class=\'lang-kwd\'>var</span> x'],
    'func'   : ['Creates a <span class=\'lang-typ\'>function</span>.',
                    '<span class=\'lang-kwd\'>func</span>() {}'],
    'return' : ['Returns a value from a <span class=\'lang-typ\'>function</span>.',
                    '<span class=\'lang-kwd\'>return</span>(<span class=\'lang-bto\'>Null</span>)'],
    'handler': ['Handles any <span class=\'lang-typ\'>exception</span>s caused from inside the handler.',
                    '<span class=\'lang-kwd\'>handler</span> {}'],
    'and'    : ['Combines two <span class=\'lang-typ\'>bool</span>s with the <span class=\'lang-kwd\'>and</span> logical operator.',
                    '<span class=\'lang-bto\'>True</span> <span class=\'lang-kwd\'>and</span> <span class=\'lang-bto\'>True</span>'],
    'or'     : ['Combines two <span class=\'lang-typ\'>bool</span>s with the <span class=\'lang-kwd\'>or</span> logical operator.',
                    '<span class=\'lang-bto\'>True</span> <span class=\'lang-kwd\'>or</span> <span class=\'lang-bto\'>False</span>'],
    'not'    : ['Inverts a <span class=\'lang-typ\'>bool</span>.',
                    '<span class=\'lang-kwd\'>not</span> <span class=\'lang-bto\'>False</span>']
}

var BUILTINFUNC = {
    'assert': [{'condition': 'bool', 'message': 'str'},
               'Checks if the condition is <span class=\'lang-bto\'>True</span>. If it is not, raises an <span class=\'lang-typ\'>AssertionError</span>.'],
    'panic' : [{'message': 'str'},
               'Crashes the interpreter with a message.'],
    'print' : [{'text': 'str'},
               'Prints a message to the console.'],
    'id'    : [{'obj': 'any'},
               'Gets the id of an object.'],
    'str'   : [{'obj': 'any'},
               'Converts an object into a <span class=\'lang-typ\'>str</span>.'],
    'int'   : [{'obj': 'any'},
               'Converts an object into an <span class=\'lang-typ\'>integer</span>.'],
    'float' : [{'obj': 'any'},
               'Converts an object into a <span class=\'lang-typ\'>float</span>.']
}

var BUILTINTYPEOBJ = {
    'True': 'Boolean',
    'False': 'Boolean',
    'Null': 'NullType'
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
                    args.push('<strong>' + keys[j] + '</strong>: <span class=\'lang-typ\'>' + values[j] + '</span>');
                }
                args = args.join(', ')
                tokens.push(['BUILTINFUNC', identifier, '<span class=\'lang-typ\'>Built-In Function</span> <strong class=\'lang-bif\'>' + identifier + '</strong>(<br />&nbsp;&nbsp;' + args + '<br />)<br /><br />' + BUILTINFUNC[identifier][1]])
            } else if (Object.keys(BUILTINTYPEOBJ).indexOf(identifier) >= 0) {
                tokens.push(['BUILTINTYPEOBJ', identifier, '<span class=\'lang-typ\'>' + BUILTINTYPEOBJ[identifier] + '</span> <strong class=\'lang-bif\'>' + identifier + '</strong>'])
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