var codeblocks = document.getElementsByClassName('bash');

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
var ALLOWEDCHARS = ASCIIDIGITS + '`-_+[]{}\\|;\':",./<>?';
var URL = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i;

KEYWORDS = [
    'alias',
    'bg',
    'bind',
    'break',
    'builtin',
    'caller',
    'cd',
    'command',
    'compgen',
    'complete',
    'compopt',
    'continue',
    'declare',
    'dirs',
    'disown',
    'echo',
    'enable',
    'eval',
    'exec',
    'exit',
    'export',
    'false',
    'fc',
    'fg',
    'getopts',
    'hash',
    'help',
    'history',
    'jobs',
    'kill',
    'let',
    'local',
    'logout',
    'mapfile',
    'popd',
    'printf',
    'pushd',
    'pwd',
    'read',
    'readarray',
    'readonly',
    'return',
    'set',
    'shift',
    'shopt',
    'source',
    'suspend',
    'test',
    'times',
    'trap',
    'true',
    'type',
    'typeset',
    'ulimit',
    'umask',
    'unalias',
    'unset',
    'wait'
]

var script; // String
var val; // Array
var index; // Integer
var char; // String
var quotetype; // String
var string; // String
var escaped; // Boolean
var option; // String
var tokentype; // String
var identifier; // String
var result; // String
var firstinline; // Boolean

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

        if (char == '\n') {
            tokens.push(['EOL']);
            val=advance(script,index);char=val[0];index=val[1];
        }

        else if (' '.includes(char)) {
            tokens.push(['SPACE']);
            val=advance(script,index);char=val[0];index=val[1];
        }

        else if ('\t'.includes(char)) {
            tokens.push(['TAB']);
            val=advance(script,index);char=val[0];index=val[1];
        }

        else if ('#'.includes(char)) {
            comment = '#';
            val=advance(script,index);char=val[0];index=val[1];
            while (['\n', undefined].indexOf(char) < 0) {
                comment += char;
                val=advance(script,index);char=val[0];index=val[1];
            }
            tokens.push(['COMMENT', comment]);
        }

        else if ('"\''.includes(char)) {
            quotetype = char;
            string = quotetype;
            escaped = false;
            val=advance(script,index);char=val[0];index=val[1];
            while (char != undefined && (char != quotetype || escaped)) {
                if (escaped) {
                    tokens.push(['STRING', string]);
                    string = '';
                    tokens.push(['ESCAPED', '\\' + char])
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

        else if ('-'.includes(char)) {
            option = char;
            tokentype = 'OPTION';
            val=advance(script,index);char=val[0];index=val[1];
            if (char == '-') {
                tokentype = 'LONGOPTION';
                option += char;
                val=advance(script,index);char=val[0];index=val[1];
            }
            while (char != undefined && ALLOWEDCHARS.includes(char)) {
                option += char;
                val=advance(script,index);char=val[0];index=val[1];
            }
            tokens.push([tokentype, option]);
        }

        else if (ALLOWEDCHARS.includes(char)) {
            identifier = '';
            while (char != undefined && ALLOWEDCHARS.includes(char)) {
                identifier += char;
                val=advance(script,index);char=val[0];index=val[1];
            }
            tokens.push(['IDENTIFIER', identifier]);

        } else {
            val=advance(script,index);char=val[0];index=val[1];
        }
    }

    result = '';
    for (j=0;j< tokens.length ;j++) {
        token = tokens[j]
        if (token[0] == 'EOL') {
            result += '\n';
        } else if (token[0] == 'SPACE') {
            result += ' '
        } else if (token[0] == 'TAB') {
            result += '\t'
        } else if (token[0] == 'COMMENT') {
            result += '<span class=\'lang-com\'>' + token[1] + '</span>'
        } else if (token[0] == 'STRING') {
            result += '<span class=\'lang-str\'>' + token[1] + '</span>'
        } else if (token[0] == 'OPTION') {
            result += '<span class=\'lang-esc\'>' + token[1] + '</span>'
        } else if (token[0] == 'LONGOPTION') {
            result += '<span class=\'lang-typ\'>' + token[1] + '</span>'
        } else if (token[0] == 'IDENTIFIER') {
            firstinline = false;
            try {
                if (tokens[j - 1][0] == 'EOL') {
                    firstinline = true;
                }
            } catch(err) {
                firstinline = true;
            }
            if (KEYWORDS.indexOf(token[1]) >= 0 && firstinline) {
                result += '<span class=\'lang-kwd\'>' + token[1] + '</span>'
            } else if (firstinline) {
                result += '<span class=\'lang-bto\'>' + token[1] + '</span>'
            } else if (URL.test(token[1])) {
                result += '<span class=\'lang-str\'>' + token[1] + '</span>'
            } else {
                result += '<span class=\'lang-bif\'>' + token[1] + '</span>'
            }
        }
    }

    codeblock.innerHTML = result;
}