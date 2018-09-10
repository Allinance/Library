/*!
 * jQuery JavaScript Library v3.1.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2016-09-22T22:30Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			resolve.call( undefined, value );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.call( undefined, value );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && jQuery.nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function manipulationTarget( elem, content ) {
	if ( jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE <=9 only
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val,
		valueIsBorderBox = true,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE <=11 only
	// Running getBoundingClientRect on a disconnected node
	// in IE throws an error.
	if ( elem.getClientRects().length ) {
		val = elem.getBoundingClientRect()[ name ];
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function raf() {
	if ( timerId ) {
		window.requestAnimationFrame( raf );
		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off or if document is hidden
	if ( jQuery.fx.off || document.hidden ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.requestAnimationFrame ?
			window.requestAnimationFrame( raf ) :
			window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	if ( window.cancelAnimationFrame ) {
		window.cancelAnimationFrame( timerId );
	} else {
		window.clearInterval( timerId );
	}

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( jQuery.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win, rect, doc,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		// Make sure element is not hidden (display: none)
		if ( rect.width || rect.height ) {
			doc = elem.ownerDocument;
			win = getWindow( doc );
			docElem = doc.documentElement;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		}

		// Return zeros for disconnected and hidden elements (gh-2310)
		return rect;
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.parseJSON = JSON.parse;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}





return jQuery;
} );


/*!
 * jQuery JavaScript Library v3.1.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2016-09-22T22:30Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			resolve.call( undefined, value );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.call( undefined, value );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && jQuery.nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function manipulationTarget( elem, content ) {
	if ( jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE <=9 only
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val,
		valueIsBorderBox = true,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE <=11 only
	// Running getBoundingClientRect on a disconnected node
	// in IE throws an error.
	if ( elem.getClientRects().length ) {
		val = elem.getBoundingClientRect()[ name ];
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function raf() {
	if ( timerId ) {
		window.requestAnimationFrame( raf );
		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off or if document is hidden
	if ( jQuery.fx.off || document.hidden ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.requestAnimationFrame ?
			window.requestAnimationFrame( raf ) :
			window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	if ( window.cancelAnimationFrame ) {
		window.cancelAnimationFrame( timerId );
	} else {
		window.clearInterval( timerId );
	}

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( jQuery.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win, rect, doc,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		// Make sure element is not hidden (display: none)
		if ( rect.width || rect.height ) {
			doc = elem.ownerDocument;
			win = getWindow( doc );
			docElem = doc.documentElement;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		}

		// Return zeros for disconnected and hidden elements (gh-2310)
		return rect;
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.parseJSON = JSON.parse;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}





return jQuery;
} );

//     Backbone.js 1.3.3
//
//     (c) 2010-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(factory) {

  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
  // We use `self` instead of `window` for `WebWorker` support.
  var root = (typeof self == 'object' && self.self === self && self) ||
            (typeof global == 'object' && global.global === global && global);

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore'), $;
    try { $ = require('jquery'); } catch (e) {}
    factory(root, exports, _, $);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

})(function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to a common array method we'll want to use later.
  var slice = Array.prototype.slice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.3.3';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... this will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Proxy Backbone class methods to Underscore functions, wrapping the model's
  // `attributes` object or collection's `models` array behind the scenes.
  //
  // collection.filter(function(model) { return model.get('age') > 10 });
  // collection.each(this.addView);
  //
  // `Function#apply` can be slow so we use the method's arg count, if we know it.
  var addMethod = function(length, method, attribute) {
    switch (length) {
      case 1: return function() {
        return _[method](this[attribute]);
      };
      case 2: return function(value) {
        return _[method](this[attribute], value);
      };
      case 3: return function(iteratee, context) {
        return _[method](this[attribute], cb(iteratee, this), context);
      };
      case 4: return function(iteratee, defaultVal, context) {
        return _[method](this[attribute], cb(iteratee, this), defaultVal, context);
      };
      default: return function() {
        var args = slice.call(arguments);
        args.unshift(this[attribute]);
        return _[method].apply(_, args);
      };
    }
  };
  var addUnderscoreMethods = function(Class, methods, attribute) {
    _.each(methods, function(length, method) {
      if (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
    });
  };

  // Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
  var cb = function(iteratee, instance) {
    if (_.isFunction(iteratee)) return iteratee;
    if (_.isObject(iteratee) && !instance._isModel(iteratee)) return modelMatcher(iteratee);
    if (_.isString(iteratee)) return function(model) { return model.get(iteratee); };
    return iteratee;
  };
  var modelMatcher = function(attrs) {
    var matcher = _.matches(attrs);
    return function(model) {
      return matcher(model.attributes);
    };
  };

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // a custom event channel. You may bind a callback to an event with `on` or
  // remove with `off`; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {};

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Iterates over the standard `event, callback` (as well as the fancy multiple
  // space-separated events `"change blur", callback` and jQuery-style event
  // maps `{event: callback}`).
  var eventsApi = function(iteratee, events, name, callback, opts) {
    var i = 0, names;
    if (name && typeof name === 'object') {
      // Handle event maps.
      if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
      for (names = _.keys(name); i < names.length ; i++) {
        events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
      }
    } else if (name && eventSplitter.test(name)) {
      // Handle space-separated event names by delegating them individually.
      for (names = name.split(eventSplitter); i < names.length; i++) {
        events = iteratee(events, names[i], callback, opts);
      }
    } else {
      // Finally, standard events.
      events = iteratee(events, name, callback, opts);
    }
    return events;
  };

  // Bind an event to a `callback` function. Passing `"all"` will bind
  // the callback to all events fired.
  Events.on = function(name, callback, context) {
    return internalOn(this, name, callback, context);
  };

  // Guard the `listening` argument from the public API.
  var internalOn = function(obj, name, callback, context, listening) {
    obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
      context: context,
      ctx: obj,
      listening: listening
    });

    if (listening) {
      var listeners = obj._listeners || (obj._listeners = {});
      listeners[listening.id] = listening;
    }

    return obj;
  };

  // Inversion-of-control versions of `on`. Tell *this* object to listen to
  // an event in another object... keeping track of what it's listening to
  // for easier unbinding later.
  Events.listenTo = function(obj, name, callback) {
    if (!obj) return this;
    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
    var listeningTo = this._listeningTo || (this._listeningTo = {});
    var listening = listeningTo[id];

    // This object is not listening to any other events on `obj` yet.
    // Setup the necessary references to track the listening callbacks.
    if (!listening) {
      var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
      listening = listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0};
    }

    // Bind callbacks on obj, and keep track of them on listening.
    internalOn(obj, name, callback, this, listening);
    return this;
  };

  // The reducing API that adds a callback to the `events` object.
  var onApi = function(events, name, callback, options) {
    if (callback) {
      var handlers = events[name] || (events[name] = []);
      var context = options.context, ctx = options.ctx, listening = options.listening;
      if (listening) listening.count++;

      handlers.push({callback: callback, context: context, ctx: context || ctx, listening: listening});
    }
    return events;
  };

  // Remove one or many callbacks. If `context` is null, removes all
  // callbacks with that function. If `callback` is null, removes all
  // callbacks for the event. If `name` is null, removes all bound
  // callbacks for all events.
  Events.off = function(name, callback, context) {
    if (!this._events) return this;
    this._events = eventsApi(offApi, this._events, name, callback, {
      context: context,
      listeners: this._listeners
    });
    return this;
  };

  // Tell this object to stop listening to either specific events ... or
  // to every object it's currently listening to.
  Events.stopListening = function(obj, name, callback) {
    var listeningTo = this._listeningTo;
    if (!listeningTo) return this;

    var ids = obj ? [obj._listenId] : _.keys(listeningTo);

    for (var i = 0; i < ids.length; i++) {
      var listening = listeningTo[ids[i]];

      // If listening doesn't exist, this object is not currently
      // listening to obj. Break out early.
      if (!listening) break;

      listening.obj.off(name, callback, this);
    }

    return this;
  };

  // The reducing API that removes a callback from the `events` object.
  var offApi = function(events, name, callback, options) {
    if (!events) return;

    var i = 0, listening;
    var context = options.context, listeners = options.listeners;

    // Delete all events listeners and "drop" events.
    if (!name && !callback && !context) {
      var ids = _.keys(listeners);
      for (; i < ids.length; i++) {
        listening = listeners[ids[i]];
        delete listeners[listening.id];
        delete listening.listeningTo[listening.objId];
      }
      return;
    }

    var names = name ? [name] : _.keys(events);
    for (; i < names.length; i++) {
      name = names[i];
      var handlers = events[name];

      // Bail out if there are no events stored.
      if (!handlers) break;

      // Replace events if there are any remaining.  Otherwise, clean up.
      var remaining = [];
      for (var j = 0; j < handlers.length; j++) {
        var handler = handlers[j];
        if (
          callback && callback !== handler.callback &&
            callback !== handler.callback._callback ||
              context && context !== handler.context
        ) {
          remaining.push(handler);
        } else {
          listening = handler.listening;
          if (listening && --listening.count === 0) {
            delete listeners[listening.id];
            delete listening.listeningTo[listening.objId];
          }
        }
      }

      // Update tail event if the list has any events.  Otherwise, clean up.
      if (remaining.length) {
        events[name] = remaining;
      } else {
        delete events[name];
      }
    }
    return events;
  };

  // Bind an event to only be triggered a single time. After the first time
  // the callback is invoked, its listener will be removed. If multiple events
  // are passed in using the space-separated syntax, the handler will fire
  // once for each event, not once for a combination of all events.
  Events.once = function(name, callback, context) {
    // Map the event into a `{event: once}` object.
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
    if (typeof name === 'string' && context == null) callback = void 0;
    return this.on(events, callback, context);
  };

  // Inversion-of-control versions of `once`.
  Events.listenToOnce = function(obj, name, callback) {
    // Map the event into a `{event: once}` object.
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
    return this.listenTo(obj, events);
  };

  // Reduces the event callbacks into a map of `{event: onceWrapper}`.
  // `offer` unbinds the `onceWrapper` after it has been called.
  var onceMap = function(map, name, callback, offer) {
    if (callback) {
      var once = map[name] = _.once(function() {
        offer(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
    }
    return map;
  };

  // Trigger one or many events, firing all bound callbacks. Callbacks are
  // passed the same arguments as `trigger` is, apart from the event name
  // (unless you're listening on `"all"`, which will cause your callback to
  // receive the true name of the event as the first argument).
  Events.trigger = function(name) {
    if (!this._events) return this;

    var length = Math.max(0, arguments.length - 1);
    var args = Array(length);
    for (var i = 0; i < length; i++) args[i] = arguments[i + 1];

    eventsApi(triggerApi, this._events, name, void 0, args);
    return this;
  };

  // Handles triggering the appropriate event callbacks.
  var triggerApi = function(objEvents, name, callback, args) {
    if (objEvents) {
      var events = objEvents[name];
      var allEvents = objEvents.all;
      if (events && allEvents) allEvents = allEvents.slice();
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, [name].concat(args));
    }
    return objEvents;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId(this.cidPrefix);
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    var defaults = _.result(this, 'defaults');
    attrs = _.defaults(_.extend({}, defaults, attrs), defaults);
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // The prefix is used to create the client id which is used to identify models locally.
    // You may want to override this if you're experiencing name clashes with model ids.
    cidPrefix: 'c',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Special-cased proxy to underscore's `_.matches` method.
    matches: function(attrs) {
      return !!_.iteratee(attrs, this)(this.attributes);
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      var attrs;
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      var unset      = options.unset;
      var silent     = options.silent;
      var changes    = [];
      var changing   = this._changing;
      this._changing = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }

      var current = this.attributes;
      var changed = this.changed;
      var prev    = this._previousAttributes;

      // For each `set` attribute, update or delete the current value.
      for (var attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          changed[attr] = val;
        } else {
          delete changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Update the `id`.
      if (this.idAttribute in attrs) this.id = this.get(this.idAttribute);

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0; i < changes.length; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      var changed = {};
      for (var attr in diff) {
        var val = diff[attr];
        if (_.isEqual(old[attr], val)) continue;
        changed[attr] = val;
      }
      return _.size(changed) ? changed : false;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server, merging the response with the model's
    // local attributes. Any changed attributes will trigger a "change" event.
    fetch: function(options) {
      options = _.extend({parse: true}, options);
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
        if (!model.set(serverAttrs, options)) return false;
        if (success) success.call(options.context, model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      // Handle both `"key", value` and `{key: value}` -style arguments.
      var attrs;
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true, parse: true}, options);
      var wait = options.wait;

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !wait) {
        if (!this.set(attrs, options)) return false;
      } else if (!this._validate(attrs, options)) {
        return false;
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      var model = this;
      var success = options.success;
      var attributes = this.attributes;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
        if (wait) serverAttrs = _.extend({}, attrs, serverAttrs);
        if (serverAttrs && !model.set(serverAttrs, options)) return false;
        if (success) success.call(options.context, model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      // Set temporary attributes if `{wait: true}` to properly find new ids.
      if (attrs && wait) this.attributes = _.extend({}, attributes, attrs);

      var method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch' && !options.attrs) options.attrs = attrs;
      var xhr = this.sync(method, this, options);

      // Restore attributes.
      this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;
      var wait = options.wait;

      var destroy = function() {
        model.stopListening();
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (wait) destroy();
        if (success) success.call(options.context, model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      var xhr = false;
      if (this.isNew()) {
        _.defer(options.success);
      } else {
        wrapError(this, options);
        xhr = this.sync('delete', this, options);
      }
      if (!wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      var id = this.get(this.idAttribute);
      return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend({}, options, {validate: true}));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model, mapped to the
  // number of arguments they take.
  var modelMethods = {keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
      omit: 0, chain: 1, isEmpty: 1};

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  addUnderscoreMethods(Model, modelMethods, 'attributes');

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analogous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Splices `insert` into `array` at index `at`.
  var splice = function(array, insert, at) {
    at = Math.min(Math.max(at, 0), array.length);
    var tail = Array(array.length - at);
    var length = insert.length;
    var i;
    for (i = 0; i < tail.length; i++) tail[i] = array[i + at];
    for (i = 0; i < length; i++) array[i + at] = insert[i];
    for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
  };

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model) { return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set. `models` may be Backbone
    // Models or raw JavaScript objects to be converted to Models, or any
    // combination of the two.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      options = _.extend({}, options);
      var singular = !_.isArray(models);
      models = singular ? [models] : models.slice();
      var removed = this._removeModels(models, options);
      if (!options.silent && removed.length) {
        options.changes = {added: [], merged: [], removed: removed};
        this.trigger('update', this, options);
      }
      return singular ? removed[0] : removed;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      if (models == null) return;

      options = _.extend({}, setOptions, options);
      if (options.parse && !this._isModel(models)) {
        models = this.parse(models, options) || [];
      }

      var singular = !_.isArray(models);
      models = singular ? [models] : models.slice();

      var at = options.at;
      if (at != null) at = +at;
      if (at > this.length) at = this.length;
      if (at < 0) at += this.length + 1;

      var set = [];
      var toAdd = [];
      var toMerge = [];
      var toRemove = [];
      var modelMap = {};

      var add = options.add;
      var merge = options.merge;
      var remove = options.remove;

      var sort = false;
      var sortable = this.comparator && at == null && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      var model, i;
      for (i = 0; i < models.length; i++) {
        model = models[i];

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        var existing = this.get(model);
        if (existing) {
          if (merge && model !== existing) {
            var attrs = this._isModel(model) ? model.attributes : model;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            toMerge.push(existing);
            if (sortable && !sort) sort = existing.hasChanged(sortAttr);
          }
          if (!modelMap[existing.cid]) {
            modelMap[existing.cid] = true;
            set.push(existing);
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(model, options);
          if (model) {
            toAdd.push(model);
            this._addReference(model, options);
            modelMap[model.cid] = true;
            set.push(model);
          }
        }
      }

      // Remove stale models.
      if (remove) {
        for (i = 0; i < this.length; i++) {
          model = this.models[i];
          if (!modelMap[model.cid]) toRemove.push(model);
        }
        if (toRemove.length) this._removeModels(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      var orderChanged = false;
      var replace = !sortable && add && remove;
      if (set.length && replace) {
        orderChanged = this.length !== set.length || _.some(this.models, function(m, index) {
          return m !== set[index];
        });
        this.models.length = 0;
        splice(this.models, set, 0);
        this.length = this.models.length;
      } else if (toAdd.length) {
        if (sortable) sort = true;
        splice(this.models, toAdd, at == null ? this.length : at);
        this.length = this.models.length;
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort/update events.
      if (!options.silent) {
        for (i = 0; i < toAdd.length; i++) {
          if (at != null) options.index = at + i;
          model = toAdd[i];
          model.trigger('add', model, this, options);
        }
        if (sort || orderChanged) this.trigger('sort', this, options);
        if (toAdd.length || toRemove.length || toMerge.length) {
          options.changes = {
            added: toAdd,
            removed: toRemove,
            merged: toMerge
          };
          this.trigger('update', this, options);
        }
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options = options ? _.clone(options) : {};
      for (var i = 0; i < this.models.length; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      return this.remove(model, options);
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      return this.remove(model, options);
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id, cid, model object with id or cid
    // properties, or an attributes object that is transformed through modelId.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] ||
        this._byId[this.modelId(obj.attributes || obj)] ||
        obj.cid && this._byId[obj.cid];
    },

    // Returns `true` if the model is in the collection.
    has: function(obj) {
      return this.get(obj) != null;
    },

    // Get the model at the given index.
    at: function(index) {
      if (index < 0) index += this.length;
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      return this[first ? 'find' : 'filter'](attrs);
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      var comparator = this.comparator;
      if (!comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      var length = comparator.length;
      if (_.isFunction(comparator)) comparator = _.bind(comparator, this);

      // Run sort based on type of `comparator`.
      if (length === 1 || _.isString(comparator)) {
        this.models = this.sortBy(comparator);
      } else {
        this.models.sort(comparator);
      }
      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return this.map(attr + '');
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = _.extend({parse: true}, options);
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success.call(options.context, collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      var wait = options.wait;
      model = this._prepareModel(model, options);
      if (!model) return false;
      if (!wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(m, resp, callbackOpts) {
        if (wait) collection.add(m, callbackOpts);
        if (success) success.call(callbackOpts.context, m, resp, callbackOpts);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models, {
        model: this.model,
        comparator: this.comparator
      });
    },

    // Define how to uniquely identify models in the collection.
    modelId: function(attrs) {
      return attrs[this.model.prototype.idAttribute || 'id'];
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (this._isModel(attrs)) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method called by both remove and set.
    _removeModels: function(models, options) {
      var removed = [];
      for (var i = 0; i < models.length; i++) {
        var model = this.get(models[i]);
        if (!model) continue;

        var index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;

        // Remove references before triggering 'remove' event to prevent an
        // infinite loop. #3693
        delete this._byId[model.cid];
        var id = this.modelId(model.attributes);
        if (id != null) delete this._byId[id];

        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }

        removed.push(model);
        this._removeReference(model, options);
      }
      return removed;
    },

    // Method for checking whether an object should be considered a model for
    // the purposes of adding to the collection.
    _isModel: function(model) {
      return model instanceof Model;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      var id = this.modelId(model.attributes);
      if (id != null) this._byId[id] = model;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      delete this._byId[model.cid];
      var id = this.modelId(model.attributes);
      if (id != null) delete this._byId[id];
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if (model) {
        if ((event === 'add' || event === 'remove') && collection !== this) return;
        if (event === 'destroy') this.remove(model, options);
        if (event === 'change') {
          var prevId = this.modelId(model.previousAttributes());
          var id = this.modelId(model.attributes);
          if (prevId !== id) {
            if (prevId != null) delete this._byId[prevId];
            if (id != null) this._byId[id] = model;
          }
        }
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var collectionMethods = {forEach: 3, each: 3, map: 3, collect: 3, reduce: 0,
      foldl: 0, inject: 0, reduceRight: 0, foldr: 0, find: 3, detect: 3, filter: 3,
      select: 3, reject: 3, every: 3, all: 3, some: 3, any: 3, include: 3, includes: 3,
      contains: 3, invoke: 0, max: 3, min: 3, toArray: 1, size: 1, first: 3,
      head: 3, take: 3, initial: 3, rest: 3, tail: 3, drop: 3, last: 3,
      without: 0, difference: 0, indexOf: 3, shuffle: 1, lastIndexOf: 3,
      isEmpty: 1, chain: 1, sample: 3, partition: 3, groupBy: 3, countBy: 3,
      sortBy: 3, indexBy: 3, findIndex: 3, findLastIndex: 3};

  // Mix in each Underscore method as a proxy to `Collection#models`.
  addUnderscoreMethods(Collection, collectionMethods, 'models');

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be set as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this._removeElement();
      this.stopListening();
      return this;
    },

    // Remove this view's element from the document and all event listeners
    // attached to it. Exposed for subclasses using an alternative DOM
    // manipulation API.
    _removeElement: function() {
      this.$el.remove();
    },

    // Change the view's element (`this.el` property) and re-delegate the
    // view's events on the new element.
    setElement: function(element) {
      this.undelegateEvents();
      this._setElement(element);
      this.delegateEvents();
      return this;
    },

    // Creates the `this.el` and `this.$el` references for this view using the
    // given `el`. `el` can be a CSS selector or an HTML string, a jQuery
    // context or an element. Subclasses can override this to utilize an
    // alternative DOM manipulation API and are only required to set the
    // `this.el` property.
    _setElement: function(el) {
      this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
      this.el = this.$el[0];
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    delegateEvents: function(events) {
      events || (events = _.result(this, 'events'));
      if (!events) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[method];
        if (!method) continue;
        var match = key.match(delegateEventSplitter);
        this.delegate(match[1], match[2], _.bind(method, this));
      }
      return this;
    },

    // Add a single event listener to the view's element (or a child element
    // using `selector`). This only works for delegate-able events: not `focus`,
    // `blur`, and not `change`, `submit`, and `reset` in Internet Explorer.
    delegate: function(eventName, selector, listener) {
      this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
      return this;
    },

    // Clears all callbacks previously bound to the view by `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      if (this.$el) this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // A finer-grained `undelegateEvents` for removing a single delegated event.
    // `selector` and `listener` are both optional.
    undelegate: function(eventName, selector, listener) {
      this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
      return this;
    },

    // Produces a DOM element to be assigned to your view. Exposed for
    // subclasses using an alternative DOM manipulation API.
    _createElement: function(tagName) {
      return document.createElement(tagName);
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        this.setElement(this._createElement(_.result(this, 'tagName')));
        this._setAttributes(attrs);
      } else {
        this.setElement(_.result(this, 'el'));
      }
    },

    // Set attributes from a hash on this view's element.  Exposed for
    // subclasses using an alternative DOM manipulation API.
    _setAttributes: function(attributes) {
      this.$el.attr(attributes);
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // Pass along `textStatus` and `errorThrown` from jQuery.
    var error = options.error;
    options.error = function(xhr, textStatus, errorThrown) {
      options.textStatus = textStatus;
      options.errorThrown = errorThrown;
      if (error) error.call(options.context, xhr, textStatus, errorThrown);
    };

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch': 'PATCH',
    'delete': 'DELETE',
    'read': 'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        if (router.execute(callback, args, name) !== false) {
          router.trigger.apply(router, ['route:' + name].concat(args));
          router.trigger('route', name, args);
          Backbone.history.trigger('route', router, name, args);
        }
      });
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args, name) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    this.checkUrl = _.bind(this.checkUrl, this);

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      var path = this.location.pathname.replace(/[^\/]$/, '$&/');
      return path === this.root && !this.getSearch();
    },

    // Does the pathname match the root?
    matchRoot: function() {
      var path = this.decodeFragment(this.location.pathname);
      var rootPath = path.slice(0, this.root.length - 1) + '/';
      return rootPath === this.root;
    },

    // Unicode characters in `location.pathname` are percent encoded so they're
    // decoded for comparison. `%25` should not be decoded since it may be part
    // of an encoded parameter.
    decodeFragment: function(fragment) {
      return decodeURI(fragment.replace(/%25/g, '%2525'));
    },

    // In IE6, the hash fragment and search params are incorrect if the
    // fragment contains `?`.
    getSearch: function() {
      var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
      return match ? match[0] : '';
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the pathname and search params, without the root.
    getPath: function() {
      var path = this.decodeFragment(
        this.location.pathname + this.getSearch()
      ).slice(this.root.length - 1);
      return path.charAt(0) === '/' ? path.slice(1) : path;
    },

    // Get the cross-browser normalized URL fragment from the path or hash.
    getFragment: function(fragment) {
      if (fragment == null) {
        if (this._usePushState || !this._wantsHashChange) {
          fragment = this.getPath();
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error('Backbone.history has already been started');
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._hasHashChange   = 'onhashchange' in window && (document.documentMode === void 0 || document.documentMode > 7);
      this._useHashChange   = this._wantsHashChange && this._hasHashChange;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.history && this.history.pushState);
      this._usePushState    = this._wantsPushState && this._hasPushState;
      this.fragment         = this.getFragment();

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          var rootPath = this.root.slice(0, -1) || '/';
          this.location.replace(rootPath + '#' + this.getPath());
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot()) {
          this.navigate(this.getHash(), {replace: true});
        }

      }

      // Proxy an iframe to handle location events if the browser doesn't
      // support the `hashchange` event, HTML5 history, or the user wants
      // `hashChange` but not `pushState`.
      if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
        this.iframe = document.createElement('iframe');
        this.iframe.src = 'javascript:0';
        this.iframe.style.display = 'none';
        this.iframe.tabIndex = -1;
        var body = document.body;
        // Using `appendChild` will throw on IE < 9 if the document is not ready.
        var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
        iWindow.document.open();
        iWindow.document.close();
        iWindow.location.hash = '#' + this.fragment;
      }

      // Add a cross-platform `addEventListener` shim for older browsers.
      var addEventListener = window.addEventListener || function(eventName, listener) {
        return attachEvent('on' + eventName, listener);
      };

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._usePushState) {
        addEventListener('popstate', this.checkUrl, false);
      } else if (this._useHashChange && !this.iframe) {
        addEventListener('hashchange', this.checkUrl, false);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      // Add a cross-platform `removeEventListener` shim for older browsers.
      var removeEventListener = window.removeEventListener || function(eventName, listener) {
        return detachEvent('on' + eventName, listener);
      };

      // Remove window listeners.
      if (this._usePushState) {
        removeEventListener('popstate', this.checkUrl, false);
      } else if (this._useHashChange && !this.iframe) {
        removeEventListener('hashchange', this.checkUrl, false);
      }

      // Clean up the iframe if necessary.
      if (this.iframe) {
        document.body.removeChild(this.iframe);
        this.iframe = null;
      }

      // Some environments will throw when clearing an undefined interval.
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();

      // If the user pressed the back button, the iframe's hash will have
      // changed and we should use that for comparison.
      if (current === this.fragment && this.iframe) {
        current = this.getHash(this.iframe.contentWindow);
      }

      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      // If the root doesn't match, no routes can match either.
      if (!this.matchRoot()) return false;
      fragment = this.fragment = this.getFragment(fragment);
      return _.some(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      // Normalize the fragment.
      fragment = this.getFragment(fragment || '');

      // Don't include a trailing slash on the root.
      var rootPath = this.root;
      if (fragment === '' || fragment.charAt(0) === '?') {
        rootPath = rootPath.slice(0, -1) || '/';
      }
      var url = rootPath + fragment;

      // Strip the hash and decode for matching.
      fragment = this.decodeFragment(fragment.replace(pathStripper, ''));

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._usePushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && fragment !== this.getHash(this.iframe.contentWindow)) {
          var iWindow = this.iframe.contentWindow;

          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if (!options.replace) {
            iWindow.document.open();
            iWindow.document.close();
          }

          this._updateHash(iWindow.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function and add the prototype properties.
    child.prototype = _.create(parent.prototype, protoProps);
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error.call(options.context, model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };
  document.Backbone = Backbone
  return Backbone;
});

/*! JointJS v2.1.4 (2018-08-01) - JavaScript diagramming library


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
(function(root, factory) {

    if (typeof define === 'function' && define.amd) {

        // For AMD.

        define(['backbone', 'lodash', 'jquery'], function(Backbone, _, $) {

            Backbone.$ = $;

            return factory(root, Backbone, _, $);
        });

    } else if (typeof exports !== 'undefined') {

        // For Node.js or CommonJS.

        var Backbone = require('backbone');
        var _ = require('lodash');
        var $ = Backbone.$ = require('jquery');

        module.exports = factory(root, Backbone, _, $);

    } else {

        // As a browser global.

        var Backbone = root.Backbone;
        var _ = root._;
        var $ = Backbone.$ = root.jQuery || root.$;

        root.joint = factory(root, Backbone, _, $);
        root.g = root.joint.g;
        root.V = root.Vectorizer = root.joint.V;
    }

}(this, function(root, Backbone, _, $) {

!function(){function a(a){this.message=a}var b="undefined"!=typeof exports?exports:this,c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";a.prototype=new Error,a.prototype.name="InvalidCharacterError",b.btoa||(b.btoa=function(b){for(var d,e,f=String(b),g=0,h=c,i="";f.charAt(0|g)||(h="=",g%1);i+=h.charAt(63&d>>8-g%1*8)){if(e=f.charCodeAt(g+=.75),e>255)throw new a("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");d=d<<8|e}return i}),b.atob||(b.atob=function(b){var d=String(b).replace(/=+$/,"");if(d.length%4==1)throw new a("'atob' failed: The string to be decoded is not correctly encoded.");for(var e,f,g=0,h=0,i="";f=d.charAt(h++);~f&&(e=g%4?64*e+f:f,g++%4)?i+=String.fromCharCode(255&e>>(-2*g&6)):0)f=c.indexOf(f);return i})}(),function(){function a(a,b){return this.slice(a,b)}function b(a,b){arguments.length<2&&(b=0);for(var c=0,d=a.length;c<d;++c,++b)this[b]=255&a[c]}function c(c){var d;if("number"==typeof c){d=new Array(c);for(var e=0;e<c;++e)d[e]=0}else d=c.slice(0);return d.subarray=a,d.buffer=d,d.byteLength=d.length,d.set=b,"object"==typeof c&&c.buffer&&(d.buffer=c.buffer),d}"undefined"==typeof Uint8Array&&"undefined"!=typeof window&&(window.Uint8Array=c,window.Uint32Array=c,window.Int32Array=c)}(),function(){"undefined"!=typeof XMLHttpRequest&&("response"in XMLHttpRequest.prototype||"mozResponseArrayBuffer"in XMLHttpRequest.prototype||"mozResponse"in XMLHttpRequest.prototype||"responseArrayBuffer"in XMLHttpRequest.prototype||Object.defineProperty(XMLHttpRequest.prototype,"response",{get:function(){return new Uint8Array(new VBArray(this.responseBody).toArray())}}))}(),Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(a,b){function c(a,b){return a===b||"number"==typeof a&&"number"==typeof b&&isNaN(a)&&isNaN(b)}if(null==this)throw new TypeError('"this" is null or not defined');var d=Object(this),e=d.length>>>0;if(0===e)return!1;for(var f=0|b,g=Math.max(f>=0?f:e-Math.abs(f),0);g<e;){if(c(d[g],a))return!0;g++}return!1}}),Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(a){if(null==this)throw new TypeError('"this" is null or not defined');var b=Object(this),c=b.length>>>0;if("function"!=typeof a)throw new TypeError("predicate must be a function");for(var d=arguments[1],e=0;e<c;){var f=b[e];if(a.call(d,f,e,b))return f;e++}}}),Array.from||(Array.from=function(){var a=Object.prototype.toString,b=function(b){return"function"==typeof b||"[object Function]"===a.call(b)},c=function(a){var b=Number(a);return isNaN(b)?0:0!==b&&isFinite(b)?(b>0?1:-1)*Math.floor(Math.abs(b)):b},d=Math.pow(2,53)-1,e=function(a){var b=c(a);return Math.min(Math.max(b,0),d)};return function(a){var c=this,d=Object(a);if(null==a)throw new TypeError("Array.from requires an array-like object - not null or undefined");var f,g=arguments.length>1?arguments[1]:void 0;if("undefined"!=typeof g){if(!b(g))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(f=arguments[2])}for(var h,i=e(d.length),j=b(c)?Object(new c(i)):new Array(i),k=0;k<i;)h=d[k],g?j[k]="undefined"==typeof f?g(h,k):g.call(f,h,k):j[k]=h,k+=1;return j.length=i,j}}()),Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(a){if(null==this)throw new TypeError('"this" is null or not defined');var b=Object(this),c=b.length>>>0;if("function"!=typeof a)throw new TypeError("predicate must be a function");for(var d=arguments[1],e=0;e<c;){var f=b[e];if(a.call(d,f,e,b))return e;e++}return-1}}),String.prototype.includes||(String.prototype.includes=function(a,b){"use strict";return"number"!=typeof b&&(b=0),!(b+a.length>this.length)&&this.indexOf(a,b)!==-1}),String.prototype.startsWith||(String.prototype.startsWith=function(a,b){return this.substr(b||0,a.length)===a}),Number.isFinite=Number.isFinite||function(a){return"number"==typeof a&&isFinite(a)},Number.isNaN=Number.isNaN||function(a){return a!==a};
var g={};!function(a){function b(a,b){return b.unshift(null),new(Function.prototype.bind.apply(a,b))}function c(a){var b,c,d=[];for(c=arguments.length,b=1;b<c;b++)d.push(arguments[b]);if(!a)throw new Error("Missing a parent object.");var e=Object.create(a);for(c=d.length,b=0;b<c;b++){var f,g,h=d[b];for(g in h)h.hasOwnProperty(g)&&(delete e[g],f=Object.getOwnPropertyDescriptor(h,g),Object.defineProperty(e,g,f))}return e}var d=Math,e=d.abs,f=d.cos,g=d.sin,h=d.sqrt,i=d.min,j=d.max,k=d.atan2,l=d.round,m=d.floor,n=d.PI,o=d.random,p=d.pow;a.bezier={curveThroughPoints:function(a){return console.warn("deprecated"),new t(q.throughPoints(a)).serialize()},getCurveControlPoints:function(a){console.warn("deprecated");var b,c=[],d=[],e=a.length-1;if(1==e)return c[0]=new u((2*a[0].x+a[1].x)/3,(2*a[0].y+a[1].y)/3),d[0]=new u(2*c[0].x-a[0].x,2*c[0].y-a[0].y),[c,d];var f=[];for(b=1;b<e-1;b++)f[b]=4*a[b].x+2*a[b+1].x;f[0]=a[0].x+2*a[1].x,f[e-1]=(8*a[e-1].x+a[e].x)/2;var g=this.getFirstControlPoints(f);for(b=1;b<e-1;++b)f[b]=4*a[b].y+2*a[b+1].y;f[0]=a[0].y+2*a[1].y,f[e-1]=(8*a[e-1].y+a[e].y)/2;var h=this.getFirstControlPoints(f);for(b=0;b<e;b++)c.push(new u(g[b],h[b])),b<e-1?d.push(new u(2*a[b+1].x-g[b+1],2*a[b+1].y-h[b+1])):d.push(new u((a[e].x+g[e-1])/2,(a[e].y+h[e-1])/2));return[c,d]},getFirstControlPoints:function(a){console.warn("deprecated");var b=a.length,c=[],d=[],e=2;c[0]=a[0]/e;for(var f=1;f<b;f++)d[f]=1/e,e=(f<b-1?4:3.5)-d[f],c[f]=(a[f]-c[f-1])/e;for(f=1;f<b;f++)c[b-f-1]-=d[b-f]*c[b-f];return c},getCurveDivider:function(a,b,c,d){console.warn("deprecated");var e=new q(a,b,c,d);return function(a){var b=e.divide(a);return[{p0:b[0].start,p1:b[0].controlPoint1,p2:b[0].controlPoint2,p3:b[0].end},{p0:b[1].start,p1:b[1].controlPoint1,p2:b[1].controlPoint2,p3:b[1].end}]}},getInversionSolver:function(a,b,c,d){console.warn("deprecated");var e=new q(a,b,c,d);return function(a){return e.closestPointT(a)}}};var q=a.Curve=function(a,b,c,d){return this instanceof q?a instanceof q?new q(a.start,a.controlPoint1,a.controlPoint2,a.end):(this.start=new u(a),this.controlPoint1=new u(b),this.controlPoint2=new u(c),void(this.end=new u(d))):new q(a,b,c,d)};q.throughPoints=function(){function a(a){var b=a.length,c=[],d=[],e=2;c[0]=a[0]/e;for(var f=1;f<b;f++)d[f]=1/e,e=(f<b-1?4:3.5)-d[f],c[f]=(a[f]-c[f-1])/e;for(f=1;f<b;f++)c[b-f-1]-=d[b-f]*c[b-f];return c}function b(b){var c,d=[],e=[],f=b.length-1;if(1==f)return d[0]=new u((2*b[0].x+b[1].x)/3,(2*b[0].y+b[1].y)/3),e[0]=new u(2*d[0].x-b[0].x,2*d[0].y-b[0].y),[d,e];var g=[];for(c=1;c<f-1;c++)g[c]=4*b[c].x+2*b[c+1].x;g[0]=b[0].x+2*b[1].x,g[f-1]=(8*b[f-1].x+b[f].x)/2;var h=a(g);for(c=1;c<f-1;++c)g[c]=4*b[c].y+2*b[c+1].y;g[0]=b[0].y+2*b[1].y,g[f-1]=(8*b[f-1].y+b[f].y)/2;var i=a(g);for(c=0;c<f;c++)d.push(new u(h[c],i[c])),c<f-1?e.push(new u(2*b[c+1].x-h[c+1],2*b[c+1].y-i[c+1])):e.push(new u((b[f].x+h[f-1])/2,(b[f].y+i[f-1])/2));return[d,e]}return function(a){if(!a||Array.isArray(a)&&a.length<2)throw new Error("At least 2 points are required");for(var c=b(a),d=[],e=c[0].length,f=0;f<e;f++){var g=new u(c[0][f].x,c[0][f].y),h=new u(c[1][f].x,c[1][f].y);d.push(new q(a[f],g,h,a[f+1]))}return d}}(),q.prototype={bbox:function(){for(var a,b,c,d,f,g,k,l,m=this.start,n=this.controlPoint1,o=this.controlPoint2,p=this.end,q=m.x,r=m.y,s=n.x,t=n.y,u=o.x,w=o.y,x=p.x,y=p.y,z=new Array,A=new Array,B=[new Array,new Array],C=0;C<2;++C)if(0===C?(b=6*q-12*s+6*u,a=-3*q+9*s-9*u+3*x,c=3*s-3*q):(b=6*r-12*t+6*w,a=-3*r+9*t-9*w+3*y,c=3*t-3*r),e(a)<1e-12){if(e(b)<1e-12)continue;d=-c/b,0<d&&d<1&&A.push(d)}else k=b*b-4*c*a,l=h(k),k<0||(f=(-b+l)/(2*a),0<f&&f<1&&A.push(f),g=(-b-l)/(2*a),0<g&&g<1&&A.push(g));for(var D,E,F,G=A.length,H=G;G--;)d=A[G],D=1-d,E=D*D*D*q+3*D*D*d*s+3*D*d*d*u+d*d*d*x,B[0][G]=E,F=D*D*D*r+3*D*D*d*t+3*D*d*d*w+d*d*d*y,B[1][G]=F,z[G]={X:E,Y:F};A[H]=0,A[H+1]=1,z[H]={X:q,Y:r},z[H+1]={X:x,Y:y},B[0][H]=q,B[1][H]=r,B[0][H+1]=x,B[1][H+1]=y,A.length=H+2,B[0].length=H+2,B[1].length=H+2,z.length=H+2;var I=i.apply(null,B[0]),J=i.apply(null,B[1]),K=j.apply(null,B[0]),L=j.apply(null,B[1]);return new v(I,J,K-I,L-J)},clone:function(){return new q(this.start,this.controlPoint1,this.controlPoint2,this.end)},closestPoint:function(a,b){return this.pointAtT(this.closestPointT(a,b))},closestPointLength:function(a,b){b=b||{};var c=void 0===b.precision?this.PRECISION:b.precision,d=void 0===b.subdivisions?this.getSubdivisions({precision:c}):b.subdivisions,e={precision:c,subdivisions:d};return this.lengthAtT(this.closestPointT(a,e),e)},closestPointNormalizedLength:function(a,b){b=b||{};var c=void 0===b.precision?this.PRECISION:b.precision,d=void 0===b.subdivisions?this.getSubdivisions({precision:c}):b.subdivisions,e={precision:c,subdivisions:d},f=this.closestPointLength(a,e);if(!f)return 0;var g=this.length(e);return 0===g?0:f/g},closestPointT:function(a,b){b=b||{};for(var c,d,f,g,h,i,j=void 0===b.precision?this.PRECISION:b.precision,k=void 0===b.subdivisions?this.getSubdivisions({precision:j}):b.subdivisions,l=k.length,m=l?1/l:0,n=0;n<l;n++){var o=k[n],q=o.start.distance(a),r=o.end.distance(a),s=q+r;(!i||s<i)&&(c=o,d=n*m,f=(n+1)*m,g=q,h=r,i=s)}for(var t=p(10,-j);;){var u,v;if(u=g?e(g-h)/g:0,v=h?e(g-h)/h:0,u<t||v<t)return g<=h?d:f;var w=c.divide(.5);m/=2;var x=w[0].start.distance(a),y=w[0].end.distance(a),z=x+y,A=w[1].start.distance(a),B=w[1].end.distance(a),C=A+B;z<=C?(c=w[0],f-=m,g=x,h=y):(c=w[1],d+=m,g=A,h=B)}},closestPointTangent:function(a,b){return this.tangentAtT(this.closestPointT(a,b))},divide:function(a){var b=this.start,c=this.controlPoint1,d=this.controlPoint2,e=this.end;if(a<=0)return[new q(b,b,b,b),new q(b,c,d,e)];if(a>=1)return[new q(b,c,d,e),new q(e,e,e,e)];var f=this.getSkeletonPoints(a),g=f.startControlPoint1,h=f.startControlPoint2,i=f.divider,j=f.dividerControlPoint1,k=f.dividerControlPoint2;return[new q(b,g,h,i),new q(i,j,k,e)]},endpointDistance:function(){return this.start.distance(this.end)},equals:function(a){return!!a&&this.start.x===a.start.x&&this.start.y===a.start.y&&this.controlPoint1.x===a.controlPoint1.x&&this.controlPoint1.y===a.controlPoint1.y&&this.controlPoint2.x===a.controlPoint2.x&&this.controlPoint2.y===a.controlPoint2.y&&this.end.x===a.end.x&&this.end.y===a.end.y},getSkeletonPoints:function(a){var b=this.start,c=this.controlPoint1,d=this.controlPoint2,e=this.end;if(a<=0)return{startControlPoint1:b.clone(),startControlPoint2:b.clone(),divider:b.clone(),dividerControlPoint1:c.clone(),dividerControlPoint2:d.clone()};if(a>=1)return{startControlPoint1:c.clone(),startControlPoint2:d.clone(),divider:e.clone(),dividerControlPoint1:e.clone(),dividerControlPoint2:e.clone()};var f=new s(b,c).pointAt(a),g=new s(c,d).pointAt(a),h=new s(d,e).pointAt(a),i=new s(f,g).pointAt(a),j=new s(g,h).pointAt(a),k=new s(i,j).pointAt(a),l={startControlPoint1:f,startControlPoint2:i,divider:k,dividerControlPoint1:j,dividerControlPoint2:h};return l},getSubdivisions:function(a){a=a||{};var b=void 0===a.precision?this.PRECISION:a.precision,c=[new q(this.start,this.controlPoint1,this.controlPoint2,this.end)];if(0===b)return c;for(var d=this.endpointDistance(),e=p(10,-b),f=0;;){f+=1;for(var g=[],h=c.length,i=0;i<h;i++){var j=c[i],k=j.divide(.5);g.push(k[0],k[1])}for(var l=0,m=g.length,n=0;n<m;n++){var o=g[n];l+=o.endpointDistance()}var r=0!==l?(l-d)/l:0;if(f>1&&r<e)return g;c=g,d=l}},isDifferentiable:function(){var a=this.start,b=this.controlPoint1,c=this.controlPoint2,d=this.end;return!(a.equals(b)&&b.equals(c)&&c.equals(d))},length:function(a){a=a||{};for(var b=void 0===a.precision?this.PRECISION:a.precision,c=void 0===a.subdivisions?this.getSubdivisions({precision:b}):a.subdivisions,d=0,e=c.length,f=0;f<e;f++){var g=c[f];d+=g.endpointDistance()}return d},lengthAtT:function(a,b){if(a<=0)return 0;b=b||{};var c=void 0===b.precision?this.PRECISION:b.precision,d=this.divide(a)[0],e=d.length({precision:c});return e},pointAt:function(a,b){if(a<=0)return this.start.clone();if(a>=1)return this.end.clone();var c=this.tAt(a,b);return this.pointAtT(c)},pointAtLength:function(a,b){var c=this.tAtLength(a,b);return this.pointAtT(c)},pointAtT:function(a){return a<=0?this.start.clone():a>=1?this.end.clone():this.getSkeletonPoints(a).divider},PRECISION:3,scale:function(a,b,c){return this.start.scale(a,b,c),this.controlPoint1.scale(a,b,c),this.controlPoint2.scale(a,b,c),this.end.scale(a,b,c),this},tangentAt:function(a,b){if(!this.isDifferentiable())return null;a<0?a=0:a>1&&(a=1);var c=this.tAt(a,b);return this.tangentAtT(c)},tangentAtLength:function(a,b){if(!this.isDifferentiable())return null;var c=this.tAtLength(a,b);return this.tangentAtT(c)},tangentAtT:function(a){if(!this.isDifferentiable())return null;a<0?a=0:a>1&&(a=1);var b=this.getSkeletonPoints(a),c=b.startControlPoint2,d=b.dividerControlPoint1,e=b.divider,f=new s(c,d);return f.translate(e.x-c.x,e.y-c.y),f},tAt:function(a,b){if(a<=0)return 0;if(a>=1)return 1;b=b||{};var c=void 0===b.precision?this.PRECISION:b.precision,d=void 0===b.subdivisions?this.getSubdivisions({precision:c}):b.subdivisions,e={precision:c,subdivisions:d},f=this.length(e),g=f*a;return this.tAtLength(g,e)},tAtLength:function(a,b){var c=!0;a<0&&(c=!1,a=-a),b=b||{};for(var d,e,f,g,h,i=void 0===b.precision?this.PRECISION:b.precision,j=void 0===b.subdivisions?this.getSubdivisions({precision:i}):b.subdivisions,k={precision:i,subdivisions:j},l=0,m=j.length,n=1/m,o=c?0:m-1;c?o<m:o>=0;c?o++:o--){var q=j[o],r=q.endpointDistance();if(a<=l+r){d=q,e=o*n,f=(o+1)*n,g=c?a-l:r+l-a,h=c?r+l-a:a-l;break}l+=r}if(!d)return c?1:0;for(var s=this.length(k),t=p(10,-i);;){var u;if(u=0!==s?g/s:0,u<t)return e;if(u=0!==s?h/s:0,u<t)return f;var v,w,x=d.divide(.5);n/=2;var y=x[0].endpointDistance(),z=x[1].endpointDistance();g<=y?(d=x[0],f-=n,v=g,w=y-v):(d=x[1],e+=n,v=g-y,w=z-v),g=v,h=w}},translate:function(a,b){return this.start.translate(a,b),this.controlPoint1.translate(a,b),this.controlPoint2.translate(a,b),this.end.translate(a,b),this},toPoints:function(a){a=a||{};for(var b=void 0===a.precision?this.PRECISION:a.precision,c=void 0===a.subdivisions?this.getSubdivisions({precision:b}):a.subdivisions,d=[c[0].start.clone()],e=c.length,f=0;f<e;f++){var g=c[f];d.push(g.end.clone())}return d},toPolyline:function(a){return new w(this.toPoints(a))},toString:function(){return this.start+" "+this.controlPoint1+" "+this.controlPoint2+" "+this.end}};var r=a.Ellipse=function(a,b,c){return this instanceof r?a instanceof r?new r(new u(a.x,a.y),a.a,a.b):(a=new u(a),this.x=a.x,this.y=a.y,this.a=b,void(this.b=c)):new r(a,b,c)};r.fromRect=function(a){return a=new v(a),new r(a.center(),a.width/2,a.height/2)},r.prototype={bbox:function(){return new v(this.x-this.a,this.y-this.b,2*this.a,2*this.b)},clone:function(){return new r(this)},normalizedDistance:function(a){var b=a.x,c=a.y,d=this.a,e=this.b,f=this.x,g=this.y;return(b-f)*(b-f)/(d*d)+(c-g)*(c-g)/(e*e)},inflate:function(a,b){return void 0===a&&(a=0),void 0===b&&(b=a),this.a+=2*a,this.b+=2*b,this},containsPoint:function(a){return this.normalizedDistance(a)<=1},center:function(){return new u(this.x,this.y)},tangentTheta:function(a){var b,c,d=30,e=a.x,f=a.y,g=this.a,h=this.b,i=this.bbox().center(),j=i.x,k=i.y,l=e>i.x+g/2,m=e<i.x-g/2;return l||m?(b=e>i.x?f-d:f+d,c=g*g/(e-j)-g*g*(f-k)*(b-k)/(h*h*(e-j))+j):(c=f>i.y?e+d:e-d,b=h*h/(f-k)-h*h*(e-j)*(c-j)/(g*g*(f-k))+k),new u(c,b).theta(a)},equals:function(a){return!!a&&a.x===this.x&&a.y===this.y&&a.a===this.a&&a.b===this.b},intersectionWithLine:function(a){var b=[],c=a.start,d=a.end,e=this.a,f=this.b,g=a.vector(),i=c.difference(new u(this)),j=new u(g.x/(e*e),g.y/(f*f)),k=new u(i.x/(e*e),i.y/(f*f)),l=g.dot(j),m=g.dot(k),n=i.dot(k)-1,o=m*m-l*n;if(o<0)return null;if(o>0){var p=h(o),q=(-m-p)/l,r=(-m+p)/l;if((q<0||1<q)&&(r<0||1<r))return null;0<=q&&q<=1&&b.push(c.lerp(d,q)),0<=r&&r<=1&&b.push(c.lerp(d,r))}else{var s=-m/l;if(!(0<=s&&s<=1))return null;b.push(c.lerp(d,s))}return b},intersectionWithLineFromCenterToPoint:function(a,b){a=new u(a),b&&a.rotate(new u(this.x,this.y),b);var c,d=a.x-this.x,e=a.y-this.y;if(0===d)return c=this.bbox().pointNearestToPoint(a),b?c.rotate(new u(this.x,this.y),-b):c;var f=e/d,g=f*f,i=this.a*this.a,j=this.b*this.b,k=h(1/(1/i+g/j));k=d<0?-k:k;var l=f*k;return c=new u(this.x+k,this.y+l),b?c.rotate(new u(this.x,this.y),-b):c},toString:function(){return new u(this.x,this.y).toString()+" "+this.a+" "+this.b}};var s=a.Line=function(a,b){return this instanceof s?a instanceof s?new s(a.start,a.end):(this.start=new u(a),void(this.end=new u(b))):new s(a,b)};s.prototype={bbox:function(){var a=i(this.start.x,this.end.x),b=i(this.start.y,this.end.y),c=j(this.start.x,this.end.x),d=j(this.start.y,this.end.y);return new v(a,b,c-a,d-b)},bearing:function(){var a=A(this.start.y),b=A(this.end.y),c=this.start.x,d=this.end.x,e=A(d-c),h=g(e)*f(b),i=f(a)*g(b)-g(a)*f(b)*f(e),j=z(k(h,i)),l=["NE","E","SE","S","SW","W","NW","N"],m=j-22.5;return m<0&&(m+=360),m=parseInt(m/45),l[m]},clone:function(){return new s(this.start,this.end)},closestPoint:function(a){return this.pointAt(this.closestPointNormalizedLength(a))},closestPointLength:function(a){return this.closestPointNormalizedLength(a)*this.length()},closestPointNormalizedLength:function(a){var b=this.vector().dot(new s(this.start,a).vector()),c=i(1,j(0,b/this.squaredLength()));return c!==c?0:c},closestPointTangent:function(a){return this.tangentAt(this.closestPointNormalizedLength(a))},equals:function(a){return!!a&&this.start.x===a.start.x&&this.start.y===a.start.y&&this.end.x===a.end.x&&this.end.y===a.end.y},intersectionWithLine:function(a){var b=new u(this.end.x-this.start.x,this.end.y-this.start.y),c=new u(a.end.x-a.start.x,a.end.y-a.start.y),d=b.x*c.y-b.y*c.x,e=new u(a.start.x-this.start.x,a.start.y-this.start.y),f=e.x*c.y-e.y*c.x,g=e.x*b.y-e.y*b.x;if(0===d||f*d<0||g*d<0)return null;if(d>0){if(f>d||g>d)return null}else if(f<d||g<d)return null;return[new u(this.start.x+f*b.x/d,this.start.y+f*b.y/d)]},intersect:function(a,b){if(a instanceof s||a instanceof v||a instanceof w||a instanceof r||a instanceof t){var c=a.intersectionWithLine(this,b);return c&&a instanceof s&&(c=c[0]),c}return null},isDifferentiable:function(){return!this.start.equals(this.end)},length:function(){return h(this.squaredLength())},midpoint:function(){return new u((this.start.x+this.end.x)/2,(this.start.y+this.end.y)/2)},pointAt:function(a){var b=this.start,c=this.end;return a<=0?b.clone():a>=1?c.clone():b.lerp(c,a)},pointAtLength:function(a){var b=this.start,c=this.end,d=!0;a<0&&(d=!1,a=-a);var e=this.length();return a>=e?d?c.clone():b.clone():this.pointAt((d?a:e-a)/e)},pointOffset:function(b){b=new a.Point(b);var c=this.start,d=this.end,e=(d.x-c.x)*(b.y-c.y)-(d.y-c.y)*(b.x-c.x);return e/this.length()},rotate:function(a,b){return this.start.rotate(a,b),this.end.rotate(a,b),this},round:function(a){var b=p(10,a||0);return this.start.x=l(this.start.x*b)/b,this.start.y=l(this.start.y*b)/b,this.end.x=l(this.end.x*b)/b,this.end.y=l(this.end.y*b)/b,this},scale:function(a,b,c){return this.start.scale(a,b,c),this.end.scale(a,b,c),this},setLength:function(a){var b=this.length();if(!b)return this;var c=a/b;return this.scale(c,c,this.start)},squaredLength:function(){var a=this.start.x,b=this.start.y,c=this.end.x,d=this.end.y;return(a-=c)*a+(b-=d)*b},tangentAt:function(a){if(!this.isDifferentiable())return null;var b=this.start,c=this.end,d=this.pointAt(a),e=new s(b,c);return e.translate(d.x-b.x,d.y-b.y),e},tangentAtLength:function(a){if(!this.isDifferentiable())return null;var b=this.start,c=this.end,d=this.pointAtLength(a),e=new s(b,c);return e.translate(d.x-b.x,d.y-b.y),e},translate:function(a,b){return this.start.translate(a,b),this.end.translate(a,b),this},vector:function(){return new u(this.end.x-this.start.x,this.end.y-this.start.y)},toString:function(){return this.start.toString()+" "+this.end.toString()}},s.prototype.intersection=s.prototype.intersect;var t=a.Path=function(a){if(!(this instanceof t))return new t(a);if("string"==typeof a)return new t.parse(a);this.segments=[];var b,c;if(a){if(Array.isArray(a)&&0!==a.length)if(c=a.length,a[0].isSegment)for(b=0;b<c;b++){var d=a[b];this.appendSegment(d)}else{var e=null;for(b=0;b<c;b++){var f=a[b];if(!(f instanceof s||f instanceof q))throw new Error("Cannot construct a path segment from the provided object.");0===b&&this.appendSegment(t.createSegment("M",f.start)),e&&!e.end.equals(f.start)&&this.appendSegment(t.createSegment("M",f.start)),f instanceof s?this.appendSegment(t.createSegment("L",f.end)):f instanceof q&&this.appendSegment(t.createSegment("C",f.controlPoint1,f.controlPoint2,f.end)),e=f}}else if(a.isSegment)this.appendSegment(a);else if(a instanceof s)this.appendSegment(t.createSegment("M",a.start)),this.appendSegment(t.createSegment("L",a.end));else if(a instanceof q)this.appendSegment(t.createSegment("M",a.start)),this.appendSegment(t.createSegment("C",a.controlPoint1,a.controlPoint2,a.end));else if(a instanceof w&&a.points&&0!==a.points.length)for(c=a.points.length,b=0;b<c;b++){var g=a.points[b];0===b?this.appendSegment(t.createSegment("M",g)):this.appendSegment(t.createSegment("L",g))}}else;};t.parse=function(a){if(!a)return new t;for(var b=new t,c=/(?:[a-zA-Z] *)(?:(?:-?\d+(?:\.\d+)? *,? *)|(?:-?\.\d+ *,? *))+|(?:[a-zA-Z] *)(?! |\d|-|\.)/g,d=a.match(c),e=d.length,f=0;f<e;f++){var g=d[f],h=/(?:[a-zA-Z])|(?:(?:-?\d+(?:\.\d+)?))|(?:(?:-?\.\d+))/g,i=g.match(h),j=t.createSegment.apply(this,i);b.appendSegment(j)}return b},t.createSegment=function(a){if(!a)throw new Error("Type must be provided.");var c=t.segmentTypes[a];if(!c)throw new Error(a+" is not a recognized path segment type.");for(var d=[],e=arguments.length,f=1;f<e;f++)d.push(arguments[f]);return b(c,d)},t.prototype={appendSegment:function(a){var b,c=this.segments,d=c.length,e=0!==d?c[d-1]:null,f=null;if(Array.isArray(a)){if(!a[0].isSegment)throw new Error("Segments required.");for(var g=a.length,h=0;h<g;h++){var i=a[h];b=this.prepareSegment(i,e,f),c.push(b),e=b}}else{if(!a||!a.isSegment)throw new Error("Segment required.");b=this.prepareSegment(a,e,f),c.push(b)}},bbox:function(){var a=this.segments,b=a.length;if(0===b)return null;for(var c,d=0;d<b;d++){var e=a[d];if(e.isVisible){var f=e.bbox();c=c?c.union(f):f}}if(c)return c;var g=a[b-1];return new v(g.end.x,g.end.y,0,0)},clone:function(){for(var a=this.segments,b=a.length,c=new t,d=0;d<b;d++){var e=a[d].clone();c.appendSegment(e)}return c},closestPoint:function(a,b){var c=this.closestPointT(a,b);return c?this.pointAtT(c):null},closestPointLength:function(a,b){b=b||{};var c=void 0===b.precision?this.PRECISION:b.precision,d=void 0===b.segmentSubdivisions?this.getSegmentSubdivisions({precision:c}):b.segmentSubdivisions,e={precision:c,segmentSubdivisions:d},f=this.closestPointT(a,e);return f?this.lengthAtT(f,e):0},closestPointNormalizedLength:function(a,b){b=b||{};var c=void 0===b.precision?this.PRECISION:b.precision,d=void 0===b.segmentSubdivisions?this.getSegmentSubdivisions({precision:c}):b.segmentSubdivisions,e={precision:c,segmentSubdivisions:d},f=this.closestPointLength(a,e);if(0===f)return 0;var g=this.length(e);return 0===g?0:f/g},closestPointT:function(a,b){var c=this.segments,d=c.length;if(0===d)return null;b=b||{};for(var e,f=void 0===b.precision?this.PRECISION:b.precision,g=void 0===b.segmentSubdivisions?this.getSegmentSubdivisions({precision:f}):b.segmentSubdivisions,h=1/0,i=0;i<d;i++){var j=c[i],k=g[i];if(j.isVisible){var l=j.closestPointT(a,{precision:f,subdivisions:k}),m=j.pointAtT(l),n=new s(m,a).squaredLength();n<h&&(e={segmentIndex:i,value:l},h=n)}}return e?e:{segmentIndex:d-1,value:1}},closestPointTangent:function(a,b){var c=this.segments,d=c.length;if(0===d)return null;b=b||{};for(var e,f=void 0===b.precision?this.PRECISION:b.precision,g=void 0===b.segmentSubdivisions?this.getSegmentSubdivisions({precision:f}):b.segmentSubdivisions,h=1/0,i=0;i<d;i++){var j=c[i],k=g[i];if(j.isDifferentiable()){var l=j.closestPointT(a,{precision:f,subdivisions:k}),m=j.pointAtT(l),n=new s(m,a).squaredLength();n<h&&(e=j.tangentAtT(l),h=n)}}return e?e:null},equals:function(a){if(!a)return!1;var b=this.segments,c=a.segments,d=b.length;if(c.length!==d)return!1;for(var e=0;e<d;e++){var f=b[e],g=c[e];if(f.type!==g.type||!f.equals(g))return!1}return!0},getSegment:function(a){var b=this.segments,c=b.length;if(0===!c)throw new Error("Path has no segments.");if(a<0&&(a=c+a),a>=c||a<0)throw new Error("Index out of range.");return b[a]},getSegmentSubdivisions:function(a){var b=this.segments,c=b.length;a=a||{};for(var d=void 0===a.precision?this.PRECISION:a.precision,e=[],f=0;f<c;f++){var g=b[f],h=g.getSubdivisions({precision:d});e.push(h)}return e},insertSegment:function(a,b){var c=this.segments,d=c.length;if(a<0&&(a=d+a+1),a>d||a<0)throw new Error("Index out of range.");var e,f=null,g=null;if(0!==d&&(a>=1?(f=c[a-1],g=f.nextSegment):g=c[0]),Array.isArray(b)){if(!b[0].isSegment)throw new Error("Segments required.");for(var h=b.length,i=0;i<h;i++){var j=b[i];e=this.prepareSegment(j,f,g),c.splice(a+i,0,e),f=e}}else{if(!b||!b.isSegment)throw new Error("Segment required.");e=this.prepareSegment(b,f,g),c.splice(a,0,e)}},isDifferentiable:function(){for(var a=this.segments,b=a.length,c=0;c<b;c++){var d=a[c];if(d.isDifferentiable())return!0}return!1},isValid:function(){var a=this.segments,b=0===a.length||"M"===a[0].type;return b},length:function(a){var b=this.segments,c=b.length;if(0===c)return 0;a=a||{};for(var d=void 0===a.precision?this.PRECISION:a.precision,e=void 0===a.segmentSubdivisions?this.getSegmentSubdivisions({precision:d}):a.segmentSubdivisions,f=0,g=0;g<c;g++){var h=b[g],i=e[g];f+=h.length({subdivisions:i})}return f},lengthAtT:function(a,b){var c=this.segments,d=c.length;if(0===d)return 0;var e=a.segmentIndex;if(e<0)return 0;var f=a.value;e>=d?(e=d-1,f=1):f<0?f=0:f>1&&(f=1),b=b||{};for(var g,h=void 0===b.precision?this.PRECISION:b.precision,i=void 0===b.segmentSubdivisions?this.getSegmentSubdivisions({precision:h}):b.segmentSubdivisions,j=0,k=0;k<e;k++){var l=c[k];g=i[k],j+=l.length({precisison:h,subdivisions:g})}return l=c[e],g=i[e],j+=l.lengthAtT(f,{precisison:h,subdivisions:g})},pointAt:function(a,b){var c=this.segments,d=c.length;if(0===d)return null;if(a<=0)return this.start.clone();if(a>=1)return this.end.clone();b=b||{};var e=void 0===b.precision?this.PRECISION:b.precision,f=void 0===b.segmentSubdivisions?this.getSegmentSubdivisions({precision:e}):b.segmentSubdivisions,g={precision:e,segmentSubdivisions:f},h=this.length(g),i=h*a;return this.pointAtLength(i,g)},pointAtLength:function(a,b){var c=this.segments,d=c.length;if(0===d)return null;if(0===a)return this.start.clone();var e=!0;a<0&&(e=!1,a=-a),b=b||{};for(var f,g=void 0===b.precision?this.PRECISION:b.precision,h=void 0===b.segmentSubdivisions?this.getSegmentSubdivisions({precision:g}):b.segmentSubdivisions,i=0,j=e?0:d-1;e?j<d:j>=0;e?j++:j--){var k=c[j],l=h[j],m=k.length({precision:g,subdivisions:l});if(k.isVisible){if(a<=i+m)return k.pointAtLength((e?1:-1)*(a-i),{precision:g,subdivisions:l});f=k}i+=m}if(f)return e?f.end:f.start;var n=c[d-1];return n.end.clone()},pointAtT:function(a){var b=this.segments,c=b.length;if(0===c)return null;var d=a.segmentIndex;if(d<0)return b[0].pointAtT(0);if(d>=c)return b[c-1].pointAtT(1);var e=a.value;return e<0?e=0:e>1&&(e=1),b[d].pointAtT(e)},prepareSegment:function(a,b,c){a.previousSegment=b,a.nextSegment=c,b&&(b.nextSegment=a),c&&(c.previousSegment=a);var d=a;return a.isSubpathStart&&(a.subpathStartSegment=a,d=c),d&&this.updateSubpathStartSegment(d),a},PRECISION:3,removeSegment:function(a){var b=this.segments,c=b.length;if(0===c)throw new Error("Path has no segments.");if(a<0&&(a=c+a),a>=c||a<0)throw new Error("Index out of range.");var d=b.splice(a,1)[0],e=d.previousSegment,f=d.nextSegment;e&&(e.nextSegment=f),f&&(f.previousSegment=e),d.isSubpathStart&&f&&this.updateSubpathStartSegment(f)},replaceSegment:function(a,b){var c=this.segments,d=c.length;if(0===d)throw new Error("Path has no segments.");if(a<0&&(a=d+a),a>=d||a<0)throw new Error("Index out of range.");var e,f=c[a],g=f.previousSegment,h=f.nextSegment,i=f.isSubpathStart;if(Array.isArray(b)){if(!b[0].isSegment)throw new Error("Segments required.");c.splice(a,1);for(var j=b.length,k=0;k<j;k++){var l=b[k];e=this.prepareSegment(l,g,h),c.splice(a+k,0,e),g=e,i&&e.isSubpathStart&&(i=!1)}}else{if(!b||!b.isSegment)throw new Error("Segment required.");e=this.prepareSegment(b,g,h),c.splice(a,1,e),i&&e.isSubpathStart&&(i=!1)}i&&h&&this.updateSubpathStartSegment(h)},scale:function(a,b,c){for(var d=this.segments,e=d.length,f=0;f<e;f++){var g=d[f];g.scale(a,b,c)}return this},segmentAt:function(a,b){var c=this.segmentIndexAt(a,b);return c?this.getSegment(c):null},segmentAtLength:function(a,b){var c=this.segmentIndexAtLength(a,b);return c?this.getSegment(c):null},segmentIndexAt:function(a,b){var c=this.segments,d=c.length;if(0===d)return null;a<0&&(a=0),a>1&&(a=1),b=b||{};var e=void 0===b.precision?this.PRECISION:b.precision,f=void 0===b.segmentSubdivisions?this.getSegmentSubdivisions({precision:e}):b.segmentSubdivisions,g={precision:e,segmentSubdivisions:f},h=this.length(g),i=h*a;return this.segmentIndexAtLength(i,g)},toPoints:function(a){var b=this.segments,c=b.length;if(0===c)return null;a=a||{};for(var d=void 0===a.precision?this.PRECISION:a.precision,e=void 0===a.segmentSubdivisions?this.getSegmentSubdivisions({precision:d}):a.segmentSubdivisions,f=[],g=[],h=0;h<c;h++){var i=b[h];if(i.isVisible){var j=e[h];if(j.length>0){var k=j.map(function(a){return a.start});Array.prototype.push.apply(g,k)}else g.push(i.start)}else g.length>0&&(g.push(b[h-1].end),f.push(g),g=[])}return g.length>0&&(g.push(this.end),f.push(g)),f},toPolylines:function(a){var b=[],c=this.toPoints(a);if(!c)return null;for(var d=0,e=c.length;d<e;d++)b.push(new w(c[d]));return b},intersectionWithLine:function(a,b){var c=null,d=this.toPolylines(b);if(!d)return null;for(var e=0,f=d.length;e<f;e++){var g=d[e],h=a.intersect(g);h&&(c||(c=[]),Array.isArray(h)?Array.prototype.push.apply(c,h):c.push(h))}return c},segmentIndexAtLength:function(a,b){var c=this.segments,d=c.length;if(0===d)return null;var e=!0;a<0&&(e=!1,a=-a),b=b||{};for(var f=void 0===b.precision?this.PRECISION:b.precision,g=void 0===b.segmentSubdivisions?this.getSegmentSubdivisions({precision:f}):b.segmentSubdivisions,h=null,i=0,j=e?0:d-1;e?j<d:j>=0;e?j++:j--){var k=c[j],l=g[j],m=k.length({precision:f,subdivisions:l});if(k.isVisible){if(a<=i+m)return j;h=j}i+=m}return h},tangentAt:function(a,b){var c=this.segments,d=c.length;if(0===d)return null;a<0&&(a=0),a>1&&(a=1),b=b||{};var e=void 0===b.precision?this.PRECISION:b.precision,f=void 0===b.segmentSubdivisions?this.getSegmentSubdivisions({precision:e}):b.segmentSubdivisions,g={precision:e,segmentSubdivisions:f},h=this.length(g),i=h*a;return this.tangentAtLength(i,g)},tangentAtLength:function(a,b){var c=this.segments,d=c.length;if(0===d)return null;var e=!0;a<0&&(e=!1,a=-a),b=b||{};for(var f,g=void 0===b.precision?this.PRECISION:b.precision,h=void 0===b.segmentSubdivisions?this.getSegmentSubdivisions({precision:g}):b.segmentSubdivisions,i=0,j=e?0:d-1;e?j<d:j>=0;e?j++:j--){var k=c[j],l=h[j],m=k.length({precision:g,subdivisions:l});if(k.isDifferentiable()){if(a<=i+m)return k.tangentAtLength((e?1:-1)*(a-i),{precision:g,subdivisions:l});f=k}i+=m}if(f){var n=e?1:0;return f.tangentAtT(n)}return null},tangentAtT:function(a){var b=this.segments,c=b.length;if(0===c)return null;var d=a.segmentIndex;if(d<0)return b[0].tangentAtT(0);if(d>=c)return b[c-1].tangentAtT(1);var e=a.value;return e<0?e=0:e>1&&(e=1),b[d].tangentAtT(e)},translate:function(a,b){for(var c=this.segments,d=c.length,e=0;e<d;e++){var f=c[e];f.translate(a,b)}return this},updateSubpathStartSegment:function(a){for(var b=a.previousSegment;a&&!a.isSubpathStart;)b?a.subpathStartSegment=b.subpathStartSegment:a.subpathStartSegment=null,b=a,a=a.nextSegment},serialize:function(){if(!this.isValid())throw new Error("Invalid path segments.");return this.toString()},toString:function(){for(var a=this.segments,b=a.length,c="",d=0;d<b;d++){var e=a[d];c+=e.serialize()+" "}return c.trim()}},Object.defineProperty(t.prototype,"start",{configurable:!0,enumerable:!0,get:function(){var a=this.segments,b=a.length;if(0===b)return null;for(var c=0;c<b;c++){var d=a[c];if(d.isVisible)return d.start}return a[b-1].end}}),Object.defineProperty(t.prototype,"end",{configurable:!0,enumerable:!0,get:function(){var a=this.segments,b=a.length;if(0===b)return null;for(var c=b-1;c>=0;c--){var d=a[c];if(d.isVisible)return d.end}return a[b-1].end}});var u=a.Point=function(a,b){if(!(this instanceof u))return new u(a,b);if("string"==typeof a){var c=a.split(a.indexOf("@")===-1?" ":"@");a=parseFloat(c[0]),b=parseFloat(c[1])}else Object(a)===a&&(b=a.y,a=a.x);this.x=void 0===a?0:a,this.y=void 0===b?0:b};u.fromPolar=function(a,b,c){c=c&&new u(c)||new u(0,0);var d=e(a*f(b)),h=e(a*g(b)),i=x(z(b));return i<90?h=-h:i<180?(d=-d,h=-h):i<270&&(d=-d),new u(c.x+d,c.y+h)},u.random=function(a,b,c,d){return new u(m(o()*(b-a+1)+a),m(o()*(d-c+1)+c))},u.prototype={adhereToRect:function(a){return a.containsPoint(this)?this:(this.x=i(j(this.x,a.x),a.x+a.width),this.y=i(j(this.y,a.y),a.y+a.height),this)},bearing:function(a){return new s(this,a).bearing()},changeInAngle:function(a,b,c){return this.clone().offset(-a,-b).theta(c)-this.theta(c)},clone:function(){return new u(this)},difference:function(a,b){return Object(a)===a&&(b=a.y,a=a.x),new u(this.x-(a||0),this.y-(b||0))},distance:function(a){return new s(this,a).length()},squaredDistance:function(a){return new s(this,a).squaredLength()},equals:function(a){return!!a&&this.x===a.x&&this.y===a.y},magnitude:function(){return h(this.x*this.x+this.y*this.y)||.01},manhattanDistance:function(a){return e(a.x-this.x)+e(a.y-this.y)},move:function(a,b){var c=A(new u(a).theta(this)),d=this.offset(f(c)*b,-g(c)*b);return d},normalize:function(a){var b=(a||1)/this.magnitude();return this.scale(b,b)},offset:function(a,b){return Object(a)===a&&(b=a.y,a=a.x),this.x+=a||0,this.y+=b||0,this},reflection:function(a){return new u(a).move(this,this.distance(a))},rotate:function(b,c){b=b||new a.Point(0,0),c=A(x(-c));var d=f(c),e=g(c),h=d*(this.x-b.x)-e*(this.y-b.y)+b.x,i=e*(this.x-b.x)+d*(this.y-b.y)+b.y;return this.x=h,this.y=i,this},round:function(a){var b=p(10,a||0);return this.x=l(this.x*b)/b,this.y=l(this.y*b)/b,this},scale:function(a,b,c){return c=c&&new u(c)||new u(0,0),this.x=c.x+a*(this.x-c.x),this.y=c.y+b*(this.y-c.y),this},snapToGrid:function(a,b){return this.x=y(this.x,a),this.y=y(this.y,b||a),this},theta:function(a){a=new u(a);var b=-(a.y-this.y),c=a.x-this.x,d=k(b,c);return d<0&&(d=2*n+d),180*d/n},angleBetween:function(a,b){var c=this.equals(a)||this.equals(b)?NaN:this.theta(b)-this.theta(a);return c<0&&(c+=360),c},vectorAngle:function(a){var b=new u(0,0);return b.angleBetween(this,a)},toJSON:function(){return{x:this.x,y:this.y}},toPolar:function(a){a=a&&new u(a)||new u(0,0);var b=this.x,c=this.y;return this.x=h((b-a.x)*(b-a.x)+(c-a.y)*(c-a.y)),this.y=A(a.theta(new u(b,c))),this},toString:function(){return this.x+"@"+this.y},update:function(a,b){return this.x=a||0,this.y=b||0,this},dot:function(a){return a?this.x*a.x+this.y*a.y:NaN},cross:function(a,b){return a&&b?(b.x-this.x)*(a.y-this.y)-(b.y-this.y)*(a.x-this.x):NaN},lerp:function(a,b){var c=this.x,d=this.y;return new u((1-b)*c+b*a.x,(1-b)*d+b*a.y)}},u.prototype.translate=u.prototype.offset;var v=a.Rect=function(a,b,c,d){return this instanceof v?(Object(a)===a&&(b=a.y,c=a.width,d=a.height,a=a.x),this.x=void 0===a?0:a,this.y=void 0===b?0:b,this.width=void 0===c?0:c,void(this.height=void 0===d?0:d)):new v(a,b,c,d)};v.fromEllipse=function(a){return a=new r(a),new v(a.x-a.a,a.y-a.b,2*a.a,2*a.b)},v.prototype={bbox:function(a){if(!a)return this.clone();var b=A(a||0),c=e(g(b)),d=e(f(b)),h=this.width*d+this.height*c,i=this.width*c+this.height*d;return new v(this.x+(this.width-h)/2,this.y+(this.height-i)/2,h,i)},bottomLeft:function(){return new u(this.x,this.y+this.height)},bottomLine:function(){return new s(this.bottomLeft(),this.bottomRight())},bottomMiddle:function(){return new u(this.x+this.width/2,this.y+this.height);
},center:function(){return new u(this.x+this.width/2,this.y+this.height/2)},clone:function(){return new v(this)},containsPoint:function(a){return a=new u(a),a.x>=this.x&&a.x<=this.x+this.width&&a.y>=this.y&&a.y<=this.y+this.height},containsRect:function(a){var b=new v(this).normalize(),c=new v(a).normalize(),d=b.width,e=b.height,f=c.width,g=c.height;if(!(d&&e&&f&&g))return!1;var h=b.x,i=b.y,j=c.x,k=c.y;return f+=j,d+=h,g+=k,e+=i,h<=j&&f<=d&&i<=k&&g<=e},corner:function(){return new u(this.x+this.width,this.y+this.height)},equals:function(a){var b=new v(this).normalize(),c=new v(a).normalize();return b.x===c.x&&b.y===c.y&&b.width===c.width&&b.height===c.height},intersect:function(a){var b=this.origin(),c=this.corner(),d=a.origin(),e=a.corner();if(e.x<=b.x||e.y<=b.y||d.x>=c.x||d.y>=c.y)return null;var f=j(b.x,d.x),g=j(b.y,d.y);return new v(f,g,i(c.x,e.x)-f,i(c.y,e.y)-g)},intersectionWithLine:function(a){var b,c,d=this,e=[d.topLine(),d.rightLine(),d.bottomLine(),d.leftLine()],f=[],g=[],h=e.length;for(c=0;c<h;c++)b=a.intersect(e[c]),null!==b&&g.indexOf(b.toString())<0&&(f.push(b),g.push(b.toString()));return f.length>0?f:null},intersectionWithLineFromCenterToPoint:function(a,b){a=new u(a);var c,d=new u(this.x+this.width/2,this.y+this.height/2);b&&a.rotate(d,b);for(var e=[this.topLine(),this.rightLine(),this.bottomLine(),this.leftLine()],f=new s(d,a),g=e.length-1;g>=0;--g){var h=e[g].intersection(f);if(null!==h){c=h;break}}return c&&b&&c.rotate(d,-b),c},leftLine:function(){return new s(this.topLeft(),this.bottomLeft())},leftMiddle:function(){return new u(this.x,this.y+this.height/2)},moveAndExpand:function(a){return this.x+=a.x||0,this.y+=a.y||0,this.width+=a.width||0,this.height+=a.height||0,this},offset:function(a,b){return u.prototype.offset.call(this,a,b)},inflate:function(a,b){return void 0===a&&(a=0),void 0===b&&(b=a),this.x-=a,this.y-=b,this.width+=2*a,this.height+=2*b,this},normalize:function(){var a=this.x,b=this.y,c=this.width,d=this.height;return this.width<0&&(a=this.x+this.width,c=-this.width),this.height<0&&(b=this.y+this.height,d=-this.height),this.x=a,this.y=b,this.width=c,this.height=d,this},origin:function(){return new u(this.x,this.y)},pointNearestToPoint:function(a){if(a=new u(a),this.containsPoint(a)){var b=this.sideNearestToPoint(a);switch(b){case"right":return new u(this.x+this.width,a.y);case"left":return new u(this.x,a.y);case"bottom":return new u(a.x,this.y+this.height);case"top":return new u(a.x,this.y)}}return a.adhereToRect(this)},rightLine:function(){return new s(this.topRight(),this.bottomRight())},rightMiddle:function(){return new u(this.x+this.width,this.y+this.height/2)},round:function(a){var b=p(10,a||0);return this.x=l(this.x*b)/b,this.y=l(this.y*b)/b,this.width=l(this.width*b)/b,this.height=l(this.height*b)/b,this},scale:function(a,b,c){return c=this.origin().scale(a,b,c),this.x=c.x,this.y=c.y,this.width*=a,this.height*=b,this},maxRectScaleToFit:function(a,b){a=new v(a),b||(b=a.center());var c,d,e,f,g,h,j,k,l=b.x,m=b.y;c=d=e=f=g=h=j=k=1/0;var n=a.topLeft();n.x<l&&(c=(this.x-l)/(n.x-l)),n.y<m&&(g=(this.y-m)/(n.y-m));var o=a.bottomRight();o.x>l&&(d=(this.x+this.width-l)/(o.x-l)),o.y>m&&(h=(this.y+this.height-m)/(o.y-m));var p=a.topRight();p.x>l&&(e=(this.x+this.width-l)/(p.x-l)),p.y<m&&(j=(this.y-m)/(p.y-m));var q=a.bottomLeft();return q.x<l&&(f=(this.x-l)/(q.x-l)),q.y>m&&(k=(this.y+this.height-m)/(q.y-m)),{sx:i(c,d,e,f),sy:i(g,h,j,k)}},maxRectUniformScaleToFit:function(a,b){var c=this.maxRectScaleToFit(a,b);return i(c.sx,c.sy)},sideNearestToPoint:function(a){a=new u(a);var b=a.x-this.x,c=this.x+this.width-a.x,d=a.y-this.y,e=this.y+this.height-a.y,f=b,g="left";return c<f&&(f=c,g="right"),d<f&&(f=d,g="top"),e<f&&(f=e,g="bottom"),g},snapToGrid:function(a,b){var c=this.origin().snapToGrid(a,b),d=this.corner().snapToGrid(a,b);return this.x=c.x,this.y=c.y,this.width=d.x-c.x,this.height=d.y-c.y,this},topLine:function(){return new s(this.topLeft(),this.topRight())},topMiddle:function(){return new u(this.x+this.width/2,this.y)},topRight:function(){return new u(this.x+this.width,this.y)},toJSON:function(){return{x:this.x,y:this.y,width:this.width,height:this.height}},toString:function(){return this.origin().toString()+" "+this.corner().toString()},union:function(a){a=new v(a);var b=this.origin(),c=this.corner(),d=a.origin(),e=a.corner(),f=i(b.x,d.x),g=i(b.y,d.y),h=j(c.x,e.x),k=j(c.y,e.y);return new v(f,g,h-f,k-g)}},v.prototype.bottomRight=v.prototype.corner,v.prototype.topLeft=v.prototype.origin,v.prototype.translate=v.prototype.offset;var w=a.Polyline=function(a){return this instanceof w?"string"==typeof a?new w.parse(a):void(this.points=Array.isArray(a)?a.map(u):[]):new w(a)};w.parse=function(a){if(a=a.trim(),""===a)return new w;for(var b=[],c=a.split(/\s*,\s*|\s+/),d=c.length,e=0;e<d;e+=2)b.push({x:+c[e],y:+c[e+1]});return new w(b)},w.prototype={bbox:function(){var a=1/0,b=-(1/0),c=1/0,d=-(1/0),e=this.points,f=e.length;if(0===f)return null;for(var g=0;g<f;g++){var h=e[g],i=h.x,j=h.y;i<a&&(a=i),i>b&&(b=i),j<c&&(c=j),j>d&&(d=j)}return new v(a,c,b-a,d-c)},clone:function(){var a=this.points,b=a.length;if(0===b)return new w;for(var c=[],d=0;d<b;d++){var e=a[d].clone();c.push(e)}return new w(c)},closestPoint:function(a){var b=this.closestPointLength(a);return this.pointAtLength(b)},closestPointLength:function(a){var b=this.points,c=b.length;if(0===c)return 0;if(1===c)return 0;for(var d,e=1/0,f=0,g=c-1,h=0;h<g;h++){var i=new s(b[h],b[h+1]),j=i.length(),k=i.closestPointNormalizedLength(a),l=i.pointAt(k),m=l.squaredDistance(a);m<e&&(e=m,d=f+k*j),f+=j}return d},closestPointNormalizedLength:function(a){var b=this.closestPointLength(a);if(0===b)return 0;var c=this.length();return 0===c?0:b/c},closestPointTangent:function(a){var b=this.closestPointLength(a);return this.tangentAtLength(b)},convexHull:function(){var a,b,c=this.points,d=c.length;if(0===d)return new w;var f;for(a=0;a<d;a++)void 0===f?f=c[a]:c[a].y<f.y?f=c[a]:c[a].y===f.y&&c[a].x>f.x&&(f=c[a]);var g=[];for(a=0;a<d;a++){var h=f.theta(c[a]);0===h&&(h=360);var i=[c[a],a,h];g.push(i)}if(g.sort(function(a,b){var c=a[2]-b[2];return 0===c&&(c=b[1]-a[1]),c}),g.length>2){var j=g[g.length-1];g.unshift(j)}for(var k,l,m,n,o,p,q={},r=[];0!==g.length;)if(k=g.pop(),l=k[0],!q.hasOwnProperty(k[0]+"@@"+k[1]))for(var s=!1;!s;)if(r.length<2)r.push(k),s=!0;else{m=r.pop(),n=m[0],o=r.pop(),p=o[0];var t=p.cross(n,l);if(t<0)r.push(o),r.push(m),r.push(k),s=!0;else if(0===t){var u=1e-10,v=n.angleBetween(p,l);e(v-180)<u?(q[m[0]+"@@"+m[1]]=n,r.push(o)):n.equals(l)||p.equals(n)?(q[m[0]+"@@"+m[1]]=n,r.push(o)):e((v+1)%360-1)<u&&(r.push(o),g.push(m))}else q[m[0]+"@@"+m[1]]=n,r.push(o)}r.length>2&&r.pop();var x,y=-1;for(b=r.length,a=0;a<b;a++){var z=r[a][1];(void 0===x||z<x)&&(x=z,y=a)}var A=[];if(y>0){var B=r.slice(y),C=r.slice(0,y);A=B.concat(C)}else A=r;var D=[];for(b=A.length,a=0;a<b;a++)D.push(A[a][0]);return new w(D)},equals:function(a){if(!a)return!1;var b=this.points,c=a.points,d=b.length;if(c.length!==d)return!1;for(var e=0;e<d;e++){var f=b[e],g=a.points[e];if(!f.equals(g))return!1}return!0},isDifferentiable:function(){var a=this.points,b=a.length;if(0===b)return!1;for(var c=b-1,d=0;d<c;d++){var e=a[d],f=a[d+1],g=new s(e,f);if(g.isDifferentiable())return!0}return!1},length:function(){var a=this.points,b=a.length;if(0===b)return 0;for(var c=0,d=b-1,e=0;e<d;e++)c+=a[e].distance(a[e+1]);return c},pointAt:function(a){var b=this.points,c=b.length;if(0===c)return null;if(1===c)return b[0].clone();if(a<=0)return b[0].clone();if(a>=1)return b[c-1].clone();var d=this.length(),e=d*a;return this.pointAtLength(e)},pointAtLength:function(a){var b=this.points,c=b.length;if(0===c)return null;if(1===c)return b[0].clone();var d=!0;a<0&&(d=!1,a=-a);for(var e=0,f=c-1,g=d?0:f-1;d?g<f:g>=0;d?g++:g--){var h=b[g],i=b[g+1],j=new s(h,i),k=h.distance(i);if(a<=e+k)return j.pointAtLength((d?1:-1)*(a-e));e+=k}var l=d?b[c-1]:b[0];return l.clone()},scale:function(a,b,c){var d=this.points,e=d.length;if(0===e)return this;for(var f=0;f<e;f++)d[f].scale(a,b,c);return this},tangentAt:function(a){var b=this.points,c=b.length;if(0===c)return null;if(1===c)return null;a<0&&(a=0),a>1&&(a=1);var d=this.length(),e=d*a;return this.tangentAtLength(e)},tangentAtLength:function(a){var b=this.points,c=b.length;if(0===c)return null;if(1===c)return null;var d=!0;a<0&&(d=!1,a=-a);for(var e,f=0,g=c-1,h=d?0:g-1;d?h<g:h>=0;d?h++:h--){var i=b[h],j=b[h+1],k=new s(i,j),l=i.distance(j);if(k.isDifferentiable()){if(a<=f+l)return k.tangentAtLength((d?1:-1)*(a-f));e=k}f+=l}if(e){var m=d?1:0;return e.tangentAt(m)}return null},intersectionWithLine:function(a){for(var b=new s(a),c=[],d=this.points,e=0,f=d.length-1;e<f;e++){var g=d[e],h=d[e+1],i=new s(g,h),j=b.intersectionWithLine(i);j&&c.push(j[0])}return c.length>0?c:null},translate:function(a,b){var c=this.points,d=c.length;if(0===d)return this;for(var e=0;e<d;e++)c[e].translate(a,b);return this},serialize:function(){var a=this.points,b=a.length;if(0===b)return"";for(var c="",d=0;d<b;d++){var e=a[d];c+=e.x+","+e.y+" "}return c.trim()},toString:function(){return this.points+""}},Object.defineProperty(w.prototype,"start",{configurable:!0,enumerable:!0,get:function(){var a=this.points,b=a.length;return 0===b?null:this.points[0]}}),Object.defineProperty(w.prototype,"end",{configurable:!0,enumerable:!0,get:function(){var a=this.points,b=a.length;return 0===b?null:this.points[b-1]}}),a.scale={linear:function(a,b,c){var d=a[1]-a[0],e=b[1]-b[0];return(c-a[0])/d*e+b[0]||0}};var x=a.normalizeAngle=function(a){return a%360+(a<0?360:0)},y=a.snapToGrid=function(a,b){return b*l(a/b)},z=a.toDeg=function(a){return 180*a/n%360},A=a.toRad=function(a,b){return b=b||!1,a=b?a:a%360,a*n/180};a.ellipse=a.Ellipse,a.line=a.Line,a.point=a.Point,a.rect=a.Rect;var B={closestPointT:function(a){if(this.closestPointNormalizedLength)return this.closestPointNormalizedLength(a);throw new Error("Neither closestPointT() nor closestPointNormalizedLength() function is implemented.")},isSegment:!0,isSubpathStart:!1,isVisible:!0,nextSegment:null,lengthAtT:function(a){if(a<=0)return 0;var b=this.length();return a>=1?b:b*a},pointAtT:function(a){if(this.pointAt)return this.pointAt(a);throw new Error("Neither pointAtT() nor pointAt() function is implemented.")},previousSegment:null,subpathStartSegment:null,tangentAtT:function(a){if(this.tangentAt)return this.tangentAt(a);throw new Error("Neither tangentAtT() nor tangentAt() function is implemented.")},bbox:function(){throw new Error("Declaration missing for virtual function.")},clone:function(){throw new Error("Declaration missing for virtual function.")},closestPoint:function(){throw new Error("Declaration missing for virtual function.")},closestPointLength:function(){throw new Error("Declaration missing for virtual function.")},closestPointNormalizedLength:function(){throw new Error("Declaration missing for virtual function.")},closestPointTangent:function(){throw new Error("Declaration missing for virtual function.")},equals:function(){throw new Error("Declaration missing for virtual function.")},getSubdivisions:function(){throw new Error("Declaration missing for virtual function.")},isDifferentiable:function(){throw new Error("Declaration missing for virtual function.")},length:function(){throw new Error("Declaration missing for virtual function.")},pointAt:function(){throw new Error("Declaration missing for virtual function.")},pointAtLength:function(){throw new Error("Declaration missing for virtual function.")},scale:function(){throw new Error("Declaration missing for virtual function.")},tangentAt:function(){throw new Error("Declaration missing for virtual function.")},tangentAtLength:function(){throw new Error("Declaration missing for virtual function.")},translate:function(){throw new Error("Declaration missing for virtual function.")},serialize:function(){throw new Error("Declaration missing for virtual function.")},toString:function(){throw new Error("Declaration missing for virtual function.")}},C=function(){for(var a=[],c=arguments.length,d=0;d<c;d++)a.push(arguments[d]);if(!(this instanceof C))return b(C,a);if(0===c)throw new Error("Lineto constructor expects 1 point or 2 coordinates (none provided).");var e;if("string"==typeof a[0]||"number"==typeof a[0]){if(2===c)return this.end=new u(+a[0],+a[1]),this;if(c<2)throw new Error("Lineto constructor expects 1 point or 2 coordinates ("+c+" coordinates provided).");var f;for(e=[],d=0;d<c;d+=2)f=a.slice(d,d+2),e.push(b(C,f));return e}if(1===c)return this.end=new u(a[0]),this;var g;for(e=[],d=0;d<c;d+=1)g=a[d],e.push(new C(g));return e},D={clone:function(){return new C(this.end)},getSubdivisions:function(){return[]},isDifferentiable:function(){return!!this.previousSegment&&!this.start.equals(this.end)},scale:function(a,b,c){return this.end.scale(a,b,c),this},translate:function(a,b){return this.end.translate(a,b),this},type:"L",serialize:function(){var a=this.end;return this.type+" "+a.x+" "+a.y},toString:function(){return this.type+" "+this.start+" "+this.end}};Object.defineProperty(D,"start",{configurable:!0,enumerable:!0,get:function(){if(!this.previousSegment)throw new Error("Missing previous segment. (This segment cannot be the first segment of a path; OR segment has not yet been added to a path.)");return this.previousSegment.end}}),C.prototype=c(B,s.prototype,D);var E=function(){for(var a=[],c=arguments.length,d=0;d<c;d++)a.push(arguments[d]);if(!(this instanceof E))return b(E,a);if(0===c)throw new Error("Curveto constructor expects 3 points or 6 coordinates (none provided).");var e;if("string"==typeof a[0]||"number"==typeof a[0]){if(6===c)return this.controlPoint1=new u(+a[0],+a[1]),this.controlPoint2=new u(+a[2],+a[3]),this.end=new u(+a[4],+a[5]),this;if(c<6)throw new Error("Curveto constructor expects 3 points or 6 coordinates ("+c+" coordinates provided).");var f;for(e=[],d=0;d<c;d+=6)f=a.slice(d,d+6),e.push(b(E,f));return e}if(3===c)return this.controlPoint1=new u(a[0]),this.controlPoint2=new u(a[1]),this.end=new u(a[2]),this;if(c<3)throw new Error("Curveto constructor expects 3 points or 6 coordinates ("+c+" points provided).");var g;for(e=[],d=0;d<c;d+=3)g=a.slice(d,d+3),e.push(b(E,g));return e},F={clone:function(){return new E(this.controlPoint1,this.controlPoint2,this.end)},isDifferentiable:function(){if(!this.previousSegment)return!1;var a=this.start,b=this.controlPoint1,c=this.controlPoint2,d=this.end;return!(a.equals(b)&&b.equals(c)&&c.equals(d))},scale:function(a,b,c){return this.controlPoint1.scale(a,b,c),this.controlPoint2.scale(a,b,c),this.end.scale(a,b,c),this},translate:function(a,b){return this.controlPoint1.translate(a,b),this.controlPoint2.translate(a,b),this.end.translate(a,b),this},type:"C",serialize:function(){var a=this.controlPoint1,b=this.controlPoint2,c=this.end;return this.type+" "+a.x+" "+a.y+" "+b.x+" "+b.y+" "+c.x+" "+c.y},toString:function(){return this.type+" "+this.start+" "+this.controlPoint1+" "+this.controlPoint2+" "+this.end}};Object.defineProperty(F,"start",{configurable:!0,enumerable:!0,get:function(){if(!this.previousSegment)throw new Error("Missing previous segment. (This segment cannot be the first segment of a path; OR segment has not yet been added to a path.)");return this.previousSegment.end}}),E.prototype=c(B,q.prototype,F);var G=function(){for(var a=[],c=arguments.length,d=0;d<c;d++)a.push(arguments[d]);if(!(this instanceof G))return b(G,a);if(0===c)throw new Error("Moveto constructor expects 1 point or 2 coordinates (none provided).");var e;if("string"==typeof a[0]||"number"==typeof a[0]){if(2===c)return this.end=new u(+a[0],+a[1]),this;if(c<2)throw new Error("Moveto constructor expects 1 point or 2 coordinates ("+c+" coordinates provided).");var f;for(e=[],d=0;d<c;d+=2)f=a.slice(d,d+2),0===d?e.push(b(G,f)):e.push(b(C,f));return e}if(1===c)return this.end=new u(a[0]),this;var g;for(e=[],d=0;d<c;d+=1)g=a[d],0===d?e.push(new G(g)):e.push(new C(g));return e},H={bbox:function(){return null},clone:function(){return new G(this.end)},closestPoint:function(){return this.end.clone()},closestPointNormalizedLength:function(){return 0},closestPointLength:function(){return 0},closestPointT:function(){return 1},closestPointTangent:function(){return null},equals:function(a){return this.end.equals(a.end)},getSubdivisions:function(){return[]},isDifferentiable:function(){return!1},isSubpathStart:!0,isVisible:!1,length:function(){return 0},lengthAtT:function(){return 0},pointAt:function(){return this.end.clone()},pointAtLength:function(){return this.end.clone()},pointAtT:function(){return this.end.clone()},scale:function(a,b,c){return this.end.scale(a,b,c),this},tangentAt:function(){return null},tangentAtLength:function(){return null},tangentAtT:function(){return null},translate:function(a,b){return this.end.translate(a,b),this},type:"M",serialize:function(){var a=this.end;return this.type+" "+a.x+" "+a.y},toString:function(){return this.type+" "+this.end}};Object.defineProperty(H,"start",{configurable:!0,enumerable:!0,get:function(){throw new Error("Illegal access. Moveto segments should not need a start property.")}}),G.prototype=c(B,H);var I=function(){for(var a=[],c=arguments.length,d=0;d<c;d++)a.push(arguments[d]);if(!(this instanceof I))return b(I,a);if(c>0)throw new Error("Closepath constructor expects no arguments.");return this},J={clone:function(){return new I},getSubdivisions:function(){return[]},isDifferentiable:function(){return!(!this.previousSegment||!this.subpathStartSegment)&&!this.start.equals(this.end)},scale:function(){return this},translate:function(){return this},type:"Z",serialize:function(){return this.type},toString:function(){return this.type+" "+this.start+" "+this.end}};Object.defineProperty(J,"start",{configurable:!0,enumerable:!0,get:function(){if(!this.previousSegment)throw new Error("Missing previous segment. (This segment cannot be the first segment of a path; OR segment has not yet been added to a path.)");return this.previousSegment.end}}),Object.defineProperty(J,"end",{configurable:!0,enumerable:!0,get:function(){if(!this.subpathStartSegment)throw new Error("Missing subpath start segment. (This segment needs a subpath start segment (e.g. Moveto); OR segment has not yet been added to a path.)");return this.subpathStartSegment.end}}),I.prototype=c(B,s.prototype,J);var K=t.segmentTypes={L:C,C:E,M:G,Z:I,z:I};t.regexSupportedData=new RegExp("^[\\s\\d"+Object.keys(K).join("")+",.]*$"),t.isDataSupported=function(a){return"string"==typeof a&&this.regexSupportedData.test(a)}}(g);
var V,Vectorizer;V=Vectorizer=function(){"use strict";function a(a,b){a||(a={});var c=q("textPath"),d=a.d;if(d&&void 0===a["xlink:href"]){var e=q("path").attr("d",d).appendTo(b.defs());c.attr("xlink:href","#"+e.id)}return q.isObject(a)&&c.attr(a),c.node}function b(a,b,c){c||(c={});for(var d=c.includeAnnotationIndices,e=c.eol,f=c.lineHeight,g=c.baseSize,h=0,i={},j=b.length-1,k=0;k<=j;k++){var l=b[k],m=null;if(q.isObject(l)){var n=l.attrs,o=q("tspan",n),p=o.node,r=l.t;e&&k===j&&(r+=e),p.textContent=r;var s=n.class;s&&o.addClass(s),d&&o.attr("annotations",l.annotations),m=parseFloat(n["font-size"]),void 0===m&&(m=g),m&&m>h&&(h=m)}else e&&k===j&&(l+=e),p=document.createTextNode(l||" "),g&&g>h&&(h=g);a.appendChild(p)}return h&&(i.maxFontSize=h),f?i.lineHeight=f:h&&(i.lineHeight=1.2*h),i}function c(a,b){var c=parseFloat(a);return s.test(a)?c*b:c}function d(a,b,d,e){if(!Array.isArray(b))return 0;var f=b.length;if(!f)return 0;for(var g=b[0],h=c(g.maxFontSize,d)||d,i=0,j=c(e,d),k=1;k<f;k++){g=b[k];var l=c(g.lineHeight,d)||j;i+=l}var m,n=c(g.maxFontSize,d)||d;switch(a){case"middle":m=h/2-.15*n-i/2;break;case"bottom":m=-(.25*n)-i;break;default:case"top":m=.8*h}return m}var e="object"==typeof window&&!(!window.SVGAngle&&!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"));if(!e)return function(){throw new Error("SVG is required to use Vectorizer.")};var f={xmlns:"http://www.w3.org/2000/svg",xml:"http://www.w3.org/XML/1998/namespace",xlink:"http://www.w3.org/1999/xlink",xhtml:"http://www.w3.org/1999/xhtml"},h="1.1",i=Math,j=i.PI,k=i.atan2,l=i.sqrt,m=i.min,n=i.max,o=i.cos,p=i.sin,q=function(a,b,c){if(!(this instanceof q))return q.apply(Object.create(q.prototype),arguments);if(a){if(q.isV(a)&&(a=a.node),b=b||{},q.isString(a)){if("svg"===a.toLowerCase())a=q.createSvgDocument();else if("<"===a[0]){var d=q.createSvgDocument(a);if(d.childNodes.length>1){var e,g,h=[];for(e=0,g=d.childNodes.length;e<g;e++){var i=d.childNodes[e];h.push(new q(document.importNode(i,!0)))}return h}a=document.importNode(d.firstChild,!0)}else a=document.createElementNS(f.xmlns,a);q.ensureId(a)}return this.node=a,this.setAttributes(b),c&&this.append(c),this}},r=q.prototype;Object.defineProperty(r,"id",{enumerable:!0,get:function(){return this.node.id},set:function(a){this.node.id=a}}),r.getTransformToElement=function(a){return a=q.toNode(a),a.getScreenCTM().inverse().multiply(this.node.getScreenCTM())},r.transform=function(a,b){var c=this.node;if(q.isUndefined(a))return q.transformStringToMatrix(this.attr("transform"));if(b&&b.absolute)return this.attr("transform",q.matrixToTransformString(a));var d=q.createSVGTransform(a);return c.transform.baseVal.appendItem(d),this},r.translate=function(a,b,c){c=c||{},b=b||0;var d=this.attr("transform")||"",e=q.parseTransformString(d);if(d=e.value,q.isUndefined(a))return e.translate;d=d.replace(/translate\([^)]*\)/g,"").trim();var f=c.absolute?a:e.translate.tx+a,g=c.absolute?b:e.translate.ty+b,h="translate("+f+","+g+")";return this.attr("transform",(h+" "+d).trim()),this},r.rotate=function(a,b,c,d){d=d||{};var e=this.attr("transform")||"",f=q.parseTransformString(e);if(e=f.value,q.isUndefined(a))return f.rotate;e=e.replace(/rotate\([^)]*\)/g,"").trim(),a%=360;var g=d.absolute?a:f.rotate.angle+a,h=void 0!==b&&void 0!==c?","+b+","+c:"",i="rotate("+g+h+")";return this.attr("transform",(e+" "+i).trim()),this},r.scale=function(a,b){b=q.isUndefined(b)?a:b;var c=this.attr("transform")||"",d=q.parseTransformString(c);if(c=d.value,q.isUndefined(a))return d.scale;c=c.replace(/scale\([^)]*\)/g,"").trim();var e="scale("+a+","+b+")";return this.attr("transform",(c+" "+e).trim()),this},r.bbox=function(a,b){var c,d=this.node,e=d.ownerSVGElement;if(!e)return new g.Rect(0,0,0,0);try{c=d.getBBox()}catch(a){c={x:d.clientLeft,y:d.clientTop,width:d.clientWidth,height:d.clientHeight}}if(a)return new g.Rect(c);var f=this.getTransformToElement(b||e);return q.transformRect(c,f)},r.getBBox=function(a){var b,c={},d=this.node,e=d.ownerSVGElement;if(!e)return new g.Rect(0,0,0,0);if(a&&(a.target&&(c.target=q.toNode(a.target)),a.recursive&&(c.recursive=a.recursive)),c.recursive){var f=this.children(),h=f.length;if(0===h)return this.getBBox({target:c.target,recursive:!1});c.target||(c.target=this);for(var i=0;i<h;i++){var j,k=f[i];j=0===k.children().length?k.getBBox({target:c.target,recursive:!1}):k.getBBox({target:c.target,recursive:!0}),b=b?b.union(j):j}return b}try{b=d.getBBox()}catch(a){b={x:d.clientLeft,y:d.clientTop,width:d.clientWidth,height:d.clientHeight}}if(c.target){var l=this.getTransformToElement(c.target);return q.transformRect(b,l)}return new g.Rect(b)};var s=/em$/;r.text=function(c,e){if(c&&"string"!=typeof c)throw new Error("Vectorizer: text() expects the first argument to be a string.");c=q.sanitizeText(c),e||(e={});var f=e.eol,g=e.textPath,h=e.textVerticalAnchor,i="middle"===h||"bottom"===h||"top"===h,j=e.x;void 0===j&&(j=this.attr("x")||0);var k=e.includeAnnotationIndices,l=e.annotations;l&&!q.isArray(l)&&(l=[l]);var m=e.lineHeight,n="auto"===m,o=n?"1.5em":m||"1em";this.empty(),this.attr({"xml:space":"preserve",display:c?null:"none"});var p=parseFloat(this.attr("font-size"));p||(p=16,(i||l)&&this.attr("font-size",p));var r,t=document;g?("string"==typeof g&&(g={d:g}),r=a(g,this)):r=t.createDocumentFragment();for(var u,v=0,w=c.split("\n"),x=[],y=0,z=w.length-1;y<=z;y++){var A,B=o,C="v-line",D=t.createElementNS(q.namespace.xmlns,"tspan"),E=w[y];if(E)if(l){var F=q.annotateString(E,l,{offset:-v,includeAnnotationIndices:k});A=b(D,F,{includeAnnotationIndices:k,eol:y!==z&&f,lineHeight:n?null:o,baseSize:p});var G=A.lineHeight;G&&n&&0!==y&&(B=G),0===y&&(u=.8*A.maxFontSize)}else f&&y!==z&&(E+=f),D.textContent=E;else{D.textContent="-",C+=" v-empty-line";var H=D.style;H.fillOpacity=0,H.strokeOpacity=0,l&&(A={})}A&&x.push(A),y>0&&D.setAttribute("dy",B),(y>0||g)&&D.setAttribute("x",j),D.className.baseVal=C,r.appendChild(D),v+=E.length+1}if(i)if(l)B=d(h,x,p,o);else if("top"===h)B="0.8em";else{var I;switch(z>0?(I=parseFloat(o)||1,I*=z,s.test(o)||(I/=p)):I=0,h){case"middle":B=.3-I/2+"em";break;case"bottom":B=-I-.3+"em"}}else 0===h?B="0em":h?B=h:(B=0,null===this.attr("y")&&this.attr("y",u||"0.8em"));return r.firstChild.setAttribute("dy",B),this.append(r),this},r.removeAttr=function(a){var b=q.qualifyAttr(a),c=this.node;return b.ns?c.hasAttributeNS(b.ns,b.local)&&c.removeAttributeNS(b.ns,b.local):c.hasAttribute(a)&&c.removeAttribute(a),this},r.attr=function(a,b){if(q.isUndefined(a)){for(var c=this.node.attributes,d={},e=0;e<c.length;e++)d[c[e].name]=c[e].value;return d}if(q.isString(a)&&q.isUndefined(b))return this.node.getAttribute(a);if("object"==typeof a)for(var f in a)a.hasOwnProperty(f)&&this.setAttribute(f,a[f]);else this.setAttribute(a,b);return this},r.normalizePath=function(){var a=this.tagName();return"PATH"===a&&this.attr("d",q.normalizePathData(this.attr("d"))),this},r.remove=function(){return this.node.parentNode&&this.node.parentNode.removeChild(this.node),this},r.empty=function(){for(;this.node.firstChild;)this.node.removeChild(this.node.firstChild);return this},r.setAttributes=function(a){for(var b in a)a.hasOwnProperty(b)&&this.setAttribute(b,a[b]);return this},r.append=function(a){q.isArray(a)||(a=[a]);for(var b=0,c=a.length;b<c;b++)this.node.appendChild(q.toNode(a[b]));return this},r.prepend=function(a){var b=this.node.firstChild;return b?q(b).before(a):this.append(a)},r.before=function(a){var b=this.node,c=b.parentNode;if(c){q.isArray(a)||(a=[a]);for(var d=0,e=a.length;d<e;d++)c.insertBefore(q.toNode(a[d]),b)}return this},r.appendTo=function(a){return q.toNode(a).appendChild(this.node),this},r.svg=function(){return this.node instanceof window.SVGSVGElement?this:q(this.node.ownerSVGElement)},r.tagName=function(){return this.node.tagName.toUpperCase()},r.defs=function(){var a=this.svg()||this,b=a.node.getElementsByTagName("defs")[0];return b?q(b):q("defs").appendTo(a)},r.clone=function(){var a=q(this.node.cloneNode(!0));return a.node.id=q.uniqueId(),a},r.findOne=function(a){var b=this.node.querySelector(a);return b?q(b):void 0},r.find=function(a){var b=[],c=this.node.querySelectorAll(a);if(c)for(var d=0;d<c.length;d++)b.push(q(c[d]));return b},r.children=function(){for(var a=this.node.childNodes,b=[],c=0;c<a.length;c++){var d=a[c];1===d.nodeType&&b.push(q(a[c]))}return b},r.index=function(){for(var a=0,b=this.node.previousSibling;b;)1===b.nodeType&&a++,b=b.previousSibling;return a},r.findParentByClass=function(a,b){for(var c=this.node.ownerSVGElement,d=this.node.parentNode;d&&d!==b&&d!==c;){var e=q(d);if(e.hasClass(a))return e;d=d.parentNode}return null},r.contains=function(a){var b=this.node,c=q.toNode(a),d=c&&c.parentNode;return b===d||!!(d&&1===d.nodeType&&16&b.compareDocumentPosition(d))},r.toLocalPoint=function(a,b){var c=this.svg().node,d=c.createSVGPoint();d.x=a,d.y=b;try{var e=d.matrixTransform(c.getScreenCTM().inverse()),f=this.getTransformToElement(c).inverse()}catch(a){return d}return e.matrixTransform(f)},r.translateCenterToPoint=function(a){var b=this.getBBox({target:this.svg()}),c=b.center();return this.translate(a.x-c.x,a.y-c.y),this},r.translateAndAutoOrient=function(a,b,c){var d=this.scale();this.attr("transform",""),this.scale(d.sx,d.sy);var e=this.svg().node,f=this.getBBox({target:c||e}),h=e.createSVGTransform();h.setTranslate(-f.x-f.width/2,-f.y-f.height/2);var i=e.createSVGTransform(),j=new g.Point(a).changeInAngle(a.x-b.x,a.y-b.y,b);i.setRotate(j,0,0);var k=e.createSVGTransform(),l=new g.Point(a).move(b,f.width/2);k.setTranslate(a.x+(a.x-l.x),a.y+(a.y-l.y));var m=this.getTransformToElement(c||e),n=e.createSVGTransform();n.setMatrix(k.matrix.multiply(i.matrix.multiply(h.matrix.multiply(m))));var o=q.decomposeMatrix(n.matrix);return this.translate(o.translateX,o.translateY),this.rotate(o.rotation),this},r.animateAlongPath=function(a,b){b=q.toNode(b);var c=q.ensureId(b),d=q("animateMotion",a),e=q("mpath",{"xlink:href":"#"+c});d.append(e),this.append(d);try{d.node.beginElement()}catch(a){if("fake"===document.documentElement.getAttribute("smiling")){var f=d.node;f.animators=[];var g=f.getAttribute("id");g&&(id2anim[g]=f);for(var h=getTargets(f),i=0,j=h.length;i<j;i++){var k=h[i],l=new Animator(f,k,i);animators.push(l),f.animators[i]=l,l.register()}}}return this},r.hasClass=function(a){return new RegExp("(\\s|^)"+a+"(\\s|$)").test(this.node.getAttribute("class"))},r.addClass=function(a){if(!this.hasClass(a)){var b=this.node.getAttribute("class")||"";this.node.setAttribute("class",(b+" "+a).trim())}return this},r.removeClass=function(a){if(this.hasClass(a)){var b=this.node.getAttribute("class").replace(new RegExp("(\\s|^)"+a+"(\\s|$)","g"),"$2");this.node.setAttribute("class",b)}return this},r.toggleClass=function(a,b){var c=q.isUndefined(b)?this.hasClass(a):!b;return c?this.removeClass(a):this.addClass(a),this},r.sample=function(a){a=a||1;for(var b,c=this.node,d=c.getTotalLength(),e=[],f=0;f<d;)b=c.getPointAtLength(f),e.push({x:b.x,y:b.y,distance:f}),f+=a;return e},r.convertToPath=function(){var a=q("path");a.attr(this.attr());var b=this.convertToPathData();return b&&a.attr("d",b),a},r.convertToPathData=function(){var a=this.tagName();switch(a){case"PATH":return this.attr("d");case"LINE":return q.convertLineToPathData(this.node);case"POLYGON":return q.convertPolygonToPathData(this.node);case"POLYLINE":return q.convertPolylineToPathData(this.node);case"ELLIPSE":return q.convertEllipseToPathData(this.node);case"CIRCLE":return q.convertCircleToPathData(this.node);case"RECT":return q.convertRectToPathData(this.node)}throw new Error(a+" cannot be converted to PATH.")},q.prototype.toGeometryShape=function(){var a,b,c,d,e,f,h,i,j,k,l,m,n,o,p;switch(this.tagName()){case"RECT":return a=parseFloat(this.attr("x"))||0,b=parseFloat(this.attr("y"))||0,c=parseFloat(this.attr("width"))||0,d=parseFloat(this.attr("height"))||0,new g.Rect(a,b,c,d);case"CIRCLE":return e=parseFloat(this.attr("cx"))||0,f=parseFloat(this.attr("cy"))||0,h=parseFloat(this.attr("r"))||0,new g.Ellipse({x:e,y:f},h,h);case"ELLIPSE":return e=parseFloat(this.attr("cx"))||0,f=parseFloat(this.attr("cy"))||0,i=parseFloat(this.attr("rx"))||0,j=parseFloat(this.attr("ry"))||0,new g.Ellipse({x:e,y:f},i,j);case"POLYLINE":return k=q.getPointsFromSvgNode(this),new g.Polyline(k);case"POLYGON":return k=q.getPointsFromSvgNode(this),k.length>1&&k.push(k[0]),new g.Polyline(k);case"PATH":return l=this.attr("d"),g.Path.isDataSupported(l)||(l=q.normalizePathData(l)),new g.Path(l);case"LINE":return m=parseFloat(this.attr("x1"))||0,o=parseFloat(this.attr("y1"))||0,n=parseFloat(this.attr("x2"))||0,p=parseFloat(this.attr("y2"))||0,new g.Line({x:m,y:o},{x:n,y:p})}return this.getBBox()},r.findIntersection=function(a,b){var c=this.svg().node;b=b||c;var d=this.getBBox({target:b}),e=d.center();if(d.intersectionWithLineFromCenterToPoint(a)){var f,h=this.tagName();if("RECT"===h){var i=new g.Rect(parseFloat(this.attr("x")||0),parseFloat(this.attr("y")||0),parseFloat(this.attr("width")),parseFloat(this.attr("height"))),j=this.getTransformToElement(b),k=q.decomposeMatrix(j),l=c.createSVGTransform();l.setRotate(-k.rotation,e.x,e.y);var m=q.transformRect(i,l.matrix.multiply(j));f=new g.Rect(m).intersectionWithLineFromCenterToPoint(a,k.rotation)}else if("PATH"===h||"POLYGON"===h||"POLYLINE"===h||"CIRCLE"===h||"ELLIPSE"===h){var n,o,p,r,s,t,u="PATH"===h?this:this.convertToPath(),v=u.sample(),w=1/0,x=[];for(n=0;n<v.length;n++)o=v[n],p=q.createSVGPoint(o.x,o.y),p=p.matrixTransform(this.getTransformToElement(b)),o=new g.Point(p),r=o.distance(e),s=1.1*o.distance(a),t=r+s,t<w?(w=t,x=[{sample:o,refDistance:s}]):t<w+1&&x.push({sample:o,refDistance:s});x.sort(function(a,b){return a.refDistance-b.refDistance}),x[0]&&(f=x[0].sample)}return f}},r.setAttribute=function(a,b){var c=this.node;if(null===b)return this.removeAttr(a),this;var d=q.qualifyAttr(a);return d.ns?c.setAttributeNS(d.ns,a,b):"id"===a?c.id=b:c.setAttribute(a,b),this},q.createSvgDocument=function(a){var b='<svg xmlns="'+f.xmlns+'" xmlns:xlink="'+f.xlink+'" version="'+h+'">'+(a||"")+"</svg>",c=q.parseXML(b,{async:!1});return c.documentElement},q.idCounter=0,q.uniqueId=function(){return"v-"+ ++q.idCounter},q.toNode=function(a){return q.isV(a)?a.node:a.nodeName&&a||a[0]},q.ensureId=function(a){return a=q.toNode(a),a.id||(a.id=q.uniqueId())},q.sanitizeText=function(a){return(a||"").replace(/ /g,"\xa0")},q.isUndefined=function(a){return"undefined"==typeof a},q.isString=function(a){return"string"==typeof a},q.isObject=function(a){return a&&"object"==typeof a},q.isArray=Array.isArray,q.parseXML=function(a,b){b=b||{};var c;try{var d=new DOMParser;q.isUndefined(b.async)||(d.async=b.async),c=d.parseFromString(a,"text/xml")}catch(a){c=void 0}if(!c||c.getElementsByTagName("parsererror").length)throw new Error("Invalid XML: "+a);return c},q.qualifyAttr=function(a){if(a.indexOf(":")!==-1){var b=a.split(":");return{ns:f[b[0]],local:b[1]}}return{ns:null,local:a}},q.transformRegex=/(\w+)\(([^,)]+),?([^)]+)?\)/gi,q.transformSeparatorRegex=/[ ,]+/,q.transformationListRegex=/^(\w+)\((.*)\)/,q.transformStringToMatrix=function(a){var b=q.createSVGMatrix(),c=a&&a.match(q.transformRegex);if(!c)return b;for(var d=0,e=c.length;d<e;d++){var f=c[d],g=f.match(q.transformationListRegex);if(g){var h,i,j,k,l,m=q.createSVGMatrix(),n=g[2].split(q.transformSeparatorRegex);switch(g[1].toLowerCase()){case"scale":h=parseFloat(n[0]),i=void 0===n[1]?h:parseFloat(n[1]),m=m.scaleNonUniform(h,i);break;case"translate":j=parseFloat(n[0]),k=parseFloat(n[1]),m=m.translate(j,k);break;case"rotate":l=parseFloat(n[0]),j=parseFloat(n[1])||0,k=parseFloat(n[2])||0,m=0!==j||0!==k?m.translate(j,k).rotate(l).translate(-j,-k):m.rotate(l);break;case"skewx":l=parseFloat(n[0]),m=m.skewX(l);break;case"skewy":l=parseFloat(n[0]),m=m.skewY(l);break;case"matrix":m.a=parseFloat(n[0]),m.b=parseFloat(n[1]),m.c=parseFloat(n[2]),m.d=parseFloat(n[3]),m.e=parseFloat(n[4]),m.f=parseFloat(n[5]);break;default:continue}b=b.multiply(m)}}return b},q.matrixToTransformString=function(a){return a||(a=!0),"matrix("+(void 0!==a.a?a.a:1)+","+(void 0!==a.b?a.b:0)+","+(void 0!==a.c?a.c:0)+","+(void 0!==a.d?a.d:1)+","+(void 0!==a.e?a.e:0)+","+(void 0!==a.f?a.f:0)+")"},q.parseTransformString=function(a){var b,c,d;if(a){var e=q.transformSeparatorRegex;if(a.trim().indexOf("matrix")>=0){var f=q.transformStringToMatrix(a),g=q.decomposeMatrix(f);b=[g.translateX,g.translateY],d=[g.scaleX,g.scaleY],c=[g.rotation];var h=[];0===b[0]&&0===b[0]||h.push("translate("+b+")"),1===d[0]&&1===d[1]||h.push("scale("+d+")"),0!==c[0]&&h.push("rotate("+c+")"),a=h.join(" ")}else{var i=a.match(/translate\((.*?)\)/);i&&(b=i[1].split(e));var j=a.match(/rotate\((.*?)\)/);j&&(c=j[1].split(e));var k=a.match(/scale\((.*?)\)/);k&&(d=k[1].split(e))}}var l=d&&d[0]?parseFloat(d[0]):1;return{value:a,translate:{tx:b&&b[0]?parseInt(b[0],10):0,ty:b&&b[1]?parseInt(b[1],10):0},rotate:{angle:c&&c[0]?parseInt(c[0],10):0,cx:c&&c[1]?parseInt(c[1],10):void 0,cy:c&&c[2]?parseInt(c[2],10):void 0},scale:{sx:l,sy:d&&d[1]?parseFloat(d[1]):l}}},q.deltaTransformPoint=function(a,b){var c=b.x*a.a+b.y*a.c+0,d=b.x*a.b+b.y*a.d+0;return{x:c,y:d}},q.decomposeMatrix=function(a){var b=q.deltaTransformPoint(a,{x:0,y:1}),c=q.deltaTransformPoint(a,{x:1,y:0}),d=180/j*k(b.y,b.x)-90,e=180/j*k(c.y,c.x);return{translateX:a.e,translateY:a.f,scaleX:l(a.a*a.a+a.b*a.b),scaleY:l(a.c*a.c+a.d*a.d),skewX:d,skewY:e,rotation:d}},q.matrixToScale=function(a){var b,c,d,e;return a?(b=q.isUndefined(a.a)?1:a.a,e=q.isUndefined(a.d)?1:a.d,c=a.b,d=a.c):b=e=1,{sx:c?l(b*b+c*c):b,sy:d?l(d*d+e*e):e}},q.matrixToRotate=function(a){var b={x:0,y:1};return a&&(b=q.deltaTransformPoint(a,b)),{angle:g.normalizeAngle(g.toDeg(k(b.y,b.x))-90)}},q.matrixToTranslate=function(a){return{tx:a&&a.e||0,ty:a&&a.f||0}},q.isV=function(a){return a instanceof q},q.isVElement=q.isV;var t=q("svg").node;return q.createSVGMatrix=function(a){var b=t.createSVGMatrix();for(var c in a)b[c]=a[c];return b},q.createSVGTransform=function(a){return q.isUndefined(a)?t.createSVGTransform():(a instanceof SVGMatrix||(a=q.createSVGMatrix(a)),t.createSVGTransformFromMatrix(a))},q.createSVGPoint=function(a,b){var c=t.createSVGPoint();return c.x=a,c.y=b,c},q.transformRect=function(a,b){var c=t.createSVGPoint();c.x=a.x,c.y=a.y;var d=c.matrixTransform(b);c.x=a.x+a.width,c.y=a.y;var e=c.matrixTransform(b);c.x=a.x+a.width,c.y=a.y+a.height;var f=c.matrixTransform(b);c.x=a.x,c.y=a.y+a.height;var h=c.matrixTransform(b),i=m(d.x,e.x,f.x,h.x),j=n(d.x,e.x,f.x,h.x),k=m(d.y,e.y,f.y,h.y),l=n(d.y,e.y,f.y,h.y);return new g.Rect(i,k,j-i,l-k)},q.transformPoint=function(a,b){return new g.Point(q.createSVGPoint(a.x,a.y).matrixTransform(b))},q.transformLine=function(a,b){return new g.Line(q.transformPoint(a.start,b),q.transformPoint(a.end,b))},q.transformPolyline=function(a,b){var c=a instanceof g.Polyline?a.points:a;q.isArray(c)||(c=[]);for(var d=[],e=0,f=c.length;e<f;e++)d[e]=q.transformPoint(c[e],b);return new g.Polyline(d)},q.styleToObject=function(a){for(var b={},c=a.split(";"),d=0;d<c.length;d++){var e=c[d],f=e.split("=");b[f[0].trim()]=f[1].trim()}return b},q.createSlicePathData=function(a,b,c,d){var e=2*j-1e-6,f=a,g=b,h=c,i=d,k=(i<h&&(k=h,h=i,i=k),i-h),l=k<j?"0":"1",m=o(h),n=p(h),q=o(i),r=p(i);return k>=e?f?"M0,"+g+"A"+g+","+g+" 0 1,1 0,"+-g+"A"+g+","+g+" 0 1,1 0,"+g+"M0,"+f+"A"+f+","+f+" 0 1,0 0,"+-f+"A"+f+","+f+" 0 1,0 0,"+f+"Z":"M0,"+g+"A"+g+","+g+" 0 1,1 0,"+-g+"A"+g+","+g+" 0 1,1 0,"+g+"Z":f?"M"+g*m+","+g*n+"A"+g+","+g+" 0 "+l+",1 "+g*q+","+g*r+"L"+f*q+","+f*r+"A"+f+","+f+" 0 "+l+",0 "+f*m+","+f*n+"Z":"M"+g*m+","+g*n+"A"+g+","+g+" 0 "+l+",1 "+g*q+","+g*r+"L0,0Z"},q.mergeAttrs=function(a,b){for(var c in b)"class"===c?a[c]=a[c]?a[c]+" "+b[c]:b[c]:"style"===c?q.isObject(a[c])&&q.isObject(b[c])?a[c]=q.mergeAttrs(a[c],b[c]):q.isObject(a[c])?a[c]=q.mergeAttrs(a[c],q.styleToObject(b[c])):q.isObject(b[c])?a[c]=q.mergeAttrs(q.styleToObject(a[c]),b[c]):a[c]=q.mergeAttrs(q.styleToObject(a[c]),q.styleToObject(b[c])):a[c]=b[c];return a},q.annotateString=function(a,b,c){b=b||[],c=c||{};for(var d,e,f,g=c.offset||0,h=[],i=[],j=0;j<a.length;j++){e=i[j]=a[j];for(var k=0;k<b.length;k++){var l=b[k],m=l.start+g,n=l.end+g;j>=m&&j<n&&(q.isObject(e)?e.attrs=q.mergeAttrs(q.mergeAttrs({},e.attrs),l.attrs):e=i[j]={t:a[j],attrs:l.attrs},c.includeAnnotationIndices&&(e.annotations||(e.annotations=[])).push(k))}f=i[j-1],f?q.isObject(e)&&q.isObject(f)?JSON.stringify(e.attrs)===JSON.stringify(f.attrs)?d.t+=e.t:(h.push(d),d=e):q.isObject(e)?(h.push(d),d=e):q.isObject(f)?(h.push(d),d=e):d=(d||"")+e:d=e}return d&&h.push(d),h},q.findAnnotationsAtIndex=function(a,b){var c=[];return a&&a.forEach(function(a){a.start<b&&b<=a.end&&c.push(a)}),c},q.findAnnotationsBetweenIndexes=function(a,b,c){var d=[];return a&&a.forEach(function(a){(b>=a.start&&b<a.end||c>a.start&&c<=a.end||a.start>=b&&a.end<c)&&d.push(a)}),d},q.shiftAnnotations=function(a,b,c){return a&&a.forEach(function(a){a.start<b&&a.end>=b?a.end+=c:a.start>=b&&(a.start+=c,a.end+=c)}),a},q.convertLineToPathData=function(a){a=q(a);var b=["M",a.attr("x1"),a.attr("y1"),"L",a.attr("x2"),a.attr("y2")].join(" ");return b},q.convertPolygonToPathData=function(a){var b=q.getPointsFromSvgNode(a);return 0===b.length?null:q.svgPointsToPath(b)+" Z"},q.convertPolylineToPathData=function(a){var b=q.getPointsFromSvgNode(a);return 0===b.length?null:q.svgPointsToPath(b)},q.svgPointsToPath=function(a){for(var b=0,c=a.length;b<c;b++)a[b]=a[b].x+" "+a[b].y;return"M "+a.join(" L")},q.getPointsFromSvgNode=function(a){a=q.toNode(a);var b=[],c=a.points;if(c)for(var d=0,e=c.numberOfItems;d<e;d++)b.push(c.getItem(d));return b},q.KAPPA=.551784,q.convertCircleToPathData=function(a){a=q(a);var b=parseFloat(a.attr("cx"))||0,c=parseFloat(a.attr("cy"))||0,d=parseFloat(a.attr("r")),e=d*q.KAPPA,f=["M",b,c-d,"C",b+e,c-d,b+d,c-e,b+d,c,"C",b+d,c+e,b+e,c+d,b,c+d,"C",b-e,c+d,b-d,c+e,b-d,c,"C",b-d,c-e,b-e,c-d,b,c-d,"Z"].join(" ");return f},q.convertEllipseToPathData=function(a){a=q(a);var b=parseFloat(a.attr("cx"))||0,c=parseFloat(a.attr("cy"))||0,d=parseFloat(a.attr("rx")),e=parseFloat(a.attr("ry"))||d,f=d*q.KAPPA,g=e*q.KAPPA,h=["M",b,c-e,"C",b+f,c-e,b+d,c-g,b+d,c,"C",b+d,c+g,b+f,c+e,b,c+e,"C",b-f,c+e,b-d,c+g,b-d,c,"C",b-d,c-g,b-f,c-e,b,c-e,"Z"].join(" ");return h},q.convertRectToPathData=function(a){return a=q(a),q.rectToPath({x:parseFloat(a.attr("x"))||0,y:parseFloat(a.attr("y"))||0,width:parseFloat(a.attr("width"))||0,height:parseFloat(a.attr("height"))||0,rx:parseFloat(a.attr("rx"))||0,ry:parseFloat(a.attr("ry"))||0})},q.rectToPath=function(a){var b,c=a.x,d=a.y,e=a.width,f=a.height,g=m(a.rx||a["top-rx"]||0,e/2),h=m(a.rx||a["bottom-rx"]||0,e/2),i=m(a.ry||a["top-ry"]||0,f/2),j=m(a.ry||a["bottom-ry"]||0,f/2);return b=g||h||i||j?["M",c,d+i,"v",f-i-j,"a",h,j,0,0,0,h,j,"h",e-2*h,"a",h,j,0,0,0,h,-j,"v",-(f-j-i),"a",g,i,0,0,0,-g,-i,"h",-(e-2*g),"a",g,i,0,0,0,-g,i,"Z"]:["M",c,d,"H",c+e,"V",d+f,"H",c,"V",d,"Z"],b.join(" ")},q.normalizePathData=function(){function a(a,b,c,d,e,f){var g=1/3,h=2/3;return[g*a+h*c,g*b+h*d,g*e+h*c,g*f+h*d,e,f]}function b(a,c,d,e,f,g,h,i,q,r){var s,t=120*j/180,u=j/180*(+f||0),v=[],w=function(a,b,c){var d=a*l(c)-b*k(c),e=a*k(c)+b*l(c);return{x:d,y:e}};if(r)F=r[0],G=r[1],D=r[2],E=r[3];else{s=w(a,c,-u),a=s.x,c=s.y,s=w(i,q,-u),i=s.x,q=s.y;var x=(a-i)/2,y=(c-q)/2,z=x*x/(d*d)+y*y/(e*e);z>1&&(z=o(z),d*=z,e*=z);var A=d*d,B=e*e,C=(g==h?-1:1)*o(p((A*B-A*y*y-B*x*x)/(A*y*y+B*x*x))),D=C*d*y/e+(a+i)/2,E=C*-e*x/d+(c+q)/2,F=n(((c-E)/e).toFixed(9)),G=n(((q-E)/e).toFixed(9));F=a<D?j-F:F,G=i<D?j-G:G,F<0&&(F=2*j+F),G<0&&(G=2*j+G),(h&&F)>G&&(F-=2*j),(!h&&G)>F&&(G-=2*j)}var H=G-F;if(p(H)>t){var I=G,J=i,K=q;G=F+t*((h&&G)>F?1:-1),i=D+d*l(G),q=E+e*k(G),v=b(i,q,d,e,f,0,h,J,K,[G,I,D,E])}H=G-F;var L=l(F),M=k(F),N=l(G),O=k(G),P=m(H/4),Q=4/3*(d*P),R=4/3*(e*P),S=[a,c],T=[a+Q*M,c-R*L],U=[i+Q*O,q-R*N],V=[i,q];if(T[0]=2*S[0]-T[0],T[1]=2*S[1]-T[1],r)return[T,U,V].concat(v);v=[T,U,V].concat(v).join().split(",");for(var W=[],X=v.length,Y=0;Y<X;Y++)W[Y]=Y%2?w(v[Y-1],v[Y],u).y:w(v[Y],v[Y+1],u).x;return W}function c(a){if(!a)return null;var b={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},c=[];return String(a).replace(g,function(a,d,e){var f=[],g=d.toLowerCase();for(e.replace(h,function(a,b){b&&f.push(+b)}),"m"===g&&f.length>2&&(c.push([d].concat(f.splice(0,2))),g="l",d="m"===d?"l":"L");f.length>=b[g]&&(c.push([d].concat(f.splice(0,b[g]))),b[g]););}),c}function d(a){if(Array.isArray(a)&&Array.isArray(a&&a[0])||(a=c(a)),!a||!a.length)return[["M",0,0]];for(var b,d=[],e=0,f=0,g=0,h=0,i=0,j=a.length,k=i;k<j;k++){var l=[];d.push(l);var m=a[k];if(b=m[0],b!=b.toUpperCase()){l[0]=b.toUpperCase();var n,o;switch(l[0]){case"A":l[1]=m[1],l[2]=m[2],l[3]=m[3],l[4]=m[4],l[5]=m[5],l[6]=+m[6]+e,l[7]=+m[7]+f;break;case"V":l[1]=+m[1]+f;break;case"H":l[1]=+m[1]+e;break;case"M":for(g=+m[1]+e,h=+m[2]+f,n=m.length,o=1;o<n;o++)l[o]=+m[o]+(o%2?e:f);break;default:for(n=m.length,o=1;o<n;o++)l[o]=+m[o]+(o%2?e:f)}}else for(var p=m.length,q=0;q<p;q++)l[q]=m[q];switch(l[0]){case"Z":e=+g,f=+h;break;case"H":e=l[1];break;case"V":f=l[1];break;case"M":g=l[l.length-2],h=l[l.length-1],e=l[l.length-2],f=l[l.length-1];break;default:e=l[l.length-2],f=l[l.length-1]}}return d}function e(c){function e(c,d,e){var f,g;if(!c)return["C",d.x,d.y,d.x,d.y,d.x,d.y];switch(c[0]in{T:1,Q:1}||(d.qx=null,d.qy=null),c[0]){case"M":d.X=c[1],d.Y=c[2];break;case"A":c=["C"].concat(b.apply(0,[d.x,d.y].concat(c.slice(1))));break;case"S":"C"===e||"S"===e?(f=2*d.x-d.bx,g=2*d.y-d.by):(f=d.x,g=d.y),c=["C",f,g].concat(c.slice(1));break;case"T":"Q"===e||"T"===e?(d.qx=2*d.x-d.qx,d.qy=2*d.y-d.qy):(d.qx=d.x,d.qy=d.y),c=["C"].concat(a(d.x,d.y,d.qx,d.qy,c[1],c[2]));break;case"Q":d.qx=c[1],d.qy=c[2],c=["C"].concat(a(d.x,d.y,c[1],c[2],c[3],c[4]));break;case"H":c=["L"].concat(c[1],d.y);break;case"V":c=["L"].concat(d.x,c[1]);break;case"L":break;case"Z":}return c}function f(a,b){if(a[b].length>7){a[b].shift();for(var c=a[b];c.length;)i[b]="A",a.splice(b++,0,["C"].concat(c.splice(0,6)));a.splice(b,1),l=g.length}}for(var g=d(c),h={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},i=[],j="",k="",l=g.length,m=0;m<l;m++){g[m]&&(j=g[m][0]),"C"!==j&&(i[m]=j,m>0&&(k=i[m-1])),g[m]=e(g[m],h,k),"A"!==i[m]&&"C"===j&&(i[m]="C"),f(g,m);var n=g[m],o=n.length;h.x=n[o-2],h.y=n[o-1],h.bx=parseFloat(n[o-4])||h.x,h.by=parseFloat(n[o-3])||h.y}return g[0][0]&&"M"===g[0][0]||g.unshift(["M",0,0]),g}var f="\t\n\v\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029",g=new RegExp("([a-z])["+f+",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?["+f+"]*,?["+f+"]*)+)","ig"),h=new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)["+f+"]*,?["+f+"]*","ig"),i=Math,j=i.PI,k=i.sin,l=i.cos,m=i.tan,n=i.asin,o=i.sqrt,p=i.abs;return function(a){return e(a).join(",").split(",").join(" ")}}(),q.namespace=f,q}();
var joint={version:"2.1.4",config:{classNamePrefix:"joint-",defaultTheme:"default"},dia:{},ui:{},layout:{},shapes:{},format:{},connectors:{},highlighters:{},routers:{},anchors:{},connectionPoints:{},connectionStrategies:{},linkTools:{},mvc:{views:{}},setTheme:function(a,b){b=b||{},joint.util.invoke(joint.mvc.views,"setTheme",a,b),joint.mvc.View.prototype.defaultTheme=a},env:{_results:{},_tests:{svgforeignobject:function(){return!!document.createElementNS&&/SVGForeignObject/.test({}.toString.call(document.createElementNS("http://www.w3.org/2000/svg","foreignObject")))}},addTest:function(a,b){return joint.env._tests[a]=b},test:function(a){var b=joint.env._tests[a];if(!b)throw new Error('Test not defined ("'+a+'"). Use `joint.env.addTest(name, fn) to add a new test.`');var c=joint.env._results[a];if("undefined"!=typeof c)return c;try{c=b()}catch(a){c=!1}return joint.env._results[a]=c,c}},util:{hashCode:function(a){var b=0;if(0==a.length)return b;for(var c=0;c<a.length;c++){var d=a.charCodeAt(c);b=(b<<5)-b+d,b&=b}return b},getByPath:function(a,b,c){for(var d,e=Array.isArray(b)?b.slice():b.split(c||"/");e.length;){if(d=e.shift(),!(Object(a)===a&&d in a))return;a=a[d]}return a},setByPath:function(a,b,c,d){for(var e=Array.isArray(b)?b:b.split(d||"/"),f=a,g=0,h=e.length;g<h-1;g++)f=f[e[g]]||(f[e[g]]={});return f[e[h-1]]=c,a},unsetByPath:function(a,b,c){c=c||"/";var d=Array.isArray(b)?b.slice():b.split(c),e=d.pop();if(d.length>0){var f=joint.util.getByPath(a,d,c);f&&delete f[e]}else delete a[e];return a},flattenObject:function(a,b,c){b=b||"/";var d={};for(var e in a)if(a.hasOwnProperty(e)){var f="object"==typeof a[e];if(f&&c&&c(a[e])&&(f=!1),f){var g=this.flattenObject(a[e],b,c);for(var h in g)g.hasOwnProperty(h)&&(d[e+b+h]=g[h])}else d[e]=a[e]}return d},uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"==a?b:3&b|8;return c.toString(16)})},guid:function(a){return this.guid.id=this.guid.id||1,a.id=void 0===a.id?"j_"+this.guid.id++:a.id,a.id},toKebabCase:function(a){return a.replace(/[A-Z]/g,"-$&").toLowerCase()},normalizeEvent:function(a){var b=a.originalEvent&&a.originalEvent.changedTouches&&a.originalEvent.changedTouches[0];if(b){for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return a},nextFrame:function(){var a;if("undefined"!=typeof window&&(a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame),!a){var b=0;a=function(a){var c=(new Date).getTime(),d=Math.max(0,16-(c-b)),e=setTimeout(function(){a(c+d)},d);return b=c+d,e}}return function(b,c){return a(c?b.bind(c):b)}}(),cancelFrame:function(){var a,b="undefined"!=typeof window;return b&&(a=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.msCancelAnimationFrame||window.msCancelRequestAnimationFrame||window.oCancelAnimationFrame||window.oCancelRequestAnimationFrame||window.mozCancelAnimationFrame||window.mozCancelRequestAnimationFrame),a=a||clearTimeout,b?a.bind(window):a}(),shapePerimeterConnectionPoint:function(a,b,c,d){var e,f;if(!c){var g=b.$(".scalable")[0],h=b.$(".rotatable")[0];g&&g.firstChild?c=g.firstChild:h&&h.firstChild&&(c=h.firstChild)}return c?(f=V(c).findIntersection(d,a.paper.viewport),f||(e=V(c).getBBox({target:a.paper.viewport}))):(e=b.model.getBBox(),f=e.intersectionWithLineFromCenterToPoint(d)),f||e.center()},isPercentage:function(a){return joint.util.isString(a)&&"%"===a.slice(-1)},parseCssNumeric:function(a,b){b=b||[];var c={value:parseFloat(a)};if(Number.isNaN(c.value))return null;var d=b.join("|");if(joint.util.isString(a)){var e=new RegExp("(\\d+)("+d+")$").exec(a);if(!e)return null;e[2]&&(c.unit=e[2])}return c},breakText:function(a,b,c,d){d=d||{},c=c||{};var e=b.width,f=b.height,g=d.svgDocument||V("svg").node,h=V("tspan").node,i=V("text").attr(c).append(h).node,j=document.createTextNode("");i.style.opacity=0,i.style.display="block",h.style.display="block",h.appendChild(j),g.appendChild(i),d.svgDocument||document.body.appendChild(g);for(var k,l,m=d.separator||" ",n=d.eol||"\n",o=a.split(m),p=[],q=[],r=0,s=0,t=o.length;r<t;r++){var u=o[r];if(u)if(n&&u.indexOf(n)>=0)if(u.length>1){for(var v=u.split(n),w=0,x=v.length-1;w<x;w++)v.splice(2*w+1,0,n);Array.prototype.splice.apply(o,[r,1].concat(v)),r--,t+=v.length-1}else s++;else{if(j.data=q[s]?q[s]+" "+u:u,h.getComputedTextLength()<=e)q[s]=j.data,k&&(p[s++]=!0,k=0);else{if(!q[s]||k){var y=!!k;if(k=u.length-1,y||!k){if(!k){if(!q[s]){q=[];break}o.splice(r,2,u+o[r+1]),t--,p[s++]=!0,r--;continue}o[r]=u.substring(0,k),o[r+1]=u.substring(k)+o[r+1]}else o.splice(r,1,u.substring(0,k),u.substring(k)),t++,s&&!p[s-1]&&s--;r--;continue}s++,r--}if(void 0!==f){if(void 0===l){var z;z="auto"===c.lineHeight?{value:1.5,unit:"em"}:joint.util.parseCssNumeric(c.lineHeight,["em"])||{value:1,unit:"em"},l=z.value,"em"===z.unit&&(l*=i.getBBox().height)}if(l*q.length>f){q.splice(Math.floor(f/l));break}}}}return d.svgDocument?g.removeChild(i):document.body.removeChild(g),q.join(n)},sanitizeHTML:function(a){var b=$($.parseHTML("<div>"+a+"</div>",null,!1));return b.find("*").each(function(){var a=this;$.each(a.attributes,function(){var b=this,c=b.name,d=b.value;0!==c.indexOf("on")&&0!==d.indexOf("javascript:")||$(a).removeAttr(c)})}),b.html()},downloadBlob:function(a,b){if(window.navigator.msSaveBlob)window.navigator.msSaveBlob(a,b);else{var c=window.URL.createObjectURL(a),d=document.createElement("a");d.href=c,d.download=b,document.body.appendChild(d),d.click(),document.body.removeChild(d),window.URL.revokeObjectURL(c)}},downloadDataUri:function(a,b){var c=joint.util.dataUriToBlob(a);joint.util.downloadBlob(c,b)},dataUriToBlob:function(a){a=a.replace(/\s/g,""),a=decodeURIComponent(a);var b,c=a.indexOf(","),d=a.slice(0,c),e=d.split(":")[1].split(";")[0],f=a.slice(c+1);b=d.indexOf("base64")>=0?atob(f):unescape(encodeURIComponent(f));for(var g=new Uint8Array(b.length),h=0;h<b.length;h++)g[h]=b.charCodeAt(h);return new Blob([g],{type:e})},imageToDataUri:function(a,b){if(!a||"data:"===a.substr(0,"data:".length))return setTimeout(function(){b(null,a)},0);var c=function(b,c){if(200===b.status){var d=new FileReader;d.onload=function(a){var b=a.target.result;c(null,b)},d.onerror=function(){c(new Error("Failed to load image "+a))},d.readAsDataURL(b.response)}else c(new Error("Failed to load image "+a))},d=function(b,c){var d=function(a){for(var b=32768,c=[],d=0;d<a.length;d+=b)c.push(String.fromCharCode.apply(null,a.subarray(d,d+b)));return c.join("")};if(200===b.status){var e=new Uint8Array(b.response),f=a.split(".").pop()||"png",g={svg:"svg+xml"},h="data:image/"+(g[f]||f)+";base64,",i=h+btoa(d(e));c(null,i)}else c(new Error("Failed to load image "+a))},e=new XMLHttpRequest;e.open("GET",a,!0),e.addEventListener("error",function(){b(new Error("Failed to load image "+a))}),e.responseType=window.FileReader?"blob":"arraybuffer",e.addEventListener("load",function(){window.FileReader?c(e,b):d(e,b)}),e.send()},getElementBBox:function(a){var b=$(a);if(0===b.length)throw new Error("Element not found");var c=b[0],d=c.ownerDocument,e=c.getBoundingClientRect(),f=0,g=0;if(c.ownerSVGElement){var h=V(c),i=h.getBBox({target:h.svg()});f=e.width-i.width,g=e.height-i.height}return{x:e.left+window.pageXOffset-d.documentElement.offsetLeft+f/2,y:e.top+window.pageYOffset-d.documentElement.offsetTop+g/2,width:e.width-f,height:e.height-g}},sortElements:function(a,b){var c=$(a),d=c.map(function(){var a=this,b=a.parentNode,c=b.insertBefore(document.createTextNode(""),a.nextSibling);return function(){if(b===this)throw new Error("You can't sort elements if any one is a descendant of another.");b.insertBefore(this,c),b.removeChild(c)}});return Array.prototype.sort.call(c,b).each(function(a){d[a].call(this)})},setAttributesBySelector:function(a,b){var c=$(a);joint.util.forIn(b,function(a,b){var d=c.find(b).addBack().filter(b);joint.util.has(a,"class")&&(d.addClass(a.class),a=joint.util.omit(a,"class")),d.attr(a)})},normalizeSides:function(a){if(Object(a)!==a){var b=0;return isFinite(a)&&(b=+a),{top:b,right:b,bottom:b,left:b}}var c,d,e,f;return c=d=e=f=0,isFinite(a.vertical)&&(c=e=+a.vertical),isFinite(a.horizontal)&&(d=f=+a.horizontal),isFinite(a.top)&&(c=+a.top),isFinite(a.right)&&(d=+a.right),isFinite(a.bottom)&&(e=+a.bottom),isFinite(a.left)&&(f=+a.left),{top:c,right:d,bottom:e,left:f}},timing:{linear:function(a){return a},quad:function(a){return a*a},cubic:function(a){return a*a*a},inout:function(a){if(a<=0)return 0;if(a>=1)return 1;var b=a*a,c=b*a;return 4*(a<.5?c:3*(a-b)+c-.75)},exponential:function(a){return Math.pow(2,10*(a-1))},bounce:function(a){for(var b=0,c=1;1;b+=c,c/=2)if(a>=(7-4*b)/11){var d=(11-6*b-11*a)/4;return-d*d+c*c}},reverse:function(a){return function(b){return 1-a(1-b)}},reflect:function(a){return function(b){return.5*(b<.5?a(2*b):2-a(2-2*b))}},clamp:function(a,b,c){return b=b||0,c=c||1,function(d){var e=a(d);return e<b?b:e>c?c:e}},back:function(a){return a||(a=1.70158),function(b){return b*b*((a+1)*b-a)}},elastic:function(a){return a||(a=1.5),function(b){return Math.pow(2,10*(b-1))*Math.cos(20*Math.PI*a/3*b)}}},interpolate:{number:function(a,b){var c=b-a;return function(b){return a+c*b}},object:function(a,b){var c=Object.keys(a);return function(d){var e,f,g={};for(e=c.length-1;e!=-1;e--)f=c[e],g[f]=a[f]+(b[f]-a[f])*d;return g}},hexColor:function(a,b){var c=parseInt(a.slice(1),16),d=parseInt(b.slice(1),16),e=255&c,f=(255&d)-e,g=65280&c,h=(65280&d)-g,i=16711680&c,j=(16711680&d)-i;return function(a){var b=e+f*a&255,c=g+h*a&65280,d=i+j*a&16711680;return"#"+(1<<24|b|c|d).toString(16).slice(1)}},unit:function(a,b){var c=/(-?[0-9]*.[0-9]*)(px|em|cm|mm|in|pt|pc|%)/,d=c.exec(a),e=c.exec(b),f=e[1].indexOf("."),g=f>0?e[1].length-f-1:0;a=+d[1];var h=+e[1]-a,i=d[2];return function(b){return(a+h*b).toFixed(g)+i}}},filter:{outline:function(a){var b='<filter><feFlood flood-color="${color}" flood-opacity="${opacity}" result="colored"/><feMorphology in="SourceAlpha" result="morphedOuter" operator="dilate" radius="${outerRadius}" /><feMorphology in="SourceAlpha" result="morphedInner" operator="dilate" radius="${innerRadius}" /><feComposite result="morphedOuterColored" in="colored" in2="morphedOuter" operator="in"/><feComposite operator="xor" in="morphedOuterColored" in2="morphedInner" result="outline"/><feMerge><feMergeNode in="outline"/><feMergeNode in="SourceGraphic"/></feMerge></filter>',c=Number.isFinite(a.margin)?a.margin:2,d=Number.isFinite(a.width)?a.width:1;return joint.util.template(b)({color:a.color||"blue",opacity:Number.isFinite(a.opacity)?a.opacity:1,outerRadius:c+d,innerRadius:c})},highlight:function(a){var b='<filter><feFlood flood-color="${color}" flood-opacity="${opacity}" result="colored"/><feMorphology result="morphed" in="SourceGraphic" operator="dilate" radius="${width}"/><feComposite result="composed" in="colored" in2="morphed" operator="in"/><feGaussianBlur result="blured" in="composed" stdDeviation="${blur}"/><feBlend in="SourceGraphic" in2="blured" mode="normal"/></filter>';return joint.util.template(b)({color:a.color||"red",width:Number.isFinite(a.width)?a.width:1,blur:Number.isFinite(a.blur)?a.blur:0,opacity:Number.isFinite(a.opacity)?a.opacity:1})},blur:function(a){var b=Number.isFinite(a.x)?a.x:2;return joint.util.template('<filter><feGaussianBlur stdDeviation="${stdDeviation}"/></filter>')({stdDeviation:Number.isFinite(a.y)?[b,a.y]:b})},dropShadow:function(a){var b="SVGFEDropShadowElement"in window?'<filter><feDropShadow stdDeviation="${blur}" dx="${dx}" dy="${dy}" flood-color="${color}" flood-opacity="${opacity}"/></filter>':'<filter><feGaussianBlur in="SourceAlpha" stdDeviation="${blur}"/><feOffset dx="${dx}" dy="${dy}" result="offsetblur"/><feFlood flood-color="${color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="${opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';return joint.util.template(b)({dx:a.dx||0,dy:a.dy||0,opacity:Number.isFinite(a.opacity)?a.opacity:1,color:a.color||"black",blur:Number.isFinite(a.blur)?a.blur:4})},grayscale:function(a){var b=Number.isFinite(a.amount)?a.amount:1;return joint.util.template('<filter><feColorMatrix type="matrix" values="${a} ${b} ${c} 0 0 ${d} ${e} ${f} 0 0 ${g} ${b} ${h} 0 0 0 0 0 1 0"/></filter>')({a:.2126+.7874*(1-b),b:.7152-.7152*(1-b),c:.0722-.0722*(1-b),d:.2126-.2126*(1-b),e:.7152+.2848*(1-b),f:.0722-.0722*(1-b),g:.2126-.2126*(1-b),h:.0722+.9278*(1-b)})},sepia:function(a){var b=Number.isFinite(a.amount)?a.amount:1;return joint.util.template('<filter><feColorMatrix type="matrix" values="${a} ${b} ${c} 0 0 ${d} ${e} ${f} 0 0 ${g} ${h} ${i} 0 0 0 0 0 1 0"/></filter>')({a:.393+.607*(1-b),b:.769-.769*(1-b),c:.189-.189*(1-b),d:.349-.349*(1-b),e:.686+.314*(1-b),f:.168-.168*(1-b),g:.272-.272*(1-b),h:.534-.534*(1-b),i:.131+.869*(1-b)})},saturate:function(a){var b=Number.isFinite(a.amount)?a.amount:1;return joint.util.template('<filter><feColorMatrix type="saturate" values="${amount}"/></filter>')({amount:1-b})},hueRotate:function(a){return joint.util.template('<filter><feColorMatrix type="hueRotate" values="${angle}"/></filter>')({angle:a.angle||0})},invert:function(a){var b=Number.isFinite(a.amount)?a.amount:1;return joint.util.template('<filter><feComponentTransfer><feFuncR type="table" tableValues="${amount} ${amount2}"/><feFuncG type="table" tableValues="${amount} ${amount2}"/><feFuncB type="table" tableValues="${amount} ${amount2}"/></feComponentTransfer></filter>')({amount:b,amount2:1-b})},brightness:function(a){return joint.util.template('<filter><feComponentTransfer><feFuncR type="linear" slope="${amount}"/><feFuncG type="linear" slope="${amount}"/><feFuncB type="linear" slope="${amount}"/></feComponentTransfer></filter>')({amount:Number.isFinite(a.amount)?a.amount:1})},contrast:function(a){var b=Number.isFinite(a.amount)?a.amount:1;return joint.util.template('<filter><feComponentTransfer><feFuncR type="linear" slope="${amount}" intercept="${amount2}"/><feFuncG type="linear" slope="${amount}" intercept="${amount2}"/><feFuncB type="linear" slope="${amount}" intercept="${amount2}"/></feComponentTransfer></filter>')({amount:b,amount2:.5-b/2})}},format:{number:function(a,b,c){function d(a){for(var b=a.length,d=[],e=0,f=c.grouping[0];b>0&&f>0;)d.push(a.substring(b-=f,b+f)),f=c.grouping[e=(e+1)%c.grouping.length];return d.reverse().join(c.thousands)}c=c||{currency:["$",""],decimal:".",thousands:",",grouping:[3]};var e=/(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,f=e.exec(a),g=f[1]||" ",h=f[2]||">",i=f[3]||"",j=f[4]||"",k=f[5],l=+f[6],m=f[7],n=f[8],o=f[9],p=1,q="",r="",s=!1;switch(n&&(n=+n.substring(1)),(k||"0"===g&&"="===h)&&(k=g="0",h="=",m&&(l-=Math.floor((l-1)/4))),o){case"n":m=!0,o="g";break;case"%":p=100,r="%",o="f";break;case"p":p=100,r="%",o="r";break;case"b":case"o":case"x":case"X":"#"===j&&(q="0"+o.toLowerCase());break;case"c":case"d":s=!0,n=0;break;case"s":p=-1,o="r"}"$"===j&&(q=c.currency[0],r=c.currency[1]),"r"!=o||n||(o="g"),null!=n&&("g"==o?n=Math.max(1,Math.min(21,n)):"e"!=o&&"f"!=o||(n=Math.max(0,Math.min(20,n))));var t=k&&m;if(s&&b%1)return"";var u=b<0||0===b&&1/b<0?(b=-b,"-"):i,v=r;if(p<0){var w=this.prefix(b,n);b=w.scale(b),v=w.symbol+r}else b*=p;b=this.convert(o,b,n);var x=b.lastIndexOf("."),y=x<0?b:b.substring(0,x),z=x<0?"":c.decimal+b.substring(x+1);!k&&m&&c.grouping&&(y=d(y));var A=q.length+y.length+z.length+(t?0:u.length),B=A<l?new Array(A=l-A+1).join(g):"";return t&&(y=d(B+y)),u+=q,b=y+z,("<"===h?u+b+B:">"===h?B+u+b:"^"===h?B.substring(0,A>>=1)+u+b+B.substring(A):u+(t?b:B+b))+v},string:function(a,b){for(var c,d="{",e=!1,f=[];(c=a.indexOf(d))!==-1;){var g,h,i;if(g=a.slice(0,c),e){h=g.split(":"),i=h.shift().split("."),g=b;for(var j=0;j<i.length;j++)g=g[i[j]];h.length&&(g=this.number(h,g))}f.push(g),a=a.slice(c+1),e=!e,d=e?"}":"{"}return f.push(a),f.join("")},convert:function(a,b,c){switch(a){case"b":return b.toString(2);case"c":return String.fromCharCode(b);case"o":return b.toString(8);case"x":return b.toString(16);case"X":return b.toString(16).toUpperCase();case"g":return b.toPrecision(c);case"e":return b.toExponential(c);case"f":return b.toFixed(c);case"r":return(b=this.round(b,this.precision(b,c))).toFixed(Math.max(0,Math.min(20,this.precision(b*(1+1e-15),c))));default:return b+""}},round:function(a,b){return b?Math.round(a*(b=Math.pow(10,b)))/b:Math.round(a)},precision:function(a,b){return b-(a?Math.ceil(Math.log(a)/Math.LN10):1)},prefix:function(a,b){var c=["y","z","a","f","p","n","\xb5","m","","k","M","G","T","P","E","Z","Y"].map(function(a,b){var c=Math.pow(10,3*Math.abs(8-b));return{scale:b>8?function(a){return a/c}:function(a){return a*c},symbol:a}}),d=0;return a&&(a<0&&(a*=-1),b&&(a=this.round(a,this.precision(a,b))),d=1+Math.floor(1e-12+Math.log(a)/Math.LN10),d=Math.max(-24,Math.min(24,3*Math.floor((d<=0?d+1:d-1)/3)))),c[8+d/3]}},template:function(a){var b=/<%= ([^ ]+) %>|\$\{ ?([^{} ]+) ?\}|\{\{([^{} ]+)\}\}/g;return function(c){return c=c||{},a.replace(b,function(a){for(var b=Array.from(arguments),d=b.slice(1,4).find(function(a){return!!a}),e=d.split("."),f=c[e.shift()];void 0!==f&&e.length;)f=f[e.shift()];return void 0!==f?f:""})}},toggleFullScreen:function(a){function b(a,b){for(var c=["webkit","moz","ms","o",""],d=0;d<c.length;d++){var e=c[d],f=e?e+b:b.substr(0,1).toLowerCase()+b.substr(1);if(void 0!==a[f])return joint.util.isFunction(a[f])?a[f]():a[f]}}var c=window.top.document;a=a||c.body,b(c,"FullscreenElement")||b(c,"FullScreenElement")?b(c,"ExitFullscreen")||b(c,"CancelFullScreen"):b(a,"RequestFullscreen")||b(a,"RequestFullScreen")},addClassNamePrefix:function(a){return a?a.toString().split(" ").map(function(a){return a.substr(0,joint.config.classNamePrefix.length)!==joint.config.classNamePrefix&&(a=joint.config.classNamePrefix+a),a}).join(" "):a},removeClassNamePrefix:function(a){return a?a.toString().split(" ").map(function(a){return a.substr(0,joint.config.classNamePrefix.length)===joint.config.classNamePrefix&&(a=a.substr(joint.config.classNamePrefix.length)),a}).join(" "):a},wrapWith:function(a,b,c){if(joint.util.isString(c)){if(!joint.util.wrappers[c])throw new Error('Unknown wrapper: "'+c+'"');c=joint.util.wrappers[c]}if(!joint.util.isFunction(c))throw new Error("Wrapper must be a function.");this.toArray(b).forEach(function(b){a[b]=c(a[b])})},wrappers:{cells:function(a){return function(){var b=Array.from(arguments),c=b.length,d=c>0&&b[0]||[],e=c>1&&b[c-1]||{};return Array.isArray(d)||(e instanceof joint.dia.Cell?d=b:d instanceof joint.dia.Cell&&(b.length>1&&b.pop(),d=b)),e instanceof joint.dia.Cell&&(e={}),a.call(this,d,e)}}},parseDOMJSON:function(a,b){for(var c={},d=V.namespace.xmlns,e=b||d,f=document.createDocumentFragment(),g=[a,f,e];g.length>0;){e=g.pop();for(var h=g.pop(),i=g.pop(),j=0,k=i.length;j<k;j++){var l=i[j];if(!l.hasOwnProperty("tagName"))throw new Error("json-dom-parser: missing tagName");var m=l.tagName;l.hasOwnProperty("namespaceURI")&&(e=l.namespaceURI);var n=document.createElementNS(e,m),o=e===d,p=o?V:$,q=l.attributes;q&&p(n).attr(q);var r=l.style;if(r&&$(n).css(r),l.hasOwnProperty("className")){var s=l.className;o?n.className.baseVal=s:n.className=s}if(l.hasOwnProperty("selector")){var t=l.selector;if(c[t])throw new Error("json-dom-parser: selector must be unique");c[t]=n,p(n).attr("joint-selector",t)}h.appendChild(n);var u=l.children;Array.isArray(u)&&g.push(u,n,e)}}return{fragment:f,selectors:c}},mixin:_.assign,supplement:_.defaults,deepMixin:_.mixin,deepSupplement:_.defaultsDeep,sortedIndex:_.sortedIndexBy||_.sortedIndex,uniq:_.uniqBy||_.uniq,uniqueId:_.uniqueId,sortBy:_.sortBy,isFunction:_.isFunction,result:_.result,union:_.union,invoke:_.invokeMap||_.invoke,difference:_.difference,intersection:_.intersection,omit:_.omit,pick:_.pick,has:_.has,bindAll:_.bindAll,assign:_.assign,defaults:_.defaults,defaultsDeep:_.defaultsDeep,isPlainObject:_.isPlainObject,isEmpty:_.isEmpty,isEqual:_.isEqual,cloneDeep:_.cloneDeep,toArray:_.toArray,flattenDeep:_.flattenDeep,camelCase:_.camelCase,groupBy:_.groupBy,forIn:_.forIn,without:_.without,debounce:_.debounce,clone:_.clone,merge:function(){if(_.mergeWith){var a=Array.from(arguments),b=a[a.length-1],c=this.isFunction(b)?b:this.noop;return a.push(function(a,b){var d=c(a,b);return void 0!==d?d:Array.isArray(a)&&!Array.isArray(b)?b:void 0}),_.mergeWith.apply(this,a)}return _.merge.apply(this,arguments)},noop:function(){},isBoolean:function(a){var b=Object.prototype.toString;return a===!0||a===!1||!!a&&"object"==typeof a&&"[object Boolean]"===b.call(a)},isObject:function(a){return!!a&&("object"==typeof a||"function"==typeof a)},isNumber:function(a){var b=Object.prototype.toString;return"number"==typeof a||!!a&&"object"==typeof a&&"[object Number]"===b.call(a)},isString:function(a){var b=Object.prototype.toString;return"string"==typeof a||!!a&&"object"==typeof a&&"[object String]"===b.call(a)}}};joint.mvc.View=Backbone.View.extend({options:{},theme:null,themeClassNamePrefix:joint.util.addClassNamePrefix("theme-"),requireSetThemeOverride:!1,defaultTheme:joint.config.defaultTheme,children:null,childNodes:null,constructor:function(a){this.requireSetThemeOverride=a&&!!a.theme,this.options=joint.util.assign({},this.options,a),Backbone.View.call(this,a)},initialize:function(a){joint.util.bindAll(this,"setTheme","onSetTheme","remove","onRemove"),joint.mvc.views[this.cid]=this,this.setTheme(this.options.theme||this.defaultTheme),this.init()},renderChildren:function(a){if(a||(a=this.children),a){var b=V.namespace[this.svgElement?"xmlns":"xhtml"],c=joint.util.parseDOMJSON(a,b);this.vel.empty().append(c.fragment),this.childNodes=c.selectors}return this},_ensureElement:function(){if(this.el)this.setElement(joint.util.result(this,"el"));else{var a=joint.util.result(this,"tagName"),b=joint.util.assign({},joint.util.result(this,"attributes"));this.id&&(b.id=joint.util.result(this,"id")),this.setElement(this._createElement(a)),this._setAttributes(b)}this._ensureElClassName()},_setAttributes:function(a){this.svgElement?this.vel.attr(a):this.$el.attr(a)},_createElement:function(a){return this.svgElement?document.createElementNS(V.namespace.xmlns,a):document.createElement(a)},_setElement:function(a){this.$el=a instanceof Backbone.$?a:Backbone.$(a),this.el=this.$el[0],this.svgElement&&(this.vel=V(this.el))},_ensureElClassName:function(){var a=joint.util.result(this,"className"),b=joint.util.addClassNamePrefix(a);this.svgElement?this.vel.removeClass(a).addClass(b):this.$el.removeClass(a).addClass(b)},init:function(){},onRender:function(){},setTheme:function(a,b){return b=b||{},this.theme&&this.requireSetThemeOverride&&!b.override?this:(this.removeThemeClassName(),this.addThemeClassName(a),this.onSetTheme(this.theme,a),this.theme=a,this)},addThemeClassName:function(a){a=a||this.theme;var b=this.themeClassNamePrefix+a;return this.svgElement?this.vel.addClass(b):this.$el.addClass(b),this},removeThemeClassName:function(a){a=a||this.theme;var b=this.themeClassNamePrefix+a;return this.svgElement?this.vel.removeClass(b):this.$el.removeClass(b),this},onSetTheme:function(a,b){},remove:function(){return this.onRemove(),this.undelegateDocumentEvents(),joint.mvc.views[this.cid]=null,Backbone.View.prototype.remove.apply(this,arguments),this},onRemove:function(){},getEventNamespace:function(){return".joint-event-ns-"+this.cid},delegateElementEvents:function(a,b,c){if(!b)return this;c||(c={});var d=this.getEventNamespace();for(var e in b){var f=b[e];"function"!=typeof f&&(f=this[f]),f&&$(a).on(e+d,c,f.bind(this))}return this},undelegateElementEvents:function(a){return $(a).off(this.getEventNamespace()),this},delegateDocumentEvents:function(a,b){return a||(a=joint.util.result(this,"documentEvents")),this.delegateElementEvents(document,a,b)},undelegateDocumentEvents:function(){return this.undelegateElementEvents(document)},eventData:function(a,b){if(!a)throw new Error("eventData(): event object required.");var c=a.data,d="__"+this.cid+"__";return void 0===b?c?c[d]||{}:{}:(c||(c=a.data={}),c[d]||(c[d]={}),joint.util.assign(c[d],b),this)}},{extend:function(){var a=Array.from(arguments),b=a[0]&&joint.util.assign({},a[0])||{},c=a[1]&&joint.util.assign({},a[1])||{},d=b.render||this.prototype&&this.prototype.render||null;return b.render=function(){return d&&d.apply(this,arguments),this.onRender(),this},Backbone.View.extend.call(this,b,c)}}),joint.dia.GraphCells=Backbone.Collection.extend({cellNamespace:joint.shapes,initialize:function(a,b){b.cellNamespace&&(this.cellNamespace=b.cellNamespace),this.graph=b.graph},model:function(a,b){var c=b.collection,d=c.cellNamespace,e="link"===a.type?joint.dia.Link:joint.util.getByPath(d,a.type,".")||joint.dia.Element,f=new e(a,b);return b.dry||(f.graph=c.graph),f},comparator:function(a){return a.get("z")||0}}),joint.dia.Graph=Backbone.Model.extend({_batches:{},initialize:function(a,b){b=b||{};var c=new joint.dia.GraphCells([],{model:b.cellModel,cellNamespace:b.cellNamespace,graph:this});Backbone.Model.prototype.set.call(this,"cells",c),c.on("all",this.trigger,this),this.on("change:z",this._sortOnChangeZ,this),this._out={},this._in={},this._nodes={},this._edges={},c.on("add",this._restructureOnAdd,this),c.on("remove",this._restructureOnRemove,this),c.on("reset",this._restructureOnReset,this),c.on("change:source",this._restructureOnChangeSource,this),c.on("change:target",this._restructureOnChangeTarget,this),c.on("remove",this._removeCell,this)},_sortOnChangeZ:function(){this.get("cells").sort()},_restructureOnAdd:function(a){if(a.isLink()){this._edges[a.id]=!0;var b=a.source(),c=a.target();b.id&&((this._out[b.id]||(this._out[b.id]={}))[a.id]=!0),c.id&&((this._in[c.id]||(this._in[c.id]={}))[a.id]=!0)}else this._nodes[a.id]=!0},_restructureOnRemove:function(a){if(a.isLink()){delete this._edges[a.id];var b=a.source(),c=a.target();b.id&&this._out[b.id]&&this._out[b.id][a.id]&&delete this._out[b.id][a.id],c.id&&this._in[c.id]&&this._in[c.id][a.id]&&delete this._in[c.id][a.id]}else delete this._nodes[a.id]},_restructureOnReset:function(a){a=a.models,this._out={},this._in={},this._nodes={},this._edges={},a.forEach(this._restructureOnAdd,this)},_restructureOnChangeSource:function(a){var b=a.previous("source");b.id&&this._out[b.id]&&delete this._out[b.id][a.id];var c=a.source();c.id&&((this._out[c.id]||(this._out[c.id]={}))[a.id]=!0)},_restructureOnChangeTarget:function(a){var b=a.previous("target");b.id&&this._in[b.id]&&delete this._in[b.id][a.id];var c=a.get("target");c.id&&((this._in[c.id]||(this._in[c.id]={}))[a.id]=!0)},getOutboundEdges:function(a){return this._out&&this._out[a]||{}},getInboundEdges:function(a){return this._in&&this._in[a]||{}},toJSON:function(){var a=Backbone.Model.prototype.toJSON.apply(this,arguments);return a.cells=this.get("cells").toJSON(),a},fromJSON:function(a,b){if(!a.cells)throw new Error("Graph JSON must contain cells array.");return this.set(a,b)},set:function(a,b,c){var d;return"object"==typeof a?(d=a,c=b):(d={})[a]=b,d.hasOwnProperty("cells")&&(this.resetCells(d.cells,c),d=joint.util.omit(d,"cells")),Backbone.Model.prototype.set.call(this,d,c)},clear:function(a){a=joint.util.assign({},a,{clear:!0});var b=this.get("cells");if(0===b.length)return this;this.startBatch("clear",a);var c=b.sortBy(function(a){return a.isLink()?1:2});do c.shift().remove(a);while(c.length>0);return this.stopBatch("clear"),this},_prepareCell:function(a,b){var c;if(a instanceof Backbone.Model?(c=a.attributes,a.graph||b&&b.dry||(a.graph=this)):c=a,!joint.util.isString(c.type))throw new TypeError("dia.Graph: cell type must be a string.");return a},minZIndex:function(){var a=this.get("cells").first();return a?a.get("z")||0:0},maxZIndex:function(){var a=this.get("cells").last();return a?a.get("z")||0:0},addCell:function(a,b){return Array.isArray(a)?this.addCells(a,b):(a instanceof Backbone.Model?a.has("z")||a.set("z",this.maxZIndex()+1):void 0===a.z&&(a.z=this.maxZIndex()+1),this.get("cells").add(this._prepareCell(a,b),b||{}),this)},addCells:function(a,b){return a.length&&(a=joint.util.flattenDeep(a),b.position=a.length,this.startBatch("add"),a.forEach(function(a){b.position--,this.addCell(a,b)},this),this.stopBatch("add")),this},resetCells:function(a,b){var c=joint.util.toArray(a).map(function(a){return this._prepareCell(a,b)},this);return this.get("cells").reset(c,b),this},removeCells:function(a,b){return a.length&&(this.startBatch("remove"),joint.util.invoke(a,"remove",b),this.stopBatch("remove")),this},_removeCell:function(a,b,c){c=c||{},c.clear||(c.disconnectLinks?this.disconnectLinks(a,c):this.removeLinks(a,c)),this.get("cells").remove(a,{silent:!0}),a.graph===this&&(a.graph=null)},getCell:function(a){return this.get("cells").get(a)},getCells:function(){return this.get("cells").toArray()},getElements:function(){return Object.keys(this._nodes).map(this.getCell,this)},getLinks:function(){return Object.keys(this._edges).map(this.getCell,this)},getFirstCell:function(){return this.get("cells").first()},getLastCell:function(){return this.get("cells").last()},getConnectedLinks:function(a,b){b=b||{};var c=b.inbound,d=b.outbound;void 0===c&&void 0===d&&(c=d=!0);var e=[],f={};if(d&&joint.util.forIn(this.getOutboundEdges(a.id),function(a,b){f[b]||(e.push(this.getCell(b)),f[b]=!0)}.bind(this)),c&&joint.util.forIn(this.getInboundEdges(a.id),function(a,b){f[b]||(e.push(this.getCell(b)),f[b]=!0)}.bind(this)),b.deep){var g=a.getEmbeddedCells({deep:!0}),h={};g.forEach(function(a){a.isElement()&&(h[a.id]=!0)}),g.forEach(function(a){a.isLink()||(d&&joint.util.forIn(this.getOutboundEdges(a.id),function(a,c){if(!f[c]){var d=this.getCell(c),g=d.source().id,i=d.target().id;if(!b.includeEnclosed&&g&&h[g]&&i&&h[i])return;e.push(this.getCell(c)),f[c]=!0}}.bind(this)),c&&joint.util.forIn(this.getInboundEdges(a.id),function(a,c){if(!f[c]){var d=this.getCell(c),g=d.source().id,i=d.target().id;if(!b.includeEnclosed&&g&&h[g]&&i&&h[i])return;e.push(this.getCell(c)),f[c]=!0}}.bind(this)))},this)}return e},getNeighbors:function(a,b){b=b||{};var c=b.inbound,d=b.outbound;void 0===c&&void 0===d&&(c=d=!0);var e=this.getConnectedLinks(a,b).reduce(function(e,f){var g=f.source(),h=f.target(),i=f.hasLoop(b);if(c&&joint.util.has(g,"id")&&!e[g.id]){var j=this.getCell(g.id);!i&&(!j||j===a||b.deep&&j.isEmbeddedIn(a))||(e[g.id]=j)}if(d&&joint.util.has(h,"id")&&!e[h.id]){var k=this.getCell(h.id);!i&&(!k||k===a||b.deep&&k.isEmbeddedIn(a))||(e[h.id]=k)}return e}.bind(this),{});return joint.util.toArray(e)},getCommonAncestor:function(){var a=Array.from(arguments).map(function(a){for(var b=[],c=a.get("parent");c;)b.push(c),c=this.getCell(c).get("parent");return b},this);a=a.sort(function(a,b){return a.length-b.length});var b=joint.util.toArray(a.shift()).find(function(b){return a.every(function(a){return a.includes(b)})});return this.getCell(b)},getSuccessors:function(a,b){b=b||{};var c=[];return this.search(a,function(b){b!==a&&c.push(b)},joint.util.assign({},b,{outbound:!0})),c},cloneCells:function(a){a=joint.util.uniq(a);var b=joint.util.toArray(a).reduce(function(a,b){return a[b.id]=b.clone(),a},{});return joint.util.toArray(a).forEach(function(a){var c=b[a.id];if(c.isLink()){var d=c.source(),e=c.target();d.id&&b[d.id]&&c.prop("source/id",b[d.id].id),e.id&&b[e.id]&&c.prop("target/id",b[e.id].id)}var f=a.get("parent");f&&b[f]&&c.set("parent",b[f].id);var g=joint.util.toArray(a.get("embeds")).reduce(function(a,c){return b[c]&&a.push(b[c].id),a},[]);joint.util.isEmpty(g)||c.set("embeds",g)}),b},cloneSubgraph:function(a,b){var c=this.getSubgraph(a,b);return this.cloneCells(c)},getSubgraph:function(a,b){b=b||{};var c=[],d={},e=[],f=[];return joint.util.toArray(a).forEach(function(a){if(d[a.id]||(c.push(a),d[a.id]=a,a.isLink()?f.push(a):e.push(a)),b.deep){var g=a.getEmbeddedCells({deep:!0});g.forEach(function(a){d[a.id]||(c.push(a),d[a.id]=a,a.isLink()?f.push(a):e.push(a))})}}),f.forEach(function(a){var b=a.source(),f=a.target();
if(b.id&&!d[b.id]){var g=this.getCell(b.id);c.push(g),d[g.id]=g,e.push(g)}if(f.id&&!d[f.id]){var h=this.getCell(f.id);c.push(this.getCell(f.id)),d[h.id]=h,e.push(h)}},this),e.forEach(function(a){var e=this.getConnectedLinks(a,b);e.forEach(function(a){var b=a.source(),e=a.target();!d[a.id]&&b.id&&d[b.id]&&e.id&&d[e.id]&&(c.push(a),d[a.id]=a)})},this),c},getPredecessors:function(a,b){b=b||{};var c=[];return this.search(a,function(b){b!==a&&c.push(b)},joint.util.assign({},b,{inbound:!0})),c},search:function(a,b,c){c=c||{},c.breadthFirst?this.bfs(a,b,c):this.dfs(a,b,c)},bfs:function(a,b,c){c=c||{};var d={},e={},f=[];for(f.push(a),e[a.id]=0;f.length>0;){var g=f.shift();if(!d[g.id]){if(d[g.id]=!0,b(g,e[g.id])===!1)return;this.getNeighbors(g,c).forEach(function(a){e[a.id]=e[g.id]+1,f.push(a)})}}},dfs:function(a,b,c,d,e){c=c||{};var f=d||{},g=e||0;b(a,g)!==!1&&(f[a.id]=!0,this.getNeighbors(a,c).forEach(function(a){f[a.id]||this.dfs(a,b,c,f,g+1)},this))},getSources:function(){var a=[];return joint.util.forIn(this._nodes,function(b,c){this._in[c]&&!joint.util.isEmpty(this._in[c])||a.push(this.getCell(c))}.bind(this)),a},getSinks:function(){var a=[];return joint.util.forIn(this._nodes,function(b,c){this._out[c]&&!joint.util.isEmpty(this._out[c])||a.push(this.getCell(c))}.bind(this)),a},isSource:function(a){return!this._in[a.id]||joint.util.isEmpty(this._in[a.id])},isSink:function(a){return!this._out[a.id]||joint.util.isEmpty(this._out[a.id])},isSuccessor:function(a,b){var c=!1;return this.search(a,function(d){if(d===b&&d!==a)return c=!0,!1},{outbound:!0}),c},isPredecessor:function(a,b){var c=!1;return this.search(a,function(d){if(d===b&&d!==a)return c=!0,!1},{inbound:!0}),c},isNeighbor:function(a,b,c){c=c||{};var d=c.inbound,e=c.outbound;void 0===d&&void 0===e&&(d=e=!0);var f=!1;return this.getConnectedLinks(a,c).forEach(function(a){var c=a.source(),g=a.target();return d&&joint.util.has(c,"id")&&c.id===b.id?(f=!0,!1):e&&joint.util.has(g,"id")&&g.id===b.id?(f=!0,!1):void 0}),f},disconnectLinks:function(a,b){this.getConnectedLinks(a).forEach(function(c){c.set(c.source().id===a.id?"source":"target",{x:0,y:0},b)})},removeLinks:function(a,b){joint.util.invoke(this.getConnectedLinks(a),"remove",b)},findModelsFromPoint:function(a){return this.getElements().filter(function(b){return b.getBBox().containsPoint(a)})},findModelsInArea:function(a,b){a=g.rect(a),b=joint.util.defaults(b||{},{strict:!1});var c=b.strict?"containsRect":"intersect";return this.getElements().filter(function(b){return a[c](b.getBBox())})},findModelsUnderElement:function(a,b){b=joint.util.defaults(b||{},{searchBy:"bbox"});var c=a.getBBox(),d="bbox"===b.searchBy?this.findModelsInArea(c):this.findModelsFromPoint(c[b.searchBy]());return d.filter(function(b){return a.id!==b.id&&!b.isEmbeddedIn(a)})},getBBox:function(a,b){return this.getCellsBBox(a||this.getElements(),b)},getCellsBBox:function(a,b){return joint.util.toArray(a).reduce(function(a,c){return c.isLink()?a:a?a.union(c.getBBox(b)):c.getBBox(b)},null)},translate:function(a,b,c){var d=this.getCells().filter(function(a){return!a.isEmbedded()});return joint.util.invoke(d,"translate",a,b,c),this},resize:function(a,b,c){return this.resizeCells(a,b,this.getCells(),c)},resizeCells:function(a,b,c,d){var e=this.getCellsBBox(c);if(e){var f=Math.max(a/e.width,0),g=Math.max(b/e.height,0);joint.util.invoke(c,"scale",f,g,e.origin(),d)}return this},startBatch:function(a,b){return b=b||{},this._batches[a]=(this._batches[a]||0)+1,this.trigger("batch:start",joint.util.assign({},b,{batchName:a}))},stopBatch:function(a,b){return b=b||{},this._batches[a]=(this._batches[a]||0)-1,this.trigger("batch:stop",joint.util.assign({},b,{batchName:a}))},hasActiveBatch:function(a){return 0===arguments.length?joint.util.toArray(this._batches).some(function(a){return a>0}):Array.isArray(a)?a.some(function(a){return!!this._batches[a]},this):!!this._batches[a]}},{validations:{multiLinks:function(a,b){var c=b.source(),d=b.target();if(c.id&&d.id){var e=b.getSourceElement();if(e){var f=a.getConnectedLinks(e,{outbound:!0}),g=f.filter(function(a){var b=a.source(),e=a.target();return b&&b.id===c.id&&(!b.port||b.port===c.port)&&e&&e.id===d.id&&(!e.port||e.port===d.port)});if(g.length>1)return!1}}return!0},linkPinning:function(a,b){return b.source().id&&b.target().id}}}),joint.util.wrapWith(joint.dia.Graph.prototype,["resetCells","addCells","removeCells"],"cells"),function(a,b,c,d,e){function f(a,b){return function(c,d){var f=e.isPercentage(c);c=parseFloat(c),f&&(c/=100);var g={};if(isFinite(c)){var h=f||c>=0&&c<=1?c*d[b]:Math.max(c+d[b],0);g[a]=h}return g}}function g(a,b,d){return function(f,g){var h=e.isPercentage(f);f=parseFloat(f),h&&(f/=100);var i;if(isFinite(f)){var j=g[d]();i=h||f>0&&f<1?j[a]+g[b]*f:j[a]+f}var k=c.Point();return k[a]=i||0,k}}function h(a,b,d){return function(f,g){var h;h="middle"===f?g[b]/2:f===d?g[b]:isFinite(f)?f>-1&&f<1?-g[b]*f:-f:e.isPercentage(f)?g[b]*parseFloat(f)/100:0;var i=c.Point();return i[a]=-(g[a]+h),i}}function i(a,b){var c="joint-shape",e=b&&b.resetOffset;return function(b,f,g){var h=d(g),i=h.data(c);if(!i||i.value!==b){var j=a(b);i={value:b,shape:j,shapeBBox:j.bbox()},h.data(c,i)}var k=i.shape.clone(),l=i.shapeBBox.clone(),m=l.origin(),n=f.origin();l.x=n.x,l.y=n.y;var o=f.maxRectScaleToFit(l,n),p=0===l.width||0===f.width?1:o.sx,q=0===l.height||0===f.height?1:o.sy;return k.scale(p,q,m),e&&k.translate(-m.x,-m.y),k}}function j(a){function d(a){return new c.Path(b.normalizePathData(a))}var e=i(d,a);return function(a,b,c){var d=e(a,b,c);return{d:d.serialize()}}}function k(a){var b=i(c.Polyline,a);return function(a,c,d){var e=b(a,c,d);return{points:e.serialize()}}}function l(a,b){var d=new c.Point(1,0);return function(c){var e,f,g=this[a](c);return g?(f=b.rotate?g.vector().vectorAngle(d):0,e=g.start):(e=this.path.start,f=0),0===f?{transform:"translate("+e.x+","+e.y+")"}:{transform:"translate("+e.x+","+e.y+") rotate("+f+")"}}}function m(a,b,c){return void 0!==c.text}function n(){return this instanceof a.dia.LinkView}function o(a){var b={},c=a.stroke;"string"==typeof c&&(b.stroke=c,b.fill=c);var d=a.strokeOpacity;return void 0===d&&(d=a["stroke-opacity"]),void 0===d&&(d=a.opacity),void 0!==d&&(b["stroke-opacity"]=d,b["fill-opacity"]=d),b}var p=a.dia.attributes={xlinkHref:{set:"xlink:href"},xlinkShow:{set:"xlink:show"},xlinkRole:{set:"xlink:role"},xlinkType:{set:"xlink:type"},xlinkArcrole:{set:"xlink:arcrole"},xlinkTitle:{set:"xlink:title"},xlinkActuate:{set:"xlink:actuate"},xmlSpace:{set:"xml:space"},xmlBase:{set:"xml:base"},xmlLang:{set:"xml:lang"},preserveAspectRatio:{set:"preserveAspectRatio"},requiredExtension:{set:"requiredExtension"},requiredFeatures:{set:"requiredFeatures"},systemLanguage:{set:"systemLanguage"},externalResourcesRequired:{set:"externalResourceRequired"},filter:{qualify:e.isPlainObject,set:function(a){return"url(#"+this.paper.defineFilter(a)+")"}},fill:{qualify:e.isPlainObject,set:function(a){return"url(#"+this.paper.defineGradient(a)+")"}},stroke:{qualify:e.isPlainObject,set:function(a){return"url(#"+this.paper.defineGradient(a)+")"}},sourceMarker:{qualify:e.isPlainObject,set:function(a,b,c,d){return a=e.assign(o(d),a),{"marker-start":"url(#"+this.paper.defineMarker(a)+")"}}},targetMarker:{qualify:e.isPlainObject,set:function(a,b,c,d){return a=e.assign(o(d),{transform:"rotate(180)"},a),{"marker-end":"url(#"+this.paper.defineMarker(a)+")"}}},vertexMarker:{qualify:e.isPlainObject,set:function(a,b,c,d){return a=e.assign(o(d),a),{"marker-mid":"url(#"+this.paper.defineMarker(a)+")"}}},text:{qualify:function(a,b,c){return!c.textWrap||!e.isPlainObject(c.textWrap)},set:function(c,f,g,h){var i=d(g),j="joint-text",k=i.data(j),l=a.util.pick(h,"lineHeight","annotations","textPath","x","textVerticalAnchor","eol"),m=l.fontSize=h["font-size"]||h.fontSize,n=JSON.stringify([c,l]);if(void 0===k||k!==n){m&&g.setAttribute("font-size",m);var o=l.textPath;if(e.isObject(o)){var p=o.selector;if("string"==typeof p){var q=this.findBySelector(p)[0];q instanceof SVGPathElement&&(l.textPath=e.assign({"xlink:href":"#"+q.id},o))}}b(g).text(""+c,l),i.data(j,n)}}},textWrap:{qualify:e.isPlainObject,set:function(b,c,d,f){var g=b.width||0;e.isPercentage(g)?c.width*=parseFloat(g)/100:g<=0?c.width+=g:c.width=g;var h=b.height||0;e.isPercentage(h)?c.height*=parseFloat(h)/100:h<=0?c.height+=h:c.height=h;var i,j=b.text;void 0===j&&(j=f.text),i=void 0!==j?a.util.breakText(""+j,c,{"font-weight":f["font-weight"]||f.fontWeight,"font-size":f["font-size"]||f.fontSize,"font-family":f["font-family"]||f.fontFamily,lineHeight:f.lineHeight},{svgDocument:this.paper.svg}):"",a.dia.attributes.text.set.call(this,i,c,d,f)}},title:{qualify:function(a,b){return b instanceof SVGElement},set:function(a,b,c){var e=d(c),f="joint-title",g=e.data(f);if(void 0===g||g!==a){e.data(f,a);var h=c.firstChild;if(h&&"TITLE"===h.tagName.toUpperCase())h.textContent=a;else{var i=document.createElementNS(c.namespaceURI,"title");i.textContent=a,c.insertBefore(i,h)}}}},lineHeight:{qualify:m},textVerticalAnchor:{qualify:m},textPath:{qualify:m},annotations:{qualify:m},port:{set:function(a){return null===a||void 0===a.id?a:a.id}},style:{qualify:e.isPlainObject,set:function(a,b,c){d(c).css(a)}},html:{set:function(a,b,c){d(c).html(a+"")}},ref:{},refX:{position:g("x","width","origin")},refY:{position:g("y","height","origin")},refDx:{position:g("x","width","corner")},refDy:{position:g("y","height","corner")},refWidth:{set:f("width","width")},refHeight:{set:f("height","height")},refRx:{set:f("rx","width")},refRy:{set:f("ry","height")},refRInscribed:{set:function(a){var b=f(a,"width"),c=f(a,"height");return function(a,d){var e=d.height>d.width?b:c;return e(a,d)}}("r")},refRCircumscribed:{set:function(a,b){var c=e.isPercentage(a);a=parseFloat(a),c&&(a/=100);var d,f=Math.sqrt(b.height*b.height+b.width*b.width);return isFinite(a)&&(d=c||a>=0&&a<=1?a*f:Math.max(a+f,0)),{r:d}}},refCx:{set:f("cx","width")},refCy:{set:f("cy","height")},xAlignment:{offset:h("x","width","right")},yAlignment:{offset:h("y","height","bottom")},resetOffset:{offset:function(a,b){return a?{x:-b.x,y:-b.y}:{x:0,y:0}}},refDResetOffset:{set:j({resetOffset:!0})},refDKeepOffset:{set:j({resetOffset:!1})},refPointsResetOffset:{set:k({resetOffset:!0})},refPointsKeepOffset:{set:k({resetOffset:!1})},connection:{qualify:n,set:function(){return{d:this.getSerializedConnection()}}},atConnectionLengthKeepGradient:{qualify:n,set:l("getTangentAtLength",{rotate:!0})},atConnectionLengthIgnoreGradient:{qualify:n,set:l("getTangentAtLength",{rotate:!1})},atConnectionRatioKeepGradient:{qualify:n,set:l("getTangentAtRatio",{rotate:!0})},atConnectionRatioIgnoreGradient:{qualify:n,set:l("getTangentAtRatio",{rotate:!1})}};p.refR=p.refRInscribed,p.refD=p.refDResetOffset,p.refPoints=p.refPointsResetOffset,p.atConnectionLength=p.atConnectionLengthKeepGradient,p.atConnectionRatio=p.atConnectionRatioKeepGradient,p.refX2=p.refX,p.refY2=p.refY,p["ref-x"]=p.refX,p["ref-y"]=p.refY,p["ref-dy"]=p.refDy,p["ref-dx"]=p.refDx,p["ref-width"]=p.refWidth,p["ref-height"]=p.refHeight,p["x-alignment"]=p.xAlignment,p["y-alignment"]=p.yAlignment}(joint,V,g,$,joint.util),function(a,b){var c=a.mvc.View.extend({name:null,tagName:"g",className:"tool",svgElement:!0,_visible:!0,init:function(){var a=this.name;a&&this.vel.attr("data-tool-name",a)},configure:function(a,b){return this.relatedView=a,this.paper=a.paper,this.parentView=b,this.simulateRelatedView(this.el),this},simulateRelatedView:function(a){a&&a.setAttribute("model-id",this.relatedView.model.id)},getName:function(){return this.name},show:function(){this.el.style.display="",this._visible=!0},hide:function(){this.el.style.display="none",this._visible=!1},isVisible:function(){return!!this._visible},focus:function(){var a=this.options.focusOpacity;isFinite(a)&&(this.el.style.opacity=a),this.parentView.focusTool(this)},blur:function(){this.el.style.opacity="",this.parentView.blurTool(this)},update:function(){}}),d=a.mvc.View.extend({tagName:"g",className:"tools",svgElement:!0,tools:null,options:{tools:null,relatedView:null,name:null,component:!1},configure:function(d){d=b.assign(this.options,d);var e=d.tools;if(!Array.isArray(e))return this;var f=d.relatedView;if(!(f instanceof a.dia.CellView))return this;for(var g=this.tools=[],h=0,i=e.length;h<i;h++){var j=e[h];j instanceof c&&(j.configure(f,this),j.render(),this.vel.append(j.el),g.push(j))}return this},getName:function(){return this.options.name},update:function(a){a||(a={});var b=this.tools;if(b){for(var c=0,d=b.length;c<d;c++){var e=b[c];a.tool!==e.cid&&e.isVisible()&&e.update()}return this}},focusTool:function(a){var b=this.tools;if(!b)return this;for(var c=0,d=b.length;c<d;c++){var e=b[c];a===e?e.show():e.hide()}return this},blurTool:function(a){var b=this.tools;if(!b)return this;for(var c=0,d=b.length;c<d;c++){var e=b[c];e===a||e.isVisible()||(e.show(),e.update())}return this},hide:function(){return this.focusTool(null)},show:function(){return this.blurTool(null)},onRemove:function(){var a=this.tools;if(!a)return this;for(var b=0,c=a.length;b<c;b++)a[b].remove();this.tools=null},mount:function(){var a=this.options,b=a.relatedView;if(b){var c=a.component?b.el:b.paper.tools;c.appendChild(this.el)}return this}});a.dia.ToolsView=d,a.dia.ToolView=c}(joint,joint.util),joint.dia.Cell=Backbone.Model.extend({constructor:function(a,b){var c,d=a||{};this.cid=joint.util.uniqueId("c"),this.attributes={},b&&b.collection&&(this.collection=b.collection),b&&b.parse&&(d=this.parse(d,b)||{}),(c=joint.util.result(this,"defaults"))&&(d=joint.util.merge({},c,d)),this.set(d,b),this.changed={},this.initialize.apply(this,arguments)},translate:function(a,b,c){throw new Error("Must define a translate() method.")},toJSON:function(){var a=this.constructor.prototype.defaults.attrs||{},b=this.attributes.attrs,c={};joint.util.forIn(b,function(b,d){var e=a[d];joint.util.forIn(b,function(a,b){joint.util.isObject(a)&&!Array.isArray(a)?joint.util.forIn(a,function(a,f){e&&e[b]&&joint.util.isEqual(e[b][f],a)||(c[d]=c[d]||{},(c[d][b]||(c[d][b]={}))[f]=a)}):e&&joint.util.isEqual(e[b],a)||(c[d]=c[d]||{},c[d][b]=a)})});var d=joint.util.cloneDeep(joint.util.omit(this.attributes,"attrs"));return d.attrs=c,d},initialize:function(a){a&&a.id||this.set("id",joint.util.uuid(),{silent:!0}),this._transitionIds={},this.processPorts(),this.on("change:attrs",this.processPorts,this)},processPorts:function(){var a=this.ports,b={};joint.util.forIn(this.get("attrs"),function(a,c){a&&a.port&&(void 0!==a.port.id?b[a.port.id]=a.port:b[a.port]={id:a.port})});var c={};if(joint.util.forIn(a,function(a,d){b[d]||(c[d]=!0)}),this.graph&&!joint.util.isEmpty(c)){var d=this.graph.getConnectedLinks(this,{inbound:!0});d.forEach(function(a){c[a.get("target").port]&&a.remove()});var e=this.graph.getConnectedLinks(this,{outbound:!0});e.forEach(function(a){c[a.get("source").port]&&a.remove()})}this.ports=b},remove:function(a){a=a||{};var b=this.graph;b&&b.startBatch("remove");var c=this.getParentCell();return c&&c.unembed(this),joint.util.invoke(this.getEmbeddedCells(),"remove",a),this.trigger("remove",this,this.collection,a),b&&b.stopBatch("remove"),this},toFront:function(a){var b=this.graph;if(b){a=a||{};var c,d=b.maxZIndex();a.deep?(c=this.getEmbeddedCells({deep:!0,breadthFirst:!0}),c.unshift(this)):c=[this],d=d-c.length+1;var e=b.get("cells"),f=e.indexOf(this)!==e.length-c.length;f||(f=c.some(function(a,b){return a.get("z")!==d+b})),f&&(this.startBatch("to-front"),d+=c.length,c.forEach(function(b,c){b.set("z",d+c,a)}),this.stopBatch("to-front"))}return this},toBack:function(a){var b=this.graph;if(b){a=a||{};var c,d=b.minZIndex();a.deep?(c=this.getEmbeddedCells({deep:!0,breadthFirst:!0}),c.unshift(this)):c=[this];var e=b.get("cells"),f=0!==e.indexOf(this);f||(f=c.some(function(a,b){return a.get("z")!==d+b})),f&&(this.startBatch("to-back"),d-=c.length,c.forEach(function(b,c){b.set("z",d+c,a)}),this.stopBatch("to-back"))}return this},parent:function(a,b){return void 0===a?this.get("parent"):this.set("parent",a,b)},embed:function(a,b){if(this===a||this.isEmbeddedIn(a))throw new Error("Recursive embedding not allowed.");this.startBatch("embed");var c=joint.util.assign([],this.get("embeds"));return c[a.isLink()?"unshift":"push"](a.id),a.parent(this.id,b),this.set("embeds",joint.util.uniq(c),b),this.stopBatch("embed"),this},unembed:function(a,b){return this.startBatch("unembed"),a.unset("parent",b),this.set("embeds",joint.util.without(this.get("embeds"),a.id),b),this.stopBatch("unembed"),this},getParentCell:function(){var a=this.parent(),b=this.graph;return a&&b&&b.getCell(a)||null},getAncestors:function(){var a=[];if(!this.graph)return a;for(var b=this.getParentCell();b;)a.push(b),b=b.getParentCell();return a},getEmbeddedCells:function(a){if(a=a||{},this.graph){var b;if(a.deep)if(a.breadthFirst){b=[];for(var c=this.getEmbeddedCells();c.length>0;){var d=c.shift();b.push(d),c.push.apply(c,d.getEmbeddedCells())}}else b=this.getEmbeddedCells(),b.forEach(function(c){b.push.apply(b,c.getEmbeddedCells(a))});else b=joint.util.toArray(this.get("embeds")).map(this.graph.getCell,this.graph);return b}return[]},isEmbeddedIn:function(a,b){var c=joint.util.isString(a)?a:a.id,d=this.parent();if(b=joint.util.defaults({deep:!0},b),this.graph&&b.deep){for(;d;){if(d===c)return!0;d=this.graph.getCell(d).parent()}return!1}return d===c},isEmbedded:function(){return!!this.parent()},clone:function(a){if(a=a||{},a.deep)return joint.util.toArray(joint.dia.Graph.prototype.cloneCells.call(null,[this].concat(this.getEmbeddedCells({deep:!0}))));var b=Backbone.Model.prototype.clone.apply(this,arguments);return b.set("id",joint.util.uuid()),b.unset("embeds"),b.unset("parent"),b},prop:function(a,b,c){var d="/",e=joint.util.isString(a);if(e||Array.isArray(a)){if(arguments.length>1){var f,g;e?(f=a,g=f.split("/")):(f=a.join(d),g=a.slice());var h=g[0],i=g.length;if(c=c||{},c.propertyPath=f,c.propertyValue=b,c.propertyPathArray=g,1===i)return this.set(h,b,c);for(var j={},k=j,l=h,m=1;m<i;m++){var n=g[m],o=Number.isFinite(e?Number(n):n);k=k[l]=o?[]:{},l=n}j=joint.util.setByPath(j,g,b,"/");var p=joint.util.merge({},this.attributes);c.rewrite&&joint.util.unsetByPath(p,f,"/");var q=joint.util.merge(p,j);return this.set(h,q[h],c)}return joint.util.getByPath(this.attributes,a,d)}return this.set(joint.util.merge({},this.attributes,a),b)},removeProp:function(a,b){b=b||{},b.dirty=!0;var c=Array.isArray(a)?a:a.split("/");if(1===c.length)return this.unset(a,b);var d=c[0],e=c.slice(1),f=joint.util.cloneDeep(this.get(d));return joint.util.unsetByPath(f,e,"/"),this.set(d,f,b)},attr:function(a,b,c){var d=Array.from(arguments);return 0===d.length?this.get("attrs"):(Array.isArray(a)?d[0]=["attrs"].concat(a):joint.util.isString(a)?d[0]="attrs/"+a:d[0]={attrs:a},this.prop.apply(this,d))},removeAttr:function(a,b){return Array.isArray(a)?this.removeProp(["attrs"].concat(a)):this.removeProp("attrs/"+a,b)},transition:function(a,b,c,d){d=d||"/";var e={duration:100,delay:10,timingFunction:joint.util.timing.linear,valueFunction:joint.util.interpolate.number};c=joint.util.assign(e,c);var f,g=0,h=function(b){var d,e,i;g=g||b,b-=g,e=b/c.duration,e<1?this._transitionIds[a]=d=joint.util.nextFrame(h):(e=1,delete this._transitionIds[a]),i=f(c.timingFunction(e)),c.transitionId=d,this.prop(a,i,c),d||this.trigger("transition:end",this,a)}.bind(this),i=function(e){this.stopTransitions(a),f=c.valueFunction(joint.util.getByPath(this.attributes,a,d),b),this._transitionIds[a]=joint.util.nextFrame(e),this.trigger("transition:start",this,a)}.bind(this);return setTimeout(i,c.delay,h)},getTransitions:function(){return Object.keys(this._transitionIds)},stopTransitions:function(a,b){b=b||"/";var c=a&&a.split(b);return Object.keys(this._transitionIds).filter(c&&function(a){return joint.util.isEqual(c,a.split(b).slice(0,c.length))}).forEach(function(a){joint.util.cancelFrame(this._transitionIds[a]),delete this._transitionIds[a],this.trigger("transition:end",this,a)},this),this},addTo:function(a,b){return a.addCell(this,b),this},findView:function(a){return a.findViewByModel(this)},isElement:function(){return!1},isLink:function(){return!1},startBatch:function(a,b){return this.graph&&this.graph.startBatch(a,joint.util.assign({},b,{cell:this})),this},stopBatch:function(a,b){return this.graph&&this.graph.stopBatch(a,joint.util.assign({},b,{cell:this})),this}},{getAttributeDefinition:function(a){var b=this.attributes,c=joint.dia.attributes;return b&&b[a]||c[a]},define:function(a,b,c,d){c=joint.util.assign({defaults:joint.util.defaultsDeep({type:a},b,this.prototype.defaults)},c);var e=this.extend(c,d);return joint.util.setByPath(joint.shapes,a,e,"."),e}}),joint.dia.CellView=joint.mvc.View.extend({tagName:"g",svgElement:!0,selector:"root",className:function(){var a=["cell"],b=this.model.get("type");return b&&b.toLowerCase().split(".").forEach(function(b,c,d){a.push("type-"+d.slice(0,c+1).join("-"))}),a.join(" ")},attributes:function(){return{"model-id":this.model.id}},constructor:function(a){a.id=a.id||joint.util.guid(this),joint.mvc.View.call(this,a)},init:function(){joint.util.bindAll(this,"remove","update"),this.$el.data("view",this),this.$el.attr("data-type",this.model.get("type")),this.listenTo(this.model,"change:attrs",this.onChangeAttrs)},onChangeAttrs:function(a,b,c){return c.dirty?this.render():this.update(a,b,c)},can:function(a){var b=joint.util.isFunction(this.options.interactive)?this.options.interactive(this):this.options.interactive;return joint.util.isObject(b)&&b[a]!==!1||joint.util.isBoolean(b)&&b!==!1},findBySelector:function(a,b,c){return b||(b=this.el),c||(c=this.selectors),a&&"."!==a?c&&c[a]?[c[a]]:$(b).find(a).toArray():[b]},notify:function(a){if(this.paper){var b=Array.prototype.slice.call(arguments,1);this.trigger.apply(this,[a].concat(b)),this.paper.trigger.apply(this.paper,[a,this].concat(b))}},getStrokeBBox:function(a){var b=!!a;a=a||this.el;var c,d=V(a).getBBox({target:this.paper.viewport});return c=b?V(a).attr("stroke-width"):this.model.attr("rect/stroke-width")||this.model.attr("circle/stroke-width")||this.model.attr("ellipse/stroke-width")||this.model.attr("path/stroke-width"),c=parseFloat(c)||0,g.rect(d).moveAndExpand({x:-c/2,y:-c/2,width:c,height:c})},getBBox:function(){return this.vel.getBBox({target:this.paper.svg})},highlight:function(a,b){return a=a?this.$(a)[0]||this.el:this.el,b=b||{},b.partial=a!==this.el,this.notify("cell:highlight",a,b),this},unhighlight:function(a,b){return a=a?this.$(a)[0]||this.el:this.el,b=b||{},b.partial=a!=this.el,this.notify("cell:unhighlight",a,b),this},findMagnet:function(a){var b=this.$(a),c=this.$el;0===b.length&&(b=c);do{var d=b.attr("magnet");if((d||b.is(c))&&"false"!==d)return b[0];b=b.parent()}while(b.length>0)},getSelector:function(a,b){var c;if(a===this.el)return"string"==typeof b&&(c="> "+b),c;if(a){var d=V(a).index()+1;c=a.tagName+":nth-child("+d+")",b&&(c+=" > "+b),c=this.getSelector(a.parentNode,c)}return c},getLinkEnd:function(a,b,c,d,e){var f=this.model,h=f.id,i=this.findAttribute("port",a),j=a.getAttribute("joint-selector"),k={id:h};null!=j&&(k.magnet=j),null!=i?(k.port=i,f.hasPort(i)||j||(k.selector=this.getSelector(a))):null==j&&this.el!==a&&(k.selector=this.getSelector(a));var l=this.paper,m=l.options.connectionStrategy;if("function"==typeof m){var n=m.call(l,k,this,a,new g.Point(b,c),d,e);n&&(k=n)}return k},getMagnetFromLinkEnd:function(a){var b,c=this.el,d=a.port,e=a.magnet;return null!=d&&this.model.hasPort(d)?b=this.findPortNode(d,e)||c:(e||(e=a.selector),e||null==d||(e='[port="'+d+'"]'),b=this.findBySelector(e,c,this.selectors)[0]),b},findAttribute:function(a,b){if(!b)return null;var c=b.getAttribute(a);if(null===c){if(b===this.el)return null;for(var d=b.parentNode;d&&d!==this.el&&1===d.nodeType&&(c=d.getAttribute(a),null===c);)d=d.parentNode}return c},getAttributeDefinition:function(a){return this.model.constructor.getAttributeDefinition(a)},setNodeAttributes:function(a,b){joint.util.isEmpty(b)||(a instanceof SVGElement?V(a).attr(b):$(a).attr(b))},processNodeAttributes:function(a,b){var c,d,e,f,g,h,i,j,k,l=[];for(c in b)b.hasOwnProperty(c)&&(d=b[c],e=this.getAttributeDefinition(c),!e||joint.util.isFunction(e.qualify)&&!e.qualify.call(this,d,a,b)?(h||(h={}),h[joint.util.toKebabCase(c)]=d):(joint.util.isString(e.set)&&(h||(h={}),h[e.set]=d),null!==d&&l.push(c,e)));for(f=0,g=l.length;f<g;f+=2)c=l[f],e=l[f+1],d=b[c],joint.util.isFunction(e.set)&&(i||(i={}),i[c]=d),joint.util.isFunction(e.position)&&(j||(j={}),j[c]=d),joint.util.isFunction(e.offset)&&(k||(k={}),k[c]=d);return{raw:b,normal:h,set:i,position:j,offset:k}},updateRelativeAttributes:function(a,b,c,d){d||(d={});var e,f,h,i=b.raw||{},j=b.normal||{},k=b.set,l=b.position,m=b.offset;for(e in k){f=k[e],h=this.getAttributeDefinition(e);var n=h.set.call(this,f,c.clone(),a,i);joint.util.isObject(n)?joint.util.assign(j,n):void 0!==n&&(j[e]=n)}if(a instanceof HTMLElement)return void this.setNodeAttributes(a,j);var o=j.transform,p=V.transformStringToMatrix(o),q=g.Point(p.e,p.f);o&&(j=joint.util.omit(j,"transform"),p.e=p.f=0);var r,s,t;if(l||m){var u=this.getNodeScale(a,d.scalableNode);r=u.sx,s=u.sy}var v=!1;for(e in l)f=l[e],h=this.getAttributeDefinition(e),t=h.position.call(this,f,c.clone(),a,i),t&&(q.offset(g.Point(t).scale(r,s)),v||(v=!0));this.setNodeAttributes(a,j);var w=!1;if(m){var x=a.getBoundingClientRect();if(x.width>0&&x.height>0){var y=V.transformRect(a.getBBox(),p).scale(1/r,1/s);for(e in m)f=m[e],h=this.getAttributeDefinition(e),t=h.offset.call(this,f,y,a,i),t&&(q.offset(g.Point(t).scale(r,s)),w||(w=!0))}}(void 0!==o||v||w)&&(q.round(1),p.e=q.x,p.f=q.y,a.setAttribute("transform",V.matrixToTransformString(p)))},getNodeScale:function(a,b){var c,d;if(b&&b.contains(a)){var e=b.scale();c=1/e.sx,d=1/e.sy}else c=1,d=1;return{sx:c,sy:d}},findNodesAttributes:function(a,b,c,d){var e={};for(var f in a)if(a.hasOwnProperty(f))for(var g=c[f]=this.findBySelector(f,b,d),h=0,i=g.length;h<i;h++){var j=g[h],k=V.ensureId(j),l=a[f],m=e[k];m?(m.merged||(m.merged=!0,m.attributes=joint.util.cloneDeep(m.attributes)||{}),joint.util.merge(m.attributes,l)):e[k]={attributes:l,node:j,merged:!1}}return e},updateDOMSubtreeAttributes:function(a,b,c){c||(c={}),c.rootBBox||(c.rootBBox=g.Rect()),c.selectors||(c.selectors=this.selectors);var d,e,f,h,i,j={},k={},l=[],m=c.roAttributes,n=this.findNodesAttributes(m||b,a,j,c.selectors),o=m?o=this.findNodesAttributes(b,a,j,c.selectors):n;for(var p in n)if(h=n[p],f=h.attributes,e=h.node,i=this.processNodeAttributes(e,f),i.set||i.position||i.offset){var q,r=o[p]&&o[p].attributes,s=r&&void 0===f.ref?r.ref:f.ref;if(s){if(q=(j[s]||this.findBySelector(s,a,c.selectors))[0],!q)throw new Error('dia.ElementView: "'+s+'" reference does not exist.')}else q=null;d={node:e,refNode:q,processedAttributes:i,allAttributes:r};var t=l.findIndex(function(a){return a.refNode===e});t>-1?l.splice(t,0,d):l.push(d)}else this.setNodeAttributes(e,i.normal);for(var u=0,v=l.length;u<v;u++){d=l[u],e=d.node,q=d.refNode;var w=q?V.ensureId(q):"",x=k[w];x||(x=k[w]=q?V(q).getBBox({target:c.rotatableNode||a}):c.rootBBox),m?(i=this.processNodeAttributes(e,d.allAttributes),this.mergeProcessedAttributes(i,d.processedAttributes)):i=d.processedAttributes,this.updateRelativeAttributes(e,i,x,c)}},mergeProcessedAttributes:function(a,b){a.set||(a.set={}),a.position||(a.position={}),a.offset||(a.offset={}),joint.util.assign(a.set,b.set),joint.util.assign(a.position,b.position),joint.util.assign(a.offset,b.offset);var c=a.normal&&a.normal.transform;void 0!==c&&b.normal&&(b.normal.transform=c),a.normal=b.normal},onRemove:function(){this.removeTools()},_toolsView:null,hasTools:function(a){var b=this._toolsView;return!!b&&(!a||b.getName()===a)},addTools:function(a){return this.removeTools(),a instanceof joint.dia.ToolsView&&(this._toolsView=a,a.configure({relatedView:this}),a.listenTo(this.paper,"tools:event",this.onToolEvent.bind(this)),a.mount()),this},updateTools:function(a){var b=this._toolsView;return b&&b.update(a),this},removeTools:function(){var a=this._toolsView;return a&&(a.remove(),this._toolsView=null),this},hideTools:function(){var a=this._toolsView;return a&&a.hide(),this},showTools:function(){var a=this._toolsView;return a&&a.show(),this},onToolEvent:function(a){switch(a){case"remove":this.removeTools();break;case"hide":this.hideTools();break;case"show":this.showTools()}},pointerdblclick:function(a,b,c){this.notify("cell:pointerdblclick",a,b,c)},pointerclick:function(a,b,c){this.notify("cell:pointerclick",a,b,c)},contextmenu:function(a,b,c){this.notify("cell:contextmenu",a,b,c)},pointerdown:function(a,b,c){this.model.graph&&(this.model.startBatch("pointer"),this._graph=this.model.graph),this.notify("cell:pointerdown",a,b,c)},pointermove:function(a,b,c){this.notify("cell:pointermove",a,b,c)},pointerup:function(a,b,c){this.notify("cell:pointerup",a,b,c),this._graph&&(this._graph.stopBatch("pointer",{cell:this.model}),delete this._graph)},mouseover:function(a){this.notify("cell:mouseover",a)},mouseout:function(a){this.notify("cell:mouseout",a)},mouseenter:function(a){this.notify("cell:mouseenter",a)},mouseleave:function(a){this.notify("cell:mouseleave",a)},mousewheel:function(a,b,c,d){this.notify("cell:mousewheel",a,b,c,d)},onevent:function(a,b,c,d){this.notify(b,a,c,d)},onmagnet:function(){},setInteractivity:function(a){this.options.interactive=a}},{dispatchToolsEvent:function(a,b){"string"==typeof b&&a instanceof joint.dia.Paper&&a.trigger("tools:event",b)}}),joint.dia.Element=joint.dia.Cell.extend({defaults:{position:{x:0,y:0},size:{width:1,height:1},angle:0},initialize:function(){this._initializePorts(),joint.dia.Cell.prototype.initialize.apply(this,arguments)},_initializePorts:function(){},isElement:function(){return!0},position:function(a,b,c){var d=joint.util.isNumber(b);if(c=(d?c:a)||{},c.parentRelative){if(!this.graph)throw new Error("Element must be part of a graph.");var e=this.getParentCell(),f=e&&!e.isLink()?e.get("position"):{x:0,y:0}}if(d){if(c.parentRelative&&(a+=f.x,b+=f.y),c.deep){var h=this.get("position");this.translate(a-h.x,b-h.y,c)}else this.set("position",{x:a,y:b},c);return this}var i=g.point(this.get("position"));return c.parentRelative?i.difference(f):i},translate:function(a,b,c){if(a=a||0,b=b||0,0===a&&0===b)return this;c=c||{},c.translateBy=c.translateBy||this.id;var d=this.get("position")||{x:0,y:0};if(c.restrictedArea&&c.translateBy===this.id){var e=this.getBBox({deep:!0}),f=c.restrictedArea,g=d.x-e.x,h=d.y-e.y,i=Math.max(f.x+g,Math.min(f.x+f.width+g-e.width,d.x+a)),j=Math.max(f.y+h,Math.min(f.y+f.height+h-e.height,d.y+b));a=i-d.x,b=j-d.y}var k={x:d.x+a,y:d.y+b};return c.tx=a,c.ty=b,c.transition?(joint.util.isObject(c.transition)||(c.transition={}),this.transition("position",k,joint.util.assign({},c.transition,{valueFunction:joint.util.interpolate.object}))):this.set("position",k,c),joint.util.invoke(this.getEmbeddedCells(),"translate",a,b,c),this},size:function(a,b,c){var d=this.get("size");return void 0===a?{width:d.width,height:d.height}:(joint.util.isObject(a)&&(c=b,b=joint.util.isNumber(a.height)?a.height:d.height,a=joint.util.isNumber(a.width)?a.width:d.width),this.resize(a,b,c))},resize:function(a,b,c){if(c=c||{},this.startBatch("resize",c),c.direction){var d=this.get("size");switch(c.direction){case"left":case"right":b=d.height;break;case"top":case"bottom":a=d.width}var e=g.normalizeAngle(this.get("angle")||0),f={"top-right":0,right:0,"top-left":1,top:1,"bottom-left":2,left:2,"bottom-right":3,bottom:3}[c.direction];c.absolute&&(f+=Math.floor((e+45)/90),f%=4);var h=this.getBBox(),i=h[["bottomLeft","corner","topRight","origin"][f]](),j=g.point(i).rotate(h.center(),-e),k=Math.sqrt(a*a+b*b)/2,l=f*Math.PI/2;l+=Math.atan(f%2==0?b/a:a/b),l-=g.toRad(e);var m=g.point.fromPolar(k,l,j),n=g.point(m).offset(a/-2,b/-2);this.set("size",{width:a,height:b},c),this.position(n.x,n.y,c)}else this.set("size",{width:a,height:b},c);return this.stopBatch("resize",c),this},scale:function(a,b,c,d){var e=this.getBBox().scale(a,b,c);return this.startBatch("scale",d),this.position(e.x,e.y,d),
this.resize(e.width,e.height,d),this.stopBatch("scale"),this},fitEmbeds:function(a){if(a=a||{},!this.graph)throw new Error("Element must be part of a graph.");var b=this.getEmbeddedCells();if(b.length>0){this.startBatch("fit-embeds",a),a.deep&&joint.util.invoke(b,"fitEmbeds",a);var c=this.graph.getCellsBBox(b),d=joint.util.normalizeSides(a.padding);c.moveAndExpand({x:-d.left,y:-d.top,width:d.right+d.left,height:d.bottom+d.top}),this.set({position:{x:c.x,y:c.y},size:{width:c.width,height:c.height}},a),this.stopBatch("fit-embeds")}return this},rotate:function(a,b,c,d){if(c){var e=this.getBBox().center(),f=this.get("size"),g=this.get("position");e.rotate(c,this.get("angle")-a);var h=e.x-f.width/2-g.x,i=e.y-f.height/2-g.y;this.startBatch("rotate",{angle:a,absolute:b,origin:c}),this.position(g.x+h,g.y+i,d),this.rotate(a,b,null,d),this.stopBatch("rotate")}else this.set("angle",b?a:(this.get("angle")+a)%360,d);return this},angle:function(){return g.normalizeAngle(this.get("angle")||0)},getBBox:function(a){if(a=a||{},a.deep&&this.graph){var b=this.getEmbeddedCells({deep:!0,breadthFirst:!0});return b.push(this),this.graph.getCellsBBox(b)}var c=this.get("position"),d=this.get("size");return new g.Rect(c.x,c.y,d.width,d.height)}}),joint.dia.ElementView=joint.dia.CellView.extend({_removePorts:function(){},_renderPorts:function(){},className:function(){var a=joint.dia.CellView.prototype.className.apply(this).split(" ");return a.push("element"),a.join(" ")},metrics:null,initialize:function(){joint.dia.CellView.prototype.initialize.apply(this,arguments);var a=this.model;this.listenTo(a,"change:position",this.translate),this.listenTo(a,"change:size",this.resize),this.listenTo(a,"change:angle",this.rotate),this.listenTo(a,"change:markup",this.render),this._initializePorts(),this.metrics={}},_initializePorts:function(){},update:function(a,b){this.metrics={},this._removePorts();var c=this.model,d=c.attr();this.updateDOMSubtreeAttributes(this.el,d,{rootBBox:new g.Rect(c.size()),selectors:this.selectors,scalableNode:this.scalableNode,rotatableNode:this.rotatableNode,roAttributes:b===d?null:b}),this._renderPorts()},rotatableSelector:"rotatable",scalableSelector:"scalable",scalableNode:null,rotatableNode:null,renderMarkup:function(){var a=this.model,b=a.get("markup")||a.markup;if(!b)throw new Error("dia.ElementView: markup required");if(Array.isArray(b))return this.renderJSONMarkup(b);if("string"==typeof b)return this.renderStringMarkup(b);throw new Error("dia.ElementView: invalid markup")},renderJSONMarkup:function(a){var b=joint.util.parseDOMJSON(a),c=this.selectors=b.selectors,d=this.selector;if(c[d])throw new Error("dia.ElementView: ambiguous root selector.");c[d]=this.el,this.rotatableNode=V(c[this.rotatableSelector])||null,this.scalableNode=V(c[this.scalableSelector])||null,this.vel.append(b.fragment)},renderStringMarkup:function(a){var b=this.vel;b.append(V(a)),this.rotatableNode=b.findOne(".rotatable"),this.scalableNode=b.findOne(".scalable");var c=this.selectors={};c[this.selector]=this.el},render:function(){return this.vel.empty(),this.renderMarkup(),this.scalableNode&&this.update(),this.resize(),this.rotatableNode?(this.rotate(),this.translate(),this):(this.updateTransformation(),this)},resize:function(){return this.scalableNode?this.sgResize.apply(this,arguments):(this.model.attributes.angle&&this.rotate(),void this.update())},translate:function(){return this.rotatableNode?this.rgTranslate():void this.updateTransformation()},rotate:function(){return this.rotatableNode?this.rgRotate():void this.updateTransformation()},updateTransformation:function(){var a=this.getTranslateString(),b=this.getRotateString();b&&(a+=" "+b),this.vel.attr("transform",a)},getTranslateString:function(){var a=this.model.attributes.position;return"translate("+a.x+","+a.y+")"},getRotateString:function(){var a=this.model.attributes,b=a.angle;if(!b)return null;var c=a.size;return"rotate("+b+","+c.width/2+","+c.height/2+")"},getBBox:function(a){var b;if(a&&a.useModelGeometry){var c=this.model;b=c.getBBox().bbox(c.angle())}else b=this.getNodeBBox(this.el);return this.paper.localToPaperRect(b)},nodeCache:function(a){var b=V.ensureId(a),c=this.metrics[b];return c||(c=this.metrics[b]={}),c},getNodeData:function(a){var b=this.nodeCache(a);return b.data||(b.data={}),b.data},getNodeBBox:function(a){var b=this.getNodeBoundingRect(a),c=this.getNodeMatrix(a),d=this.getRootTranslateMatrix(),e=this.getRootRotateMatrix();return V.transformRect(b,d.multiply(e).multiply(c))},getNodeBoundingRect:function(a){var b=this.nodeCache(a);return void 0===b.boundingRect&&(b.boundingRect=V(a).getBBox()),new g.Rect(b.boundingRect)},getNodeUnrotatedBBox:function(a){var b=this.getNodeBoundingRect(a),c=this.getNodeMatrix(a),d=this.getRootTranslateMatrix();return V.transformRect(b,d.multiply(c))},getNodeShape:function(a){var b=this.nodeCache(a);return void 0===b.geometryShape&&(b.geometryShape=V(a).toGeometryShape()),b.geometryShape.clone()},getNodeMatrix:function(a){var b=this.nodeCache(a);if(void 0===b.magnetMatrix){var c=this.rotatableNode||this.el;b.magnetMatrix=V(a).getTransformToElement(c)}return V.createSVGMatrix(b.magnetMatrix)},getRootTranslateMatrix:function(){var a=this.model,b=a.position(),c=V.createSVGMatrix().translate(b.x,b.y);return c},getRootRotateMatrix:function(){var a=V.createSVGMatrix(),b=this.model,c=b.angle();if(c){var d=b.getBBox(),e=d.width/2,f=d.height/2;a=a.translate(e,f).rotate(c).translate(-e,-f)}return a},rgRotate:function(){this.rotatableNode.attr("transform",this.getRotateString())},rgTranslate:function(){this.vel.attr("transform",this.getTranslateString())},sgResize:function(a,b,c){var d=this.model,e=d.get("angle")||0,f=d.get("size")||{width:1,height:1},g=this.scalableNode,h=!1;g.node.getElementsByTagName("path").length>0&&(h=!0);var i=g.getBBox({recursive:h}),j=f.width/(i.width||1),k=f.height/(i.height||1);g.attr("transform","scale("+j+","+k+")");var l=this.rotatableNode,m=l&&l.attr("transform");if(m&&null!==m){l.attr("transform",m+" rotate("+-e+","+f.width/2+","+f.height/2+")");var n=g.getBBox({target:this.paper.viewport});d.set("position",{x:n.x,y:n.y},c),this.rotate()}this.update()},prepareEmbedding:function(a){a||(a={});var b=a.model||this.model,c=a.paper||this.paper,d=c.model;b.startBatch("to-front"),b.toFront({deep:!0,ui:!0});var e=d.get("cells").max("z").get("z"),f=d.getConnectedLinks(b,{deep:!0,includeEnclosed:!0});joint.util.invoke(f,"set","z",e+1,{ui:!0}),b.stopBatch("to-front");var g=b.parent();g&&d.getCell(g).unembed(b,{ui:!0})},processEmbedding:function(a){a||(a={});var b=a.model||this.model,c=a.paper||this.paper,d=c.options,e=[];if(joint.util.isFunction(d.findParentBy)){var f=joint.util.toArray(d.findParentBy.call(c.model,this));e=f.filter(function(a){return a instanceof joint.dia.Cell&&this.model.id!==a.id&&!a.isEmbeddedIn(this.model)}.bind(this))}else e=c.model.findModelsUnderElement(b,{searchBy:d.findParentBy});d.frontParentOnly&&(e=e.slice(-1));for(var g=null,h=a.candidateEmbedView,i=e.length-1;i>=0;i--){var j=e[i];if(h&&h.model.id==j.id){g=h;break}var k=j.findView(c);if(d.validateEmbedding.call(c,this,k)){g=k;break}}g&&g!=h&&(this.clearEmbedding(a),a.candidateEmbedView=g.highlight(null,{embedding:!0})),!g&&h&&this.clearEmbedding(a)},clearEmbedding:function(a){a||(a={});var b=a.candidateEmbedView;b&&(b.unhighlight(null,{embedding:!0}),a.candidateEmbedView=null)},finalizeEmbedding:function(a){a||(a={});var b=a.candidateEmbedView,c=a.model||this.model,d=a.paper||this.paper;b&&(b.model.embed(c,{ui:!0}),b.unhighlight(null,{embedding:!0}),a.candidateEmbedView=null),joint.util.invoke(d.model.getConnectedLinks(c,{deep:!0}),"reparent",{ui:!0})},pointerdblclick:function(a,b,c){joint.dia.CellView.prototype.pointerdblclick.apply(this,arguments),this.notify("element:pointerdblclick",a,b,c)},pointerclick:function(a,b,c){joint.dia.CellView.prototype.pointerclick.apply(this,arguments),this.notify("element:pointerclick",a,b,c)},contextmenu:function(a,b,c){joint.dia.CellView.prototype.contextmenu.apply(this,arguments),this.notify("element:contextmenu",a,b,c)},pointerdown:function(a,b,c){joint.dia.CellView.prototype.pointerdown.apply(this,arguments),this.notify("element:pointerdown",a,b,c),this.dragStart(a,b,c)},pointermove:function(a,b,c){var d=this.eventData(a);switch(d.action){case"move":this.drag(a,b,c);break;case"magnet":this.dragMagnet(a,b,c)}d.stopPropagation||(joint.dia.CellView.prototype.pointermove.apply(this,arguments),this.notify("element:pointermove",a,b,c)),this.eventData(a,d)},pointerup:function(a,b,c){var d=this.eventData(a);switch(d.action){case"move":this.dragEnd(a,b,c);break;case"magnet":return void this.dragMagnetEnd(a,b,c)}d.stopPropagation||(this.notify("element:pointerup",a,b,c),joint.dia.CellView.prototype.pointerup.apply(this,arguments))},mouseover:function(a){joint.dia.CellView.prototype.mouseover.apply(this,arguments),this.notify("element:mouseover",a)},mouseout:function(a){joint.dia.CellView.prototype.mouseout.apply(this,arguments),this.notify("element:mouseout",a)},mouseenter:function(a){joint.dia.CellView.prototype.mouseenter.apply(this,arguments),this.notify("element:mouseenter",a)},mouseleave:function(a){joint.dia.CellView.prototype.mouseleave.apply(this,arguments),this.notify("element:mouseleave",a)},mousewheel:function(a,b,c,d){joint.dia.CellView.prototype.mousewheel.apply(this,arguments),this.notify("element:mousewheel",a,b,c,d)},onmagnet:function(a,b,c){this.dragMagnetStart(a,b,c);var d=this.eventData(a).stopPropagation;d&&a.stopPropagation()},dragStart:function(a,b,c){this.can("elementMove")&&this.eventData(a,{action:"move",x:b,y:c,restrictedArea:this.paper.getRestrictedArea(this)})},dragMagnetStart:function(a,b,c){if(this.can("addLinkFromMagnet")){this.model.startBatch("add-link");var d=this.paper,e=d.model,f=a.target,g=d.getDefaultLink(this,f),h=this.getLinkEnd(f,b,c,g,"source"),i={x:b,y:c};g.set({source:h,target:i}),g.addTo(e,{async:!1,ui:!0});var j=g.findView(d);joint.dia.CellView.prototype.pointerdown.apply(j,arguments),j.notify("link:pointerdown",a,b,c);var k=j.startArrowheadMove("target",{whenNotAllowed:"remove"});j.eventData(a,k),this.eventData(a,{action:"magnet",linkView:j,stopPropagation:!0}),this.paper.delegateDragEvents(this,a.data)}},drag:function(a,b,c){var d=this.paper,e=d.options.gridSize,f=this.model,h=f.position(),i=this.eventData(a),j=g.snapToGrid(h.x,e)-h.x+g.snapToGrid(b-i.x,e),k=g.snapToGrid(h.y,e)-h.y+g.snapToGrid(c-i.y,e);f.translate(j,k,{restrictedArea:i.restrictedArea,ui:!0});var l=!!i.embedding;d.options.embeddingMode&&(l||(this.prepareEmbedding(i),l=!0),this.processEmbedding(i)),this.eventData(a,{x:g.snapToGrid(b,e),y:g.snapToGrid(c,e),embedding:l})},dragMagnet:function(a,b,c){var d=this.eventData(a),e=d.linkView;e&&e.pointermove(a,b,c)},dragEnd:function(a,b,c){var d=this.eventData(a);d.embedding&&this.finalizeEmbedding(d)},dragMagnetEnd:function(a,b,c){var d=this.eventData(a),e=d.linkView;e&&e.pointerup(a,b,c),this.model.stopBatch("add-link")}}),joint.dia.Link=joint.dia.Cell.extend({markup:['<path class="connection" stroke="black" d="M 0 0 0 0"/>','<path class="marker-source" fill="black" stroke="black" d="M 0 0 0 0"/>','<path class="marker-target" fill="black" stroke="black" d="M 0 0 0 0"/>','<path class="connection-wrap" d="M 0 0 0 0"/>','<g class="labels"/>','<g class="marker-vertices"/>','<g class="marker-arrowheads"/>','<g class="link-tools"/>'].join(""),toolMarkup:['<g class="link-tool">','<g class="tool-remove" event="remove">','<circle r="11" />','<path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z" />',"<title>Remove link.</title>","</g>",'<g class="tool-options" event="link:options">','<circle r="11" transform="translate(25)"/>','<path fill="white" transform="scale(.55) translate(29, -16)" d="M31.229,17.736c0.064-0.571,0.104-1.148,0.104-1.736s-0.04-1.166-0.104-1.737l-4.377-1.557c-0.218-0.716-0.504-1.401-0.851-2.05l1.993-4.192c-0.725-0.91-1.549-1.734-2.458-2.459l-4.193,1.994c-0.647-0.347-1.334-0.632-2.049-0.849l-1.558-4.378C17.165,0.708,16.588,0.667,16,0.667s-1.166,0.041-1.737,0.105L12.707,5.15c-0.716,0.217-1.401,0.502-2.05,0.849L6.464,4.005C5.554,4.73,4.73,5.554,4.005,6.464l1.994,4.192c-0.347,0.648-0.632,1.334-0.849,2.05l-4.378,1.557C0.708,14.834,0.667,15.412,0.667,16s0.041,1.165,0.105,1.736l4.378,1.558c0.217,0.715,0.502,1.401,0.849,2.049l-1.994,4.193c0.725,0.909,1.549,1.733,2.459,2.458l4.192-1.993c0.648,0.347,1.334,0.633,2.05,0.851l1.557,4.377c0.571,0.064,1.148,0.104,1.737,0.104c0.588,0,1.165-0.04,1.736-0.104l1.558-4.377c0.715-0.218,1.399-0.504,2.049-0.851l4.193,1.993c0.909-0.725,1.733-1.549,2.458-2.458l-1.993-4.193c0.347-0.647,0.633-1.334,0.851-2.049L31.229,17.736zM16,20.871c-2.69,0-4.872-2.182-4.872-4.871c0-2.69,2.182-4.872,4.872-4.872c2.689,0,4.871,2.182,4.871,4.872C20.871,18.689,18.689,20.871,16,20.871z"/>',"<title>Link options.</title>","</g>","</g>"].join(""),doubleToolMarkup:void 0,vertexMarkup:['<g class="marker-vertex-group" transform="translate(<%= x %>, <%= y %>)">','<circle class="marker-vertex" idx="<%= idx %>" r="10" />','<path class="marker-vertex-remove-area" idx="<%= idx %>" d="M16,5.333c-7.732,0-14,4.701-14,10.5c0,1.982,0.741,3.833,2.016,5.414L2,25.667l5.613-1.441c2.339,1.317,5.237,2.107,8.387,2.107c7.732,0,14-4.701,14-10.5C30,10.034,23.732,5.333,16,5.333z" transform="translate(5, -33)"/>','<path class="marker-vertex-remove" idx="<%= idx %>" transform="scale(.8) translate(9.5, -37)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z">',"<title>Remove vertex.</title>","</path>","</g>"].join(""),arrowheadMarkup:['<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">','<path class="marker-arrowhead" end="<%= end %>" d="M 26 0 L 0 13 L 26 26 z" />',"</g>"].join(""),defaultLabel:void 0,labelMarkup:void 0,_builtins:{defaultLabel:{markup:[{tagName:"rect",selector:"rect"},{tagName:"text",selector:"text"}],attrs:{text:{fill:"#000000",fontSize:14,textAnchor:"middle",yAlignment:"middle",pointerEvents:"none"},rect:{ref:"text",fill:"#ffffff",rx:3,ry:3,refWidth:1,refHeight:1,refX:0,refY:0}},position:{distance:.5}}},defaults:{type:"link",source:{},target:{}},isLink:function(){return!0},disconnect:function(a){return this.set({source:{x:0,y:0},target:{x:0,y:0}},a)},source:function(a,b,c){if(void 0===a)return joint.util.clone(this.get("source"));var d,e,f=a instanceof joint.dia.Cell;if(f)return d=joint.util.clone(b)||{},d.id=a.id,e=c,this.set("source",d,e);var h=a instanceof g.Point;return h?(d=joint.util.clone(b)||{},d.x=a.x,d.y=a.y,e=c,this.set("source",d,e)):(d=a,e=b,this.set("source",d,e))},target:function(a,b,c){if(void 0===a)return joint.util.clone(this.get("target"));var d,e,f=a instanceof joint.dia.Cell;if(f)return d=joint.util.clone(b)||{},d.id=a.id,e=c,this.set("target",d,e);var h=a instanceof g.Point;return h?(d=joint.util.clone(b)||{},d.x=a.x,d.y=a.y,e=c,this.set("target",d,e)):(d=a,e=b,this.set("target",d,e))},router:function(a,b,c){if(void 0===a){var d=this.get("router");return d?"object"==typeof d?joint.util.clone(d):d:this.get("manhattan")?{name:"orthogonal"}:null}var e="object"==typeof a||"function"==typeof a,f=e?a:{name:a,args:b},g=e?b:c;return this.set("router",f,g)},connector:function(a,b,c){if(void 0===a){var d=this.get("connector");return d?"object"==typeof d?joint.util.clone(d):d:this.get("smooth")?{name:"smooth"}:null}var e="object"==typeof a||"function"==typeof a,f=e?a:{name:a,args:b},g=e?b:c;return this.set("connector",f,g)},label:function(a,b,c){var d=this.labels();return a=isFinite(a)&&null!==a?0|a:0,a<0&&(a=d.length+a),arguments.length<=1?this.prop(["labels",a]):this.prop(["labels",a],b,c)},labels:function(a,b){return 0===arguments.length?(a=this.get("labels"),Array.isArray(a)?a.slice():[]):(Array.isArray(a)||(a=[]),this.set("labels",a,b))},insertLabel:function(a,b,c){if(!b)throw new Error("dia.Link: no label provided");var d=this.labels(),e=d.length;return a=isFinite(a)&&null!==a?0|a:e,a<0&&(a=e+a+1),d.splice(a,0,b),this.labels(d,c)},appendLabel:function(a,b){return this.insertLabel(-1,a,b)},removeLabel:function(a,b){var c=this.labels();return a=isFinite(a)&&null!==a?0|a:-1,c.splice(a,1),this.labels(c,b)},vertex:function(a,b,c){var d=this.vertices();return a=isFinite(a)&&null!==a?0|a:0,a<0&&(a=d.length+a),arguments.length<=1?this.prop(["vertices",a]):this.prop(["vertices",a],b,c)},vertices:function(a,b){return 0===arguments.length?(a=this.get("vertices"),Array.isArray(a)?a.slice():[]):(Array.isArray(a)||(a=[]),this.set("vertices",a,b))},insertVertex:function(a,b,c){if(!b)throw new Error("dia.Link: no vertex provided");var d=this.vertices(),e=d.length;return a=isFinite(a)&&null!==a?0|a:e,a<0&&(a=e+a+1),d.splice(a,0,b),this.vertices(d,c)},removeVertex:function(a,b){var c=this.vertices();return a=isFinite(a)&&null!==a?0|a:-1,c.splice(a,1),this.vertices(c,b)},translate:function(a,b,c){return c=c||{},c.translateBy=c.translateBy||this.id,c.tx=a,c.ty=b,this.applyToPoints(function(c){return{x:(c.x||0)+a,y:(c.y||0)+b}},c)},scale:function(a,b,c,d){return this.applyToPoints(function(d){return g.point(d).scale(a,b,c).toJSON()},d)},applyToPoints:function(a,b){if(!joint.util.isFunction(a))throw new TypeError("dia.Link: applyToPoints expects its first parameter to be a function.");var c={},d=this.source();d.id||(c.source=a(d));var e=this.target();e.id||(c.target=a(e));var f=this.vertices();return f.length>0&&(c.vertices=f.map(a)),this.set(c,b)},reparent:function(a){var b;if(this.graph){var c=this.getSourceElement(),d=this.getTargetElement(),e=this.getParentCell();c&&d&&(b=c===d||c.isEmbeddedIn(d)?d:d.isEmbeddedIn(c)?c:this.graph.getCommonAncestor(c,d)),!e||b&&b.id===e.id||e.unembed(this,a),b&&b.embed(this,a)}return b},hasLoop:function(a){a=a||{};var b=this.source().id,c=this.target().id;if(!b||!c)return!1;var d=b===c;if(!d&&a.deep&&this.graph){var e=this.getSourceElement(),f=this.getTargetElement();d=e.isEmbeddedIn(f)||f.isEmbeddedIn(e)}return d},getSourceElement:function(){var a=this.source(),b=this.graph;return a&&a.id&&b&&b.getCell(a.id)||null},getTargetElement:function(){var a=this.target(),b=this.graph;return a&&a.id&&b&&b.getCell(a.id)||null},getRelationshipAncestor:function(){var a;if(this.graph){var b=[this,this.getSourceElement(),this.getTargetElement()].filter(function(a){return!!a});a=this.graph.getCommonAncestor.apply(this.graph,b)}return a||null},isRelationshipEmbeddedIn:function(a){var b=joint.util.isString(a)||joint.util.isNumber(a)?a:a.id,c=this.getRelationshipAncestor();return!!c&&(c.id===b||c.isEmbeddedIn(b))},_getDefaultLabel:function(){var a=this.get("defaultLabel")||this.defaultLabel||{},b={};return b.markup=a.markup||this.get("labelMarkup")||this.labelMarkup,b.position=a.position,b.attrs=a.attrs,b.size=a.size,b}},{endsEqual:function(a,b){var c=a.port===b.port||!a.port&&!b.port;return a.id===b.id&&c}}),joint.dia.LinkView=joint.dia.CellView.extend({className:function(){var a=joint.dia.CellView.prototype.className.apply(this).split(" ");return a.push("link"),a.join(" ")},options:{shortLinkLength:105,doubleLinkTools:!1,longLinkLength:155,linkToolsOffset:40,doubleLinkToolsOffset:65,sampleInterval:50},_labelCache:null,_labelSelectors:null,_markerCache:null,_V:null,_dragData:null,metrics:null,decimalsRounding:2,initialize:function(a){joint.dia.CellView.prototype.initialize.apply(this,arguments),"function"!=typeof this.constructor.prototype.watchSource&&(this.constructor.prototype.watchSource=this.createWatcher("source"),this.constructor.prototype.watchTarget=this.createWatcher("target")),this._labelCache={},this._labelSelectors={},this._markerCache={},this._V={},this.metrics={},this.startListening()},startListening:function(){var a=this.model;this.listenTo(a,"change:markup",this.render),this.listenTo(a,"change:smooth change:manhattan change:router change:connector",this.update),this.listenTo(a,"change:toolMarkup",this.onToolsChange),this.listenTo(a,"change:labels change:labelMarkup",this.onLabelsChange),this.listenTo(a,"change:vertices change:vertexMarkup",this.onVerticesChange),this.listenTo(a,"change:source",this.onSourceChange),this.listenTo(a,"change:target",this.onTargetChange)},onSourceChange:function(a,b,c){this.watchSource(a,b);var d=this.model;c.translateBy&&d.get("target").id&&b.id||this.update(d,null,c)},onTargetChange:function(a,b,c){this.watchTarget(a,b);var d=this.model;(!c.translateBy||d.get("source").id&&!b.id&&joint.util.isEmpty(d.get("vertices")))&&this.update(d,null,c)},onVerticesChange:function(a,b,c){this.renderVertexMarkers(),c.translateBy&&c.translateBy!==this.model.id&&!this.model.hasLoop()||this.update(a,null,c)},onToolsChange:function(){this.renderTools().updateToolsPosition()},onLabelsChange:function(a,b,c){var d=!0,e=this.model.previous("labels");if(e&&"propertyPathArray"in c&&"propertyValue"in c){var f=c.propertyPathArray||[],g=f.length;if(g>1){var h=!!e[f[1]];h&&(2===g?d="markup"in Object(c.propertyValue):"markup"!==f[2]&&(d=!1))}}d?this.renderLabels():this.updateLabels(),this.updateLabelPositions()},render:function(){this.vel.empty(),this._V={},this.renderMarkup(),this.renderLabels();var a=this.model;return this.watchSource(a,a.source()).watchTarget(a,a.target()).update(),this},renderMarkup:function(){var a=this.model,b=a.get("markup")||a.markup;if(!b)throw new Error("dia.LinkView: markup required");if(Array.isArray(b))return this.renderJSONMarkup(b);if("string"==typeof b)return this.renderStringMarkup(b);throw new Error("dia.LinkView: invalid markup")},renderJSONMarkup:function(a){var b=joint.util.parseDOMJSON(a),c=this.selectors=b.selectors,d=this.selector;if(c[d])throw new Error("dia.LinkView: ambiguous root selector.");c[d]=this.el,this.vel.append(b.fragment)},renderStringMarkup:function(a){var b=V(a);Array.isArray(b)||(b=[b]);for(var c=this._V,d=0,e=b.length;d<e;d++){var f=b[d],g=f.attr("class");g&&(g=joint.util.removeClassNamePrefix(g),c[$.camelCase(g)]=f)}this.renderTools(),this.renderVertexMarkers(),this.renderArrowheadMarkers(),this.vel.append(b)},_getLabelMarkup:function(a){if(a){if(Array.isArray(a))return this._getLabelJSONMarkup(a);if("string"==typeof a)return this._getLabelStringMarkup(a);throw new Error("dia.linkView: invalid label markup")}},_getLabelJSONMarkup:function(a){return joint.util.parseDOMJSON(a)},_getLabelStringMarkup:function(a){var b=V(a),c=document.createDocumentFragment();if(Array.isArray(b))for(var d=0,e=b.length;d<e;d++){var f=b[d].node;c.appendChild(f)}else c.append(b.node);return{fragment:c,selectors:{}}},_normalizeLabelMarkup:function(a){if(a){var b=a.fragment;if(!(a.fragment instanceof DocumentFragment&&a.fragment.hasChildNodes()))throw new Error("dia.LinkView: invalid label markup.");var c,d=b.childNodes;return d.length>1||"G"!==d[0].nodeName.toUpperCase()?(c=V("g"),c.append(b),c.addClass("label")):(c=V(d[0]),c.addClass("label")),{node:c.node,selectors:a.selectors}}},renderLabels:function(){var a=this._V,b=a.labels,c=this._labelCache={},d=this._labelSelectors={};b&&b.empty();var e=this.model,f=e.get("labels")||[],g=f.length;if(0===g)return this;b||(b=a.labels=V("g").addClass("labels").appendTo(this.el));for(var h=0;h<g;h++){var i,j,k=f[h],l=this._normalizeLabelMarkup(this._getLabelMarkup(k.markup));if(l)i=l.node,j=l.selectors;else{var m=e._builtins.defaultLabel,n=this._normalizeLabelMarkup(this._getLabelMarkup(m.markup)),o=e._getDefaultLabel(),p=this._normalizeLabelMarkup(this._getLabelMarkup(o.markup)),q=p||n;i=q.node,j=q.selectors}var r=V(i);r.attr("label-idx",h),r.appendTo(b),c[h]=r,j[this.selector]=r.node,d[h]=j}return this.updateLabels(),this},_mergeLabelAttrs:function(a,b,c,d){if(null===b)return null;if(void 0===b){if(null===c)return null;if(void 0===c){if(a)return;return d}return a?c:joint.util.merge({},d,c)}return a?joint.util.merge({},c,b):joint.util.merge({},d,c,b)},updateLabels:function(){if(!this._V.labels)return this;for(var a=this.model,b=a.get("labels")||[],c=this.can("labelMove"),d=a._builtins.defaultLabel,e=d.attrs,f=a._getDefaultLabel(),h=f.markup,i=f.attrs,j=0,k=b.length;j<k;j++){var l=this._labelCache[j];l.attr("cursor",c?"move":"default");var m=this._labelSelectors[j],n=b[j],o=n.markup,p=n.attrs,q=this._mergeLabelAttrs(o||h,p,i,e);this.updateDOMSubtreeAttributes(l.node,q,{rootBBox:new g.Rect(n.size),selectors:m})}return this},renderTools:function(){if(!this._V.linkTools)return this;var a=$(this._V.linkTools.node).empty(),b=joint.util.template(this.model.get("toolMarkup")||this.model.toolMarkup),c=V(b());if(a.append(c.node),this._toolCache=c,this.options.doubleLinkTools){var d;this.model.get("doubleToolMarkup")||this.model.doubleToolMarkup?(b=joint.util.template(this.model.get("doubleToolMarkup")||this.model.doubleToolMarkup),d=V(b())):d=c.clone(),a.append(d.node),this._tool2Cache=d}return this},renderVertexMarkers:function(){if(!this._V.markerVertices)return this;var a=$(this._V.markerVertices.node).empty(),b=joint.util.template(this.model.get("vertexMarkup")||this.model.vertexMarkup);return this.model.vertices().forEach(function(c,d){a.append(V(b(joint.util.assign({idx:d},c))).node)}),this},renderArrowheadMarkers:function(){if(!this._V.markerArrowheads)return this;var a=$(this._V.markerArrowheads.node);a.empty();var b=joint.util.template(this.model.get("arrowheadMarkup")||this.model.arrowheadMarkup);return this._V.sourceArrowhead=V(b({end:"source"})),this._V.targetArrowhead=V(b({end:"target"})),a.append(this._V.sourceArrowhead.node,this._V.targetArrowhead.node),this},update:function(a,b,c){return c||(c={}),this.updateConnection(c),this.updateDOMSubtreeAttributes(this.el,this.model.attr(),{selectors:this.selectors}),this.updateDefaultConnectionPath(),this.updateLabelPositions(),this.updateToolsPosition(),this.updateArrowheadMarkers(),this.updateTools(c),this.options.perpendicular=null,this.updatePostponed=!1,this},removeRedundantLinearVertices:function(a){for(var b=this.model,c=b.vertices(),d=[],e=c.length,f=0,h=0;h<e;h++){var i=new g.Point(c[h]).round(),j=new g.Point(d[f-1]||this.sourceAnchor).round();if(!j.equals(i)){var k=new g.Point(c[h+1]||this.targetAnchor).round();if(!j.equals(k)){var l=new g.Line(j,k);0!==l.pointOffset(i)&&(d.push(c[h]),f++)}}}return e===f?0:(b.vertices(d,a),e-f)},updateDefaultConnectionPath:function(){var a=this._V;a.connection&&a.connection.attr("d",this.getSerializedConnection()),a.connectionWrap&&a.connectionWrap.attr("d",this.getSerializedConnection()),a.markerSource&&a.markerTarget&&this._translateAndAutoOrientArrows(a.markerSource,a.markerTarget)},getEndView:function(a){switch(a){case"source":return this.sourceView||null;case"target":return this.targetView||null;default:throw new Error("dia.LinkView: type parameter required.")}},getEndAnchor:function(a){switch(a){case"source":return new g.Point(this.sourceAnchor);case"target":return new g.Point(this.targetAnchor);default:throw new Error("dia.LinkView: type parameter required.")}},getEndMagnet:function(a){switch(a){case"source":var b=this.sourceView;if(!b)break;return this.sourceMagnet||b.el;case"target":var c=this.targetView;if(!c)break;return this.targetMagnet||c.el;default:throw new Error("dia.LinkView: type parameter required.")}return null},updateConnection:function(a){a=a||{};var b,c,d=this.model;if(a.translateBy&&d.isRelationshipEmbeddedIn(a.translateBy)){var e=a.tx||0,f=a.ty||0;b=new g.Polyline(this.route).translate(e,f).points,this._translateConnectionPoints(e,f),c=this.path,c.translate(e,f)}else{var h=d.vertices(),i=this.findAnchors(h),j=this.sourceAnchor=i.source,k=this.targetAnchor=i.target;b=this.findRoute(h,a);var l=this.findConnectionPoints(b,j,k),m=this.sourcePoint=l.source,n=this.targetPoint=l.target,o=this.findMarkerPoints(b,m,n);c=this.findPath(b,o.source||m,o.target||n)}this.route=b,this.path=c,this.metrics={}},findMarkerPoints:function(a,b,c){var d,e,f=a[0],h=a[a.length-1],i=this._markerCache;return this._V.markerSource&&(i.sourceBBox=i.sourceBBox||this._V.markerSource.getBBox(),d=g.point(b).move(f||c,i.sourceBBox.width*this._V.markerSource.scale().sx*-1).round()),this._V.markerTarget&&(i.targetBBox=i.targetBBox||this._V.markerTarget.getBBox(),e=g.point(c).move(h||b,i.targetBBox.width*this._V.markerTarget.scale().sx*-1).round()),i.sourcePoint=d||b.clone(),i.targetPoint=e||c.clone(),{source:d,target:e}},findAnchors:function(a){var b,c,d,e=this.model,f=a[0],h=a[a.length-1],i=e.get("source"),j=e.get("target"),k=this.sourceView,l=this.targetView;if(k){b=this.sourceMagnet||k.el;var m;m=f?new g.Point(f):l?this.targetMagnet||l.el:new g.Point(j),d=this.getAnchor(i.anchor,k,b,m,"source")}else d=new g.Point(i);var n;if(l){c=this.targetMagnet||l.el;var o=new g.Point(h||d);n=this.getAnchor(j.anchor,l,c,o,"target")}else n=new g.Point(j);return{source:d,target:n}},findConnectionPoints:function(a,b,c){var d,e,f,h=a[0],i=a[a.length-1],j=this.model,k=j.get("source"),l=j.get("target"),m=this.sourceView,n=this.targetView,o=this.paper.options;if(m){d=this.sourceMagnet||m.el;var p=k.connectionPoint||o.defaultConnectionPoint,q=h||c,r=new g.Line(q,b);f=this.getConnectionPoint(p,m,d,r,"source")}else f=b;var s;if(n){e=this.targetMagnet||n.el;var t=l.connectionPoint||o.defaultConnectionPoint,u=i||b,v=new g.Line(u,c);s=this.getConnectionPoint(t,n,e,v,"target")}else s=c;return{source:f,target:s}},getAnchor:function(a,b,c,d,e){if(!a){var f=this.paper.options;a=f.perpendicularLinks||this.options.perpendicular?{name:"perpendicular"}:f.defaultAnchor}if(!a)throw new Error("Anchor required.");var h;if("function"==typeof a)h=a;else{var i=a.name;if(h=joint.anchors[i],"function"!=typeof h)throw new Error("Unknown anchor: "+i)}var j=h.call(this,b,c,d,a.args||{},e,this);return j?j.round(this.decimalsRounding):new g.Point},getConnectionPoint:function(a,b,c,d,e){var f,g=d.end,h=this.paper.options;if("function"==typeof h.linkConnectionPoint){var i=c===b.el?void 0:c;if(f=h.linkConnectionPoint(this,b,i,d.start,e))return f}if(!a)return g;var j;if("function"==typeof a)j=a;else{var k=a.name;if(j=joint.connectionPoints[k],"function"!=typeof j)throw new Error("Unknown connection point: "+k)}return f=j.call(this,d,b,c,a.args||{},e,this),f?f.round(this.decimalsRounding):g},_translateConnectionPoints:function(a,b){var c=this._markerCache;c.sourcePoint.offset(a,b),c.targetPoint.offset(a,b),this.sourcePoint.offset(a,b),this.targetPoint.offset(a,b),this.sourceAnchor.offset(a,b),this.targetAnchor.offset(a,b)},_normalizeLabelPosition:function(a){return"number"==typeof a?{distance:a,offset:null,args:null}:a},updateLabelPositions:function(){if(!this._V.labels)return this;var a=this.path;if(!a)return this;var b=this.model,c=b.get("labels")||[];if(!c.length)return this;for(var d=b._builtins.defaultLabel,e=d.position,f=b._getDefaultLabel(),g=this._normalizeLabelPosition(f.position),h=joint.util.merge({},e,g),i=0,j=c.length;i<j;i++){var k=c[i],l=this._normalizeLabelPosition(k.position),m=joint.util.merge({},h,l),n=this.getLabelCoordinates(m);this._labelCache[i].attr("transform","translate("+n.x+", "+n.y+")")}return this},updateToolsPosition:function(){if(!this._V.linkTools)return this;var a="",b=this.options.linkToolsOffset,c=this.getConnectionLength();if(!Number.isNaN(c)){c<this.options.shortLinkLength&&(a="scale(.5)",b/=2);var d=this.getPointAtLength(b);if(this._toolCache.attr("transform","translate("+d.x+", "+d.y+") "+a),this.options.doubleLinkTools&&c>=this.options.longLinkLength){var e=this.options.doubleLinkToolsOffset||b;d=this.getPointAtLength(c-e),this._tool2Cache.attr("transform","translate("+d.x+", "+d.y+") "+a),this._tool2Cache.attr("visibility","visible")}else this.options.doubleLinkTools&&this._tool2Cache.attr("visibility","hidden")}return this},updateArrowheadMarkers:function(){if(!this._V.markerArrowheads)return this;if("none"===$.css(this._V.markerArrowheads.node,"display"))return this;var a=this.getConnectionLength()<this.options.shortLinkLength?.5:1;return this._V.sourceArrowhead.scale(a),
this._V.targetArrowhead.scale(a),this._translateAndAutoOrientArrows(this._V.sourceArrowhead,this._V.targetArrowhead),this},createWatcher:function(a){function b(b,d){d=d||{};var e=null,f=b.previous(a)||{};return f.id&&this.stopListening(this.paper.getModelById(f.id),"change",c),d.id&&(e=this.paper.getModelById(d.id),this.listenTo(e,"change",c)),c.call(this,e,{cacheOnly:!0}),this}var c=function(b,c){this.onEndModelChange(a,b,c)};return b},onEndModelChange:function(a,b,c){var d=!c.cacheOnly,e=this.model,f=e.get(a)||{};if(b){var g=this.constructor.makeSelector(f),h="source"==a?"target":"source",i=e.get(h)||{},j=f.id,k=i.id,l=k&&this.constructor.makeSelector(i);if(c.handleBy===this.cid&&j===k&&g==l)this[a+"View"]=this[h+"View"],this[a+"Magnet"]=this[h+"Magnet"];else if(c.translateBy);else{var m=this.paper.model.getCell(j);if(!m)throw new Error("LinkView: invalid "+a+" cell.");var n=m.findView(this.paper);if(n){var o=n.getMagnetFromLinkEnd(f);o===n.el&&(o=null),this[a+"View"]=n,this[a+"Magnet"]=o}else this[a+"View"]=this[a+"Magnet"]=null}if(c.handleBy===this.cid&&c.translateBy&&e.isEmbeddedIn(b)&&!joint.util.isEmpty(e.get("vertices"))&&(d=!1),!this.updatePostponed&&k){var p=this.paper.getModelById(k);f.id===i.id&&(c.translateBy&&!joint.util.isEmpty(e.get("vertices"))&&e.isEmbeddedIn(c.translateBy)?d=!1:c.handleBy=this.cid),d&&(c.handleBy===this.cid||c.translateBy&&p.isEmbeddedIn(c.translateBy))&&(this.updatePostponed=!0,d=!1)}}else this[a+"View"]=this[a+"Magnet"]=null;d&&this.update(e,null,c)},_translateAndAutoOrientArrows:function(a,b){var c=joint.util.toArray(this.route);a&&a.translateAndAutoOrient(this.sourcePoint,c[0]||this.targetPoint,this.paper.viewport),b&&b.translateAndAutoOrient(this.targetPoint,c[c.length-1]||this.sourcePoint,this.paper.viewport)},_getDefaultLabelPositionArgs:function(){var a=this.model._getDefaultLabel(),b=a.position||{};return b.args},_getLabelPositionArgs:function(a){var b=this.model.label(a).position||{};return b.args},_mergeLabelPositionArgs:function(a,b){return null===a?null:void 0===a?null===b?null:b:joint.util.merge({},b,a)},addLabel:function(a,b,c){var d="number"!=typeof a,e=d?a.x:a,f=d?a.y:b,g=d?b:c,h=this._getDefaultLabelPositionArgs(),i=g,j=this._mergeLabelPositionArgs(i,h),k={position:this.getLabelPosition(e,f,j)},l=-1;return this.model.insertLabel(l,k,g),l},addVertex:function(a,b,c){var d="number"!=typeof a,e=d?a.x:a,f=d?a.y:b,g=d?b:c,h={x:e,y:f},i=this.getVertexIndex(e,f);return this.model.insertVertex(i,h,g),i},sendToken:function(a,b,c){function d(a,b){return function(){a.remove(),"function"==typeof b&&b()}}var e,f,g;joint.util.isObject(b)?(e=b.duration,f="reverse"===b.direction,g=b.connection):(e=b,f=!1,g=null),e=e||1e3;var h={dur:e+"ms",repeatCount:1,calcMode:"linear",fill:"freeze"};f&&(h.keyPoints="1;0",h.keyTimes="0;1");var i,j=V(a);if("string"==typeof g)i=this.findBySelector(g,this.el,this.selectors)[0];else{var k=this._V;i=k.connection?k.connection.node:this.el.querySelector("path")}if(!(i instanceof SVGPathElement))throw new Error("dia.LinkView: token animation requires a valid connection path.");j.appendTo(this.paper.viewport).animateAlongPath(h,i),setTimeout(d(j,c),e)},findRoute:function(a){a||(a=[]);var b=joint.routers,c=this.model.router(),d=this.paper.options.defaultRouter;if(!c){if(!d)return a.map(g.Point,g);c=d}var e=joint.util.isFunction(c)?c:b[c.name];if(!joint.util.isFunction(e))throw new Error('dia.LinkView: unknown router: "'+c.name+'".');var f=c.args||{},h=e.call(this,a,f,this);return h?h:a.map(g.Point,g)},findPath:function(a,b,c){var d=joint.connectors,e=this.model.connector(),f=this.paper.options.defaultConnector;e||(e=f||{});var h=joint.util.isFunction(e)?e:d[e.name];if(!joint.util.isFunction(h))throw new Error('dia.LinkView: unknown connector: "'+e.name+'".');var i=joint.util.clone(e.args||{});i.raw=!0;var j=h.call(this,b,c,a,i,this);return"string"==typeof j&&(j=new g.Path(V.normalizePathData(j))),j},getConnection:function(){var a=this.path;return a?a.clone():null},getSerializedConnection:function(){var a=this.path;if(!a)return null;var b=this.metrics;if(b.hasOwnProperty("data"))return b.data;var c=a.serialize();return b.data=c,c},getConnectionSubdivisions:function(){var a=this.path;if(!a)return null;var b=this.metrics;if(b.hasOwnProperty("segmentSubdivisions"))return b.segmentSubdivisions;var c=a.getSegmentSubdivisions();return b.segmentSubdivisions=c,c},getConnectionLength:function(){var a=this.path;if(!a)return 0;var b=this.metrics;if(b.hasOwnProperty("length"))return b.length;var c=a.length({segmentSubdivisions:this.getConnectionSubdivisions()});return b.length=c,c},getPointAtLength:function(a){var b=this.path;return b?b.pointAtLength(a,{segmentSubdivisions:this.getConnectionSubdivisions()}):null},getPointAtRatio:function(a){var b=this.path;return b?b.pointAt(a,{segmentSubdivisions:this.getConnectionSubdivisions()}):null},getTangentAtLength:function(a){var b=this.path;return b?b.tangentAtLength(a,{segmentSubdivisions:this.getConnectionSubdivisions()}):null},getTangentAtRatio:function(a){var b=this.path;return b?b.tangentAt(a,{segmentSubdivisions:this.getConnectionSubdivisions()}):null},getClosestPoint:function(a){var b=this.path;return b?b.closestPoint(a,{segmentSubdivisions:this.getConnectionSubdivisions()}):null},getClosestPointLength:function(a){var b=this.path;return b?b.closestPointLength(a,{segmentSubdivisions:this.getConnectionSubdivisions()}):null},getClosestPointRatio:function(a){var b=this.path;return b?b.closestPointNormalizedLength(a,{segmentSubdivisions:this.getConnectionSubdivisions()}):null},getLabelPosition:function(a,b,c){var d={},e=c||{};c&&(d.args=c);var f=!e.absoluteDistance,h=e.absoluteDistance&&e.reverseDistance,i=e.absoluteOffset,j=this.path,k={segmentSubdivisions:this.getConnectionSubdivisions()},l=new g.Point(a,b),m=j.closestPointT(l,k),n=j.lengthAtT(m,k);f&&(n=n/this.getConnectionLength()||0),h&&(n=-1*(this.getConnectionLength()-n)||1),d.distance=n;var o;i||(o=j.tangentAtT(m));var p;if(o)p=o.pointOffset(l);else{var q=j.pointAtT(m),r=l.difference(q);p={x:r.x,y:r.y}}return d.offset=p,d},getLabelCoordinates:function(a){var b;if("number"==typeof a)b=a;else{if("number"!=typeof a.distance)throw new Error("dia.LinkView: invalid label position distance.");b=a.distance}var c=b>0&&b<=1,d=0,e={x:0,y:0};if(a.offset){var f=a.offset;"number"==typeof f&&(d=f),f.x&&(e.x=f.x),f.y&&(e.y=f.y)}var g,h=0!==e.x||0!==e.y||0===d,i=this.path,j={segmentSubdivisions:this.getConnectionSubdivisions()},k=c?b*this.getConnectionLength():b;if(h)g=i.pointAtLength(k,j),g.offset(e);else{var l=i.tangentAtLength(k,j);l?(l.rotate(l.start,-90),l.setLength(d),g=l.end):g=i.start}return g},getVertexIndex:function(a,b){for(var c=this.model,d=c.vertices(),e=this.getClosestPointLength(new g.Point(a,b)),f=0,h=d.length;f<h;f++){var i=d[f],j=this.getClosestPointLength(i);if(e<j)break}return f},pointerdblclick:function(a,b,c){joint.dia.CellView.prototype.pointerdblclick.apply(this,arguments),this.notify("link:pointerdblclick",a,b,c)},pointerclick:function(a,b,c){joint.dia.CellView.prototype.pointerclick.apply(this,arguments),this.notify("link:pointerclick",a,b,c)},contextmenu:function(a,b,c){joint.dia.CellView.prototype.contextmenu.apply(this,arguments),this.notify("link:contextmenu",a,b,c)},pointerdown:function(a,b,c){joint.dia.CellView.prototype.pointerdown.apply(this,arguments),this.notify("link:pointerdown",a,b,c);var d=a.target.getAttribute("class");switch(d){case"marker-vertex":return void this.dragVertexStart(a,b,c);case"marker-vertex-remove":case"marker-vertex-remove-area":return void this.dragVertexRemoveStart(a,b,c);case"marker-arrowhead":return void this.dragArrowheadStart(a,b,c);case"connection":case"connection-wrap":return void this.dragConnectionStart(a,b,c);case"marker-source":case"marker-target":return}this.dragStart(a,b,c)},pointermove:function(a,b,c){var d=this._dragData;d&&this.eventData(a,d);var e=this.eventData(a);switch(e.action){case"vertex-move":this.dragVertex(a,b,c);break;case"label-move":this.dragLabel(a,b,c);break;case"arrowhead-move":this.dragArrowhead(a,b,c);break;case"move":this.drag(a,b,c)}d&&joint.util.assign(d,this.eventData(a)),joint.dia.CellView.prototype.pointermove.apply(this,arguments),this.notify("link:pointermove",a,b,c)},pointerup:function(a,b,c){var d=this._dragData;d&&(this.eventData(a,d),this._dragData=null);var e=this.eventData(a);switch(e.action){case"vertex-move":this.dragVertexEnd(a,b,c);break;case"label-move":this.dragLabelEnd(a,b,c);break;case"arrowhead-move":this.dragArrowheadEnd(a,b,c);break;case"move":this.dragEnd(a,b,c)}this.notify("link:pointerup",a,b,c),joint.dia.CellView.prototype.pointerup.apply(this,arguments)},mouseover:function(a){joint.dia.CellView.prototype.mouseover.apply(this,arguments),this.notify("link:mouseover",a)},mouseout:function(a){joint.dia.CellView.prototype.mouseout.apply(this,arguments),this.notify("link:mouseout",a)},mouseenter:function(a){joint.dia.CellView.prototype.mouseenter.apply(this,arguments),this.notify("link:mouseenter",a)},mouseleave:function(a){joint.dia.CellView.prototype.mouseleave.apply(this,arguments),this.notify("link:mouseleave",a)},mousewheel:function(a,b,c,d){joint.dia.CellView.prototype.mousewheel.apply(this,arguments),this.notify("link:mousewheel",a,b,c,d)},onevent:function(a,b,c,d){var e=V(a.target).findParentByClass("link-tool",this.el);e?this.can("useLinkTools")&&("remove"===b?(a.stopPropagation(),this.model.remove({ui:!0})):this.notify(b,a,c,d)):joint.dia.CellView.prototype.onevent.apply(this,arguments)},onlabel:function(a,b,c){joint.dia.CellView.prototype.pointerdown.apply(this,arguments),this.notify("link:pointerdown",a,b,c),this.dragLabelStart(a,b,c);var d=this.eventData(a).stopPropagation;d&&a.stopPropagation()},dragConnectionStart:function(a,b,c){if(this.can("vertexAdd")){var d=this.addVertex({x:b,y:c},{ui:!0});this.eventData(a,{action:"vertex-move",vertexIdx:d})}},dragLabelStart:function(a,b,c){if(!this.can("labelMove"))return void this.eventData(a,{stopPropagation:!0});var d=a.currentTarget,e=parseInt(d.getAttribute("label-idx"),10),f=this._getDefaultLabelPositionArgs(),g=this._getLabelPositionArgs(e),h=this._mergeLabelPositionArgs(g,f);this.eventData(a,{action:"label-move",labelIdx:e,positionArgs:h,stopPropagation:!0}),this.paper.delegateDragEvents(this,a.data)},dragVertexStart:function(a,b,c){if(this.can("vertexMove")){var d=a.target,e=parseInt(d.getAttribute("idx"),10);this.eventData(a,{action:"vertex-move",vertexIdx:e})}},dragVertexRemoveStart:function(a,b,c){if(this.can("vertexRemove")){var d=a.target,e=parseInt(d.getAttribute("idx"),10);this.model.removeVertex(e)}},dragArrowheadStart:function(a,b,c){if(this.can("arrowheadMove")){var d=a.target,e=d.getAttribute("end"),f=this.startArrowheadMove(e,{ignoreBackwardsCompatibility:!0});this.eventData(a,f)}},dragStart:function(a,b,c){this.can("linkMove")&&this.eventData(a,{action:"move",dx:b,dy:c})},dragLabel:function(a,b,c){var d=this.eventData(a),e={position:this.getLabelPosition(b,c,d.positionArgs)};this.model.label(d.labelIdx,e)},dragVertex:function(a,b,c){var d=this.eventData(a);this.model.vertex(d.vertexIdx,{x:b,y:c},{ui:!0})},dragArrowhead:function(a,b,c){var d=this.eventData(a);if(this.paper.options.snapLinks)this._snapArrowhead(b,c,d);else{var e="mousemove"===a.type?a.target:document.elementFromPoint(a.clientX,a.clientY);this._connectArrowhead(e,b,c,d)}},drag:function(a,b,c){var d=this.eventData(a);this.model.translate(b-d.dx,c-d.dy,{ui:!0}),this.eventData(a,{dx:b,dy:c})},dragLabelEnd:function(){},dragVertexEnd:function(){},dragArrowheadEnd:function(a,b,c){var d=this.eventData(a),e=this.paper;e.options.snapLinks?this._snapArrowheadEnd(d):this._connectArrowheadEnd(d,b,c),e.linkAllowed(this)?(this._finishEmbedding(d),this._notifyConnectEvent(d,a)):this._disallow(d),this._afterArrowheadMove(d),this.vel.contains(a.target)||this.mouseleave(a)},dragEnd:function(){},_disallow:function(a){switch(a.whenNotAllowed){case"remove":this.model.remove({ui:!0});break;case"revert":default:this.model.set(a.arrowhead,a.initialEnd,{ui:!0})}},_finishEmbedding:function(a){this.paper.options.embeddingMode&&this.model.reparent()&&(a.z=null)},_notifyConnectEvent:function(a,b){var c=a.arrowhead,d=a.initialEnd,e=this.model.prop(c),f=e&&!joint.dia.Link.endsEqual(d,e);if(f){var g=this.paper;d.id&&this.notify("link:disconnect",b,g.findViewByModel(d.id),a.initialMagnet,c),e.id&&this.notify("link:connect",b,g.findViewByModel(e.id),a.magnetUnderPointer,c)}},_snapArrowhead:function(a,b,c){var d=this.paper.options.snapLinks.radius||50,e=this.paper.findViewsInArea({x:a-d,y:b-d,width:2*d,height:2*d});c.closestView&&c.closestView.unhighlight(c.closestMagnet,{connecting:!0,snapping:!0}),c.closestView=c.closestMagnet=null;var f,h=Number.MAX_VALUE,i=g.point(a,b),j=this.paper;e.forEach(function(a){"false"!==a.el.getAttribute("magnet")&&(f=a.model.getBBox().center().distance(i),f<d&&f<h&&j.options.validateConnection.apply(j,c.validateConnectionArgs(a,null))&&(h=f,c.closestView=a,c.closestMagnet=a.el)),a.$("[magnet]").each(function(b,e){var g=a.getNodeBBox(e);f=i.distance({x:g.x+g.width/2,y:g.y+g.height/2}),f<d&&f<h&&j.options.validateConnection.apply(j,c.validateConnectionArgs(a,e))&&(h=f,c.closestView=a,c.closestMagnet=e)}.bind(this))},this);var k,l=c.closestView,m=c.closestMagnet,n=c.arrowhead;l?(l.highlight(m,{connecting:!0,snapping:!0}),k=l.getLinkEnd(m,a,b,this.model,n)):k={x:a,y:b},this.model.set(n,k||{x:a,y:b},{ui:!0})},_snapArrowheadEnd:function(a){var b=a.closestView,c=a.closestMagnet;b&&c&&(b.unhighlight(c,{connecting:!0,snapping:!0}),a.magnetUnderPointer=b.findMagnet(c)),a.closestView=a.closestMagnet=null},_connectArrowhead:function(a,b,c,d){d.eventTarget!==a&&(d.magnetUnderPointer&&d.viewUnderPointer.unhighlight(d.magnetUnderPointer,{connecting:!0}),d.viewUnderPointer=this.paper.findView(a),d.viewUnderPointer?(d.magnetUnderPointer=d.viewUnderPointer.findMagnet(a),d.magnetUnderPointer&&this.paper.options.validateConnection.apply(this.paper,d.validateConnectionArgs(d.viewUnderPointer,d.magnetUnderPointer))?d.magnetUnderPointer&&d.viewUnderPointer.highlight(d.magnetUnderPointer,{connecting:!0}):d.magnetUnderPointer=null):d.magnetUnderPointer=null),d.eventTarget=a,this.model.set(d.arrowhead,{x:b,y:c},{ui:!0})},_connectArrowheadEnd:function(a,b,c){var d=a.viewUnderPointer,e=a.magnetUnderPointer;if(e&&d){d.unhighlight(e,{connecting:!0});var f=a.arrowhead,g=d.getLinkEnd(e,b,c,this.model,f);this.model.set(f,g,{ui:!0})}},_beforeArrowheadMove:function(a){a.z=this.model.get("z"),this.model.toFront(),this.el.style.pointerEvents="none",this.paper.options.markAvailable&&this._markAvailableMagnets(a)},_afterArrowheadMove:function(a){null!==a.z&&(this.model.set("z",a.z,{ui:!0}),a.z=null),this.el.style.pointerEvents="visiblePainted",this.paper.options.markAvailable&&this._unmarkAvailableMagnets(a)},_createValidateConnectionArgs:function(a){function b(a,b){return c[f]=a,c[f+1]=a.el===b?void 0:b,c}var c=[];c[4]=a,c[5]=this;var d,e=0,f=0;"source"===a?(e=2,d="target"):(f=2,d="source");var g=this.model.get(d);if(g.id){var h=c[e]=this.paper.findViewByModel(g.id),i=h.getMagnetFromLinkEnd(g);i===h.el&&(i=void 0),c[e+1]=i}return b},_markAvailableMagnets:function(a){function b(a,b){var c=a.paper,d=c.options.validateConnection;return d.apply(c,this.validateConnectionArgs(a,b))}var c=this.paper,d=c.model.getElements();a.marked={};for(var e=0,f=d.length;e<f;e++){var g=d[e].findView(c);if(g){var h=Array.prototype.slice.call(g.el.querySelectorAll("[magnet]"));"false"!==g.el.getAttribute("magnet")&&h.push(g.el);var i=h.filter(b.bind(a,g));if(i.length>0){for(var j=0,k=i.length;j<k;j++)g.highlight(i[j],{magnetAvailability:!0});g.highlight(null,{elementAvailability:!0}),a.marked[g.model.id]=i}}}},_unmarkAvailableMagnets:function(a){for(var b,c,d=Object.keys(a.marked),e=0,f=d.length;e<f;e++){b=d[e],c=a.marked[b];var g=this.paper.findViewByModel(b);if(g){for(var h=0,i=c.length;h<i;h++)g.unhighlight(c[h],{magnetAvailability:!0});g.unhighlight(null,{elementAvailability:!0})}}a.marked=null},startArrowheadMove:function(a,b){b||(b={});var c={action:"arrowhead-move",arrowhead:a,whenNotAllowed:b.whenNotAllowed||"revert",initialMagnet:this[a+"Magnet"]||(this[a+"View"]?this[a+"View"].el:null),initialEnd:joint.util.clone(this.model.get(a)),validateConnectionArgs:this._createValidateConnectionArgs(a)};return this._beforeArrowheadMove(c),b.ignoreBackwardsCompatibility!==!0&&(this._dragData=c),c}},{makeSelector:function(a){var b="";return a.port?b+='[port="'+a.port+'"]':a.selector&&(b+=a.selector),b}}),Object.defineProperty(joint.dia.LinkView.prototype,"sourceBBox",{enumerable:!0,get:function(){var a=this.sourceView,b=this.sourceMagnet;if(a)return b||(b=a.el),a.getNodeBBox(b);var c=this.model.source();return new g.Rect(c.x,c.y,1,1)}}),Object.defineProperty(joint.dia.LinkView.prototype,"targetBBox",{enumerable:!0,get:function(){var a=this.targetView,b=this.targetMagnet;if(a)return b||(b=a.el),a.getNodeBBox(b);var c=this.model.target();return new g.Rect(c.x,c.y,1,1)}}),joint.dia.Paper=joint.mvc.View.extend({className:"paper",options:{width:800,height:600,origin:{x:0,y:0},gridSize:1,drawGrid:!1,background:!1,perpendicularLinks:!1,elementView:joint.dia.ElementView,linkView:joint.dia.LinkView,snapLinks:!1,multiLinks:!0,guard:function(a,b){return!1},highlighting:{default:{name:"stroke",options:{padding:3}},magnetAvailability:{name:"addClass",options:{className:"available-magnet"}},elementAvailability:{name:"addClass",options:{className:"available-cell"}}},preventContextMenu:!0,preventDefaultBlankAction:!0,restrictTranslate:!1,markAvailable:!1,defaultLink:new joint.dia.Link,defaultConnector:{name:"normal"},defaultRouter:{name:"normal"},defaultAnchor:{name:"center"},defaultConnectionPoint:{name:"bbox"},connectionStrategy:null,validateMagnet:function(a,b){return"passive"!==b.getAttribute("magnet")},validateConnection:function(a,b,c,d,e,f){return("target"===e?c:a)instanceof joint.dia.ElementView},embeddingMode:!1,validateEmbedding:function(a,b){return!0},findParentBy:"bbox",frontParentOnly:!0,interactive:{labelMove:!1},linkPinning:!0,allowLink:null,clickThreshold:0,moveThreshold:0,cellViewNamespace:joint.shapes,highlighterNamespace:joint.highlighters},events:{dblclick:"pointerdblclick",click:"pointerclick",touchend:"pointerclick",contextmenu:"contextmenu",mousedown:"pointerdown",touchstart:"pointerdown",mouseover:"mouseover",mouseout:"mouseout",mouseenter:"mouseenter",mouseleave:"mouseleave",mousewheel:"mousewheel",DOMMouseScroll:"mousewheel","mouseenter .joint-cell":"mouseenter","mouseleave .joint-cell":"mouseleave","mouseenter .joint-tools":"mouseenter","mouseleave .joint-tools":"mouseleave","mousedown .joint-cell [event]":"onevent","touchstart .joint-cell [event]":"onevent","mousedown .joint-cell [magnet]":"onmagnet","touchstart .joint-cell [magnet]":"onmagnet","mousedown .joint-link .label":"onlabel","touchstart .joint-link .label":"onlabel","dragstart .joint-cell image":"onImageDragStart"},documentEvents:{mousemove:"pointermove",touchmove:"pointermove",mouseup:"pointerup",touchend:"pointerup",touchcancel:"pointerup"},_highlights:{},init:function(){joint.util.bindAll(this,"pointerup");var a=this.model=this.options.model||new joint.dia.Graph;this.setGrid(this.options.drawGrid),this.cloneOptions(),this.render(),this.setDimensions(),this.listenTo(a,"add",this.onCellAdded).listenTo(a,"remove",this.removeView).listenTo(a,"reset",this.resetViews).listenTo(a,"sort",this._onSort).listenTo(a,"batch:stop",this._onBatchStop),this.on("cell:highlight",this.onCellHighlight).on("cell:unhighlight",this.onCellUnhighlight).on("scale translate",this.update),this._mousemoved=0,this._views={},this.$document=$(this.el.ownerDocument)},cloneOptions:function(){var a=this.options;a.origin=joint.util.assign({},a.origin),a.defaultConnector=joint.util.assign({},a.defaultConnector),a.highlighting=joint.util.defaultsDeep({},a.highlighting,this.constructor.prototype.options.highlighting)},render:function(){return this.$el.empty(),this.svg=V("svg").attr({width:"100%",height:"100%"}).node,this.viewport=V("g").addClass(joint.util.addClassNamePrefix("viewport")).node,this.defs=V("defs").node,this.tools=V("g").addClass(joint.util.addClassNamePrefix("tools-container")).node,V(this.svg).append([this.defs,this.viewport,this.tools]),this.$background=$("<div/>").addClass(joint.util.addClassNamePrefix("paper-background")),this.options.background&&this.drawBackground(this.options.background),this.$grid=$("<div/>").addClass(joint.util.addClassNamePrefix("paper-grid")),this.options.drawGrid&&this.drawGrid(),this.$el.append(this.$background,this.$grid,this.svg),this},update:function(){return this.options.drawGrid&&this.drawGrid(),this._background&&this.updateBackgroundImage(this._background),this},_viewportMatrix:null,_viewportTransformString:null,matrix:function(a){var b=this.viewport;if(void 0===a){var c=b.getAttribute("transform");return(this._viewportTransformString||null)===c?a=this._viewportMatrix:(a=b.getCTM(),this._viewportMatrix=a,this._viewportTransformString=c),V.createSVGMatrix(a)}a=V.createSVGMatrix(a);var d=V.matrixToTransformString(a);return b.setAttribute("transform",d),this.tools.setAttribute("transform",d),this._viewportMatrix=a,this._viewportTransformString=b.getAttribute("transform"),this},clientMatrix:function(){return V.createSVGMatrix(this.viewport.getScreenCTM())},_sortDelayingBatches:["add","to-front","to-back"],_onSort:function(){this.model.hasActiveBatch(this._sortDelayingBatches)||this.sortViews()},_onBatchStop:function(a){var b=a&&a.batchName;this._sortDelayingBatches.includes(b)&&!this.model.hasActiveBatch(this._sortDelayingBatches)&&this.sortViews()},onRemove:function(){this.removeViews()},setDimensions:function(a,b){a=this.options.width=a||this.options.width,b=this.options.height=b||this.options.height,this.$el.css({width:Math.round(a),height:Math.round(b)}),this.trigger("resize",a,b)},setOrigin:function(a,b){return this.translate(a||0,b||0,{absolute:!0})},fitToContent:function(a,b,c,d){joint.util.isObject(a)?(d=a,a=d.gridWidth||1,b=d.gridHeight||1,c=d.padding||0):(d=d||{},a=a||1,b=b||1,c=c||0),c=joint.util.normalizeSides(c);var e=V(this.viewport).getBBox(),f=this.scale(),g=this.translate();e.x*=f.sx,e.y*=f.sy,e.width*=f.sx,e.height*=f.sy;var h=Math.max(Math.ceil((e.width+e.x)/a),1)*a,i=Math.max(Math.ceil((e.height+e.y)/b),1)*b,j=0,k=0;("negative"==d.allowNewOrigin&&e.x<0||"positive"==d.allowNewOrigin&&e.x>=0||"any"==d.allowNewOrigin)&&(j=Math.ceil(-e.x/a)*a,j+=c.left,h+=j),("negative"==d.allowNewOrigin&&e.y<0||"positive"==d.allowNewOrigin&&e.y>=0||"any"==d.allowNewOrigin)&&(k=Math.ceil(-e.y/b)*b,k+=c.top,i+=k),h+=c.right,i+=c.bottom,h=Math.max(h,d.minWidth||0),i=Math.max(i,d.minHeight||0),h=Math.min(h,d.maxWidth||Number.MAX_VALUE),i=Math.min(i,d.maxHeight||Number.MAX_VALUE);var l=h!=this.options.width||i!=this.options.height,m=j!=g.tx||k!=g.ty;m&&this.translate(j,k),l&&this.setDimensions(h,i)},scaleContentToFit:function(a){var b=this.getContentBBox();if(b.width&&b.height){a=a||{},joint.util.defaults(a,{padding:0,preserveAspectRatio:!0,scaleGrid:null,minScale:0,maxScale:Number.MAX_VALUE});var c,d=a.padding,e=a.minScaleX||a.minScale,f=a.maxScaleX||a.maxScale,h=a.minScaleY||a.minScale,i=a.maxScaleY||a.maxScale;if(a.fittingBBox)c=a.fittingBBox;else{var j=this.translate();c={x:j.tx,y:j.ty,width:this.options.width,height:this.options.height}}c=g.rect(c).moveAndExpand({x:d,y:d,width:-2*d,height:-2*d});var k=this.scale(),l=c.width/b.width*k.sx,m=c.height/b.height*k.sy;if(a.preserveAspectRatio&&(l=m=Math.min(l,m)),a.scaleGrid){var n=a.scaleGrid;l=n*Math.floor(l/n),m=n*Math.floor(m/n)}l=Math.min(f,Math.max(e,l)),m=Math.min(i,Math.max(h,m)),this.scale(l,m);var o=this.getContentBBox(),p=c.x-o.x,q=c.y-o.y;this.translate(p,q)}},getContentArea:function(){return V(this.viewport).getBBox()},getContentBBox:function(){var a=this.viewport.getBoundingClientRect(),b=this.clientMatrix(),c=this.translate();return g.rect({x:a.left-b.e+c.tx,y:a.top-b.f+c.ty,width:a.width,height:a.height})},getArea:function(){return this.paperToLocalRect({x:0,y:0,width:this.options.width,height:this.options.height})},getRestrictedArea:function(){var a;return a=joint.util.isFunction(this.options.restrictTranslate)?this.options.restrictTranslate.apply(this,arguments):this.options.restrictTranslate===!0?this.getArea():this.options.restrictTranslate||null},createViewForModel:function(a){var b,c,d=this.options.cellViewNamespace,e=a.get("type")+"View",f=joint.util.getByPath(d,e,".");a.isLink()?(b=this.options.linkView,c=joint.dia.LinkView):(b=this.options.elementView,c=joint.dia.ElementView);var g=b.prototype instanceof Backbone.View?f||b:b.call(this,a)||f||c;return new g({model:a,interactive:this.options.interactive})},onCellAdded:function(a,b,c){if(this.options.async&&c.async!==!1&&joint.util.isNumber(c.position)){if(this._asyncCells=this._asyncCells||[],this._asyncCells.push(a),0==c.position){if(this._frameId)throw new Error("another asynchronous rendering in progress");this.asyncRenderViews(this._asyncCells,c),delete this._asyncCells}}else this.renderView(a)},removeView:function(a){var b=this._views[a.id];return b&&(b.remove(),delete this._views[a.id]),b},renderView:function(a){var b=this._views[a.id]=this.createViewForModel(a);return V(this.viewport).append(b.el),b.paper=this,b.render(),b},onImageDragStart:function(){return!1},beforeRenderViews:function(a){return a.sort(function(a){return a.isLink()?1:-1}),a},afterRenderViews:function(){this.sortViews()},resetViews:function(a,b){this.removeViews();var c=a.models.slice();if(c=this.beforeRenderViews(c,b)||c,this.cancelRenderViews(),this.options.async)this.asyncRenderViews(c,b);else{for(var d=0,e=c.length;d<e;d++)this.renderView(c[d]);this.sortViews()}},cancelRenderViews:function(){this._frameId&&(joint.util.cancelFrame(this._frameId),delete this._frameId)},removeViews:function(){joint.util.invoke(this._views,"remove"),this._views={}},asyncBatchAdded:joint.util.noop,asyncRenderViews:function(a,b){if(this._frameId){var c=this.options.async&&this.options.async.batchSize||50,d=a.splice(0,c);d.forEach(function(a){a.graph===this.model&&this.renderView(a)},this),this.asyncBatchAdded()}a.length?this._frameId=joint.util.nextFrame(function(){this.asyncRenderViews(a,b)},this):(delete this._frameId,this.afterRenderViews(b),this.trigger("render:done",b))},sortViews:function(){var a=$(this.viewport).children("[model-id]"),b=this.model.get("cells");joint.util.sortElements(a,function(a,c){var d=b.get($(a).attr("model-id")),e=b.get($(c).attr("model-id"));return(d.get("z")||0)>(e.get("z")||0)?1:-1})},scale:function(a,b,c,d){if(void 0===a)return V.matrixToScale(this.matrix());void 0===b&&(b=a),void 0===c&&(c=0,d=0);var e=this.translate();if(c||d||e.tx||e.ty){var f=e.tx-c*(a-1),g=e.ty-d*(b-1);this.translate(f,g)}var h=this.matrix();return h.a=a||0,h.d=b||0,this.matrix(h),this.trigger("scale",a,b,c,d),this},rotate:function(a,b,c){if(void 0===a)return V.matrixToRotate(this.matrix());if(void 0===b){var d=this.viewport.getBBox();b=d.width/2,c=d.height/2}var e=this.matrix().translate(b,c).rotate(a).translate(-b,-c);return this.matrix(e),this},translate:function(a,b){if(void 0===a)return V.matrixToTranslate(this.matrix());var c=this.matrix();c.e=a||0,c.f=b||0,this.matrix(c);var d=this.translate(),e=this.options.origin;return e.x=d.tx,e.y=d.ty,this.trigger("translate",d.tx,d.ty),this.options.drawGrid&&this.drawGrid(),this},findView:function(a){for(var b=joint.util.isString(a)?this.viewport.querySelector(a):a instanceof $?a[0]:a;b&&b!==this.el&&b!==document;){var c=b.getAttribute("model-id");if(c)return this._views[c];b=b.parentNode}},findViewByModel:function(a){var b=joint.util.isString(a)||joint.util.isNumber(a)?a:a&&a.id;return this._views[b]},findViewsFromPoint:function(a){a=g.point(a);var b=this.model.getElements().map(this.findViewByModel,this);return b.filter(function(b){return b&&b.vel.getBBox({target:this.viewport}).containsPoint(a)},this)},findViewsInArea:function(a,b){b=joint.util.defaults(b||{},{strict:!1}),a=g.rect(a);var c=this.model.getElements().map(this.findViewByModel,this),d=b.strict?"containsRect":"intersect";return c.filter(function(b){return b&&a[d](b.vel.getBBox({target:this.viewport}))},this)},removeTools:function(){return joint.dia.CellView.dispatchToolsEvent(this,"remove"),this},hideTools:function(){return joint.dia.CellView.dispatchToolsEvent(this,"hide"),this},showTools:function(){return joint.dia.CellView.dispatchToolsEvent(this,"show"),this},getModelById:function(a){return this.model.getCell(a)},snapToGrid:function(a,b){return this.clientToLocalPoint(a,b).snapToGrid(this.options.gridSize)},localToPaperPoint:function(a,b){var c=g.Point(a,b),d=V.transformPoint(c,this.matrix());return g.Point(d)},localToPaperRect:function(a,b,c,d){var e=g.Rect(a,b),f=V.transformRect(e,this.matrix());return g.Rect(f)},paperToLocalPoint:function(a,b){var c=g.Point(a,b),d=V.transformPoint(c,this.matrix().inverse());return g.Point(d)},paperToLocalRect:function(a,b,c,d){var e=g.Rect(a,b,c,d),f=V.transformRect(e,this.matrix().inverse());return g.Rect(f)},localToClientPoint:function(a,b){var c=g.Point(a,b),d=V.transformPoint(c,this.clientMatrix());return g.Point(d)},localToClientRect:function(a,b,c,d){var e=g.Rect(a,b,c,d),f=V.transformRect(e,this.clientMatrix());return g.Rect(f)},clientToLocalPoint:function(a,b){var c=g.Point(a,b),d=V.transformPoint(c,this.clientMatrix().inverse());return g.Point(d)},clientToLocalRect:function(a,b,c,d){var e=g.Rect(a,b,c,d),f=V.transformRect(e,this.clientMatrix().inverse());return g.Rect(f)},localToPagePoint:function(a,b){return this.localToPaperPoint(a,b).offset(this.pageOffset())},localToPageRect:function(a,b,c,d){return this.localToPaperRect(a,b,c,d).moveAndExpand(this.pageOffset())},pageToLocalPoint:function(a,b){var c=g.Point(a,b),d=c.difference(this.pageOffset());return this.paperToLocalPoint(d)},pageToLocalRect:function(a,b,c,d){var e=this.pageOffset(),f=g.Rect(a,b,c,d);return f.x-=e.x,f.y-=e.y,this.paperToLocalRect(f)},clientOffset:function(){var a=this.svg.getBoundingClientRect();return g.Point(a.left,a.top)},pageOffset:function(){return this.clientOffset().offset(window.scrollX,window.scrollY)},linkAllowed:function(a){if(!(a instanceof joint.dia.LinkView))throw new Error("Must provide a linkView.");var b=a.model,c=this.options,d=this.model,e=d.constructor.validations;return!(!c.multiLinks&&!e.multiLinks.call(this,d,b))&&(!(!c.linkPinning&&!e.linkPinning.call(this,d,b))&&!("function"==typeof c.allowLink&&!c.allowLink.call(this,a,this)))},getDefaultLink:function(a,b){return joint.util.isFunction(this.options.defaultLink)?this.options.defaultLink.call(this,a,b):this.options.defaultLink.clone()},resolveHighlighter:function(a){a=a||{};var b=a.highlighter,c=this.options;if(void 0===b){var d=["embedding","connecting","magnetAvailability","elementAvailability"].find(function(b){return!!a[b]});b=d&&c.highlighting[d]||c.highlighting.default}if(!b)return!1;joint.util.isString(b)&&(b={name:b});var e=b.name,f=c.highlighterNamespace[e];if(!f)throw new Error('Unknown highlighter ("'+e+'")');if("function"!=typeof f.highlight)throw new Error('Highlighter ("'+e+'") is missing required highlight() method');if("function"!=typeof f.unhighlight)throw new Error('Highlighter ("'+e+'") is missing required unhighlight() method');return{highlighter:f,options:b.options||{},name:e}},onCellHighlight:function(a,b,c){if(c=this.resolveHighlighter(c)){b.id||(b.id=V.uniqueId());var d=c.name+b.id+JSON.stringify(c.options);if(!this._highlights[d]){var e=c.highlighter;e.highlight(a,b,joint.util.assign({},c.options)),this._highlights[d]={cellView:a,magnetEl:b,opt:c.options,highlighter:e}}}},onCellUnhighlight:function(a,b,c){if(c=this.resolveHighlighter(c)){var d=c.name+b.id+JSON.stringify(c.options),e=this._highlights[d];e&&(e.highlighter.unhighlight(e.cellView,e.magnetEl,e.opt),this._highlights[d]=null)}},pointerdblclick:function(a){a.preventDefault(),a=joint.util.normalizeEvent(a);var b=this.findView(a.target);
if(!this.guard(a,b)){var c=this.snapToGrid({x:a.clientX,y:a.clientY});b?b.pointerdblclick(a,c.x,c.y):this.trigger("blank:pointerdblclick",a,c.x,c.y)}},pointerclick:function(a){if(this._mousemoved<=this.options.clickThreshold){a=joint.util.normalizeEvent(a);var b=this.findView(a.target);if(this.guard(a,b))return;var c=this.snapToGrid({x:a.clientX,y:a.clientY});b?b.pointerclick(a,c.x,c.y):this.trigger("blank:pointerclick",a,c.x,c.y)}},contextmenu:function(a){this.options.preventContextMenu&&a.preventDefault(),a=joint.util.normalizeEvent(a);var b=this.findView(a.target);if(!this.guard(a,b)){var c=this.snapToGrid({x:a.clientX,y:a.clientY});b?b.contextmenu(a,c.x,c.y):this.trigger("blank:contextmenu",a,c.x,c.y)}},pointerdown:function(a){a=joint.util.normalizeEvent(a);var b=this.findView(a.target);if(!this.guard(a,b)){var c=this.snapToGrid({x:a.clientX,y:a.clientY});b?(a.preventDefault(),b.pointerdown(a,c.x,c.y)):(this.options.preventDefaultBlankAction&&a.preventDefault(),this.trigger("blank:pointerdown",a,c.x,c.y)),this.delegateDragEvents(b,a.data)}},pointermove:function(a){a.preventDefault();var b=this.eventData(a);b.mousemoved||(b.mousemoved=0);var c=++b.mousemoved;if(!(c<=this.options.moveThreshold)){a=joint.util.normalizeEvent(a);var d=this.snapToGrid({x:a.clientX,y:a.clientY}),e=b.sourceView;e?e.pointermove(a,d.x,d.y):this.trigger("blank:pointermove",a,d.x,d.y),this.eventData(a,b)}},pointerup:function(a){this.undelegateDocumentEvents(),a=joint.util.normalizeEvent(a);var b=this.snapToGrid({x:a.clientX,y:a.clientY}),c=this.eventData(a).sourceView;c?c.pointerup(a,b.x,b.y):this.trigger("blank:pointerup",a,b.x,b.y),this.delegateEvents()},mouseover:function(a){a=joint.util.normalizeEvent(a);var b=this.findView(a.target);if(!this.guard(a,b))if(b)b.mouseover(a);else{if(this.el===a.target)return;this.trigger("blank:mouseover",a)}},mouseout:function(a){a=joint.util.normalizeEvent(a);var b=this.findView(a.target);if(!this.guard(a,b))if(b)b.mouseout(a);else{if(this.el===a.target)return;this.trigger("blank:mouseout",a)}},mouseenter:function(a){a=joint.util.normalizeEvent(a);var b=this.findView(a.target);if(!this.guard(a,b)){var c=this.findView(a.relatedTarget);if(b){if(c===b)return;b.mouseenter(a)}else{if(c)return;this.trigger("paper:mouseenter",a)}}},mouseleave:function(a){a=joint.util.normalizeEvent(a);var b=this.findView(a.target);if(!this.guard(a,b)){var c=this.findView(a.relatedTarget);if(b){if(c===b)return;b.mouseleave(a)}else{if(c)return;this.trigger("paper:mouseleave",a)}}},mousewheel:function(a){a=joint.util.normalizeEvent(a);var b=this.findView(a.target);if(!this.guard(a,b)){var c=a.originalEvent,d=this.snapToGrid({x:c.clientX,y:c.clientY}),e=Math.max(-1,Math.min(1,c.wheelDelta||-c.detail));b?b.mousewheel(a,d.x,d.y,e):this.trigger("blank:mousewheel",a,d.x,d.y,e)}},onevent:function(a){var b=a.currentTarget,c=b.getAttribute("event");if(c){var d=this.findView(b);if(d){if(a=joint.util.normalizeEvent(a),this.guard(a,d))return;var e=this.snapToGrid({x:a.clientX,y:a.clientY});d.onevent(a,c,e.x,e.y)}}},onmagnet:function(a){var b=a.currentTarget,c=b.getAttribute("magnet");if(c){var d=this.findView(b);if(d){if(a=joint.util.normalizeEvent(a),this.guard(a,d))return;if(!this.options.validateMagnet(d,b))return;var e=this.snapToGrid(a.clientX,a.clientY);d.onmagnet(a,e.x,e.y)}}},onlabel:function(a){var b=a.currentTarget,c=this.findView(b);if(c){if(a=joint.util.normalizeEvent(a),this.guard(a,c))return;var d=this.snapToGrid(a.clientX,a.clientY);c.onlabel(a,d.x,d.y)}},delegateDragEvents:function(a,b){b||(b={}),this.eventData({data:b},{sourceView:a||null,mousemoved:0}),this.delegateDocumentEvents(null,b),this.undelegateEvents()},guard:function(a,b){return"mousedown"===a.type&&2===a.button||(!(!this.options.guard||!this.options.guard(a,b))||(a.data&&void 0!==a.data.guarded?a.data.guarded:!(b&&b.model&&b.model instanceof joint.dia.Cell)&&(this.svg!==a.target&&this.el!==a.target&&!$.contains(this.svg,a.target))))},setGridSize:function(a){return this.options.gridSize=a,this.options.drawGrid&&this.drawGrid(),this},clearGrid:function(){return this.$grid&&this.$grid.css("backgroundImage","none"),this},_getGriRefs:function(){return this._gridCache||(this._gridCache={root:V("svg",{width:"100%",height:"100%"},V("defs")),patterns:{},add:function(a,b){V(this.root.node.childNodes[0]).append(b),this.patterns[a]=b,this.root.append(V("rect",{width:"100%",height:"100%",fill:"url(#"+a+")"}))},get:function(a){return this.patterns[a]},exist:function(a){return void 0!==this.patterns[a]}}),this._gridCache},setGrid:function(a){this.clearGrid(),this._gridCache=null,this._gridSettings=[];var b=Array.isArray(a)?a:[a||{}];return b.forEach(function(a){this._gridSettings.push.apply(this._gridSettings,this._resolveDrawGridOption(a))},this),this},_resolveDrawGridOption:function(a){var b=this.constructor.gridPatterns;if(joint.util.isString(a)&&Array.isArray(b[a]))return b[a].map(function(a){return joint.util.assign({},a)});var c=a||{args:[{}]},d=Array.isArray(c),e=c.name;if(d||e||c.markup||(e="dot"),e&&Array.isArray(b[e])){var f=b[e].map(function(a){return joint.util.assign({},a)}),g=Array.isArray(c.args)?c.args:[c.args||{}];joint.util.defaults(g[0],joint.util.omit(a,"args"));for(var h=0;h<g.length;h++)f[h]&&joint.util.assign(f[h],g[h]);return f}return d?c:[c]},drawGrid:function(a){var b=this.options.gridSize;if(b<=1)return this.clearGrid();var c=Array.isArray(a)?a:[a],d=this.matrix(),e=this._getGriRefs();this._gridSettings.forEach(function(a,f){var g="pattern_"+f,h=joint.util.merge(a,c[f],{sx:d.a||1,sy:d.d||1,ox:d.e||0,oy:d.f||0});h.width=b*(d.a||1)*(h.scaleFactor||1),h.height=b*(d.d||1)*(h.scaleFactor||1),e.exist(g)||e.add(g,V("pattern",{id:g,patternUnits:"userSpaceOnUse"},V(h.markup)));var i=e.get(g);joint.util.isFunction(h.update)&&h.update(i.node.childNodes[0],h);var j=h.ox%h.width;j<0&&(j+=h.width);var k=h.oy%h.height;k<0&&(k+=h.height),i.attr({x:j,y:k,width:h.width,height:h.height})});var f=(new XMLSerializer).serializeToString(e.root.node);return f="url(data:image/svg+xml;base64,"+btoa(f)+")",this.$grid.css("backgroundImage",f),this},updateBackgroundImage:function(a){a=a||{};var b=a.position||"center",c=a.size||"auto auto",d=this.scale(),e=this.translate();if(joint.util.isObject(b)){var f=e.tx+d.sx*(b.x||0),h=e.ty+d.sy*(b.y||0);b=f+"px "+h+"px"}joint.util.isObject(c)&&(c=g.rect(c).scale(d.sx,d.sy),c=c.width+"px "+c.height+"px"),this.$background.css({backgroundSize:c,backgroundPosition:b})},drawBackgroundImage:function(a,b){if(!(a instanceof HTMLImageElement))return void this.$background.css("backgroundImage","");b=b||{};var c,d=b.size,e=b.repeat||"no-repeat",f=b.opacity||1,g=Math.abs(b.quality)||1,h=this.constructor.backgroundPatterns[joint.util.camelCase(e)];if(joint.util.isFunction(h)){a.width*=g,a.height*=g;var i=h(a,b);if(!(i instanceof HTMLCanvasElement))throw new Error("dia.Paper: background pattern must return an HTML Canvas instance");c=i.toDataURL("image/png"),e="repeat",joint.util.isObject(d)?(d.width*=i.width/a.width,d.height*=i.height/a.height):void 0===d&&(b.size={width:i.width/g,height:i.height/g})}else c=a.src,void 0===d&&(b.size={width:a.width,height:a.height});this.$background.css({opacity:f,backgroundRepeat:e,backgroundImage:"url("+c+")"}),this.updateBackgroundImage(b)},updateBackgroundColor:function(a){this.$el.css("backgroundColor",a||"")},drawBackground:function(a){if(a=a||{},this.updateBackgroundColor(a.color),a.image){a=this._background=joint.util.cloneDeep(a);var b=document.createElement("img");b.onload=this.drawBackgroundImage.bind(this,b,a),b.src=a.image}else this.drawBackgroundImage(null),this._background=null;return this},setInteractivity:function(a){this.options.interactive=a,joint.util.invoke(this._views,"setInteractivity",a)},isDefined:function(a){return!!this.svg.getElementById(a)},defineFilter:function(a){if(!joint.util.isObject(a))throw new TypeError("dia.Paper: defineFilter() requires 1. argument to be an object.");var b=a.id,c=a.name;if(b||(b=c+this.svg.id+joint.util.hashCode(JSON.stringify(a))),!this.isDefined(b)){var d=joint.util.filter,e=d[c]&&d[c](a.args||{});if(!e)throw new Error("Non-existing filter "+c);var f=joint.util.assign({filterUnits:"objectBoundingBox",x:-1,y:-1,width:3,height:3},a.attrs,{id:b});V(e,f).appendTo(this.defs)}return b},defineGradient:function(a){if(!joint.util.isObject(a))throw new TypeError("dia.Paper: defineGradient() requires 1. argument to be an object.");var b=a.id,c=a.type,d=a.stops;if(b||(b=c+this.svg.id+joint.util.hashCode(JSON.stringify(a))),!this.isDefined(b)){var e=joint.util.template('<stop offset="${offset}" stop-color="${color}" stop-opacity="${opacity}"/>'),f=joint.util.toArray(d).map(function(a){return e({offset:a.offset,color:a.color,opacity:Number.isFinite(a.opacity)?a.opacity:1})}),g=["<"+c+">",f.join(""),"</"+c+">"].join(""),h=joint.util.assign({id:b},a.attrs);V(g,h).appendTo(this.defs)}return b},defineMarker:function(a){if(!joint.util.isObject(a))throw new TypeError("dia.Paper: defineMarker() requires 1. argument to be an object.");var b=a.id;if(b||(b=this.svg.id+joint.util.hashCode(JSON.stringify(a))),!this.isDefined(b)){var c=joint.util.omit(a,"type","userSpaceOnUse"),d=V("marker",{id:b,orient:"auto",overflow:"visible",markerUnits:a.markerUnits||"userSpaceOnUse"},[V(a.type||"path",c)]);d.appendTo(this.defs)}return b}},{backgroundPatterns:{flipXy:function(a){var b=document.createElement("canvas"),c=a.width,d=a.height;b.width=2*c,b.height=2*d;var e=b.getContext("2d");return e.drawImage(a,0,0,c,d),e.setTransform(-1,0,0,-1,b.width,b.height),e.drawImage(a,0,0,c,d),e.setTransform(-1,0,0,1,b.width,0),e.drawImage(a,0,0,c,d),e.setTransform(1,0,0,-1,0,b.height),e.drawImage(a,0,0,c,d),b},flipX:function(a){var b=document.createElement("canvas"),c=a.width,d=a.height;b.width=2*c,b.height=d;var e=b.getContext("2d");return e.drawImage(a,0,0,c,d),e.translate(2*c,0),e.scale(-1,1),e.drawImage(a,0,0,c,d),b},flipY:function(a){var b=document.createElement("canvas"),c=a.width,d=a.height;b.width=c,b.height=2*d;var e=b.getContext("2d");return e.drawImage(a,0,0,c,d),e.translate(0,2*d),e.scale(1,-1),e.drawImage(a,0,0,c,d),b},watermark:function(a,b){b=b||{};var c=a.width,d=a.height,e=document.createElement("canvas");e.width=3*c,e.height=3*d;for(var f=e.getContext("2d"),h=joint.util.isNumber(b.watermarkAngle)?-b.watermarkAngle:-20,i=g.toRad(h),j=e.width/4,k=e.height/4,l=0;l<4;l++)for(var m=0;m<4;m++)(l+m)%2>0&&(f.setTransform(1,0,0,1,(2*l-1)*j,(2*m-1)*k),f.rotate(i),f.drawImage(a,-c/2,-d/2,c,d));return e}},gridPatterns:{dot:[{color:"#AAAAAA",thickness:1,markup:"rect",update:function(a,b){V(a).attr({width:b.thickness*b.sx,height:b.thickness*b.sy,fill:b.color})}}],fixedDot:[{color:"#AAAAAA",thickness:1,markup:"rect",update:function(a,b){var c=b.sx<=1?b.thickness*b.sx:b.thickness;V(a).attr({width:c,height:c,fill:b.color})}}],mesh:[{color:"#AAAAAA",thickness:1,markup:"path",update:function(a,b){var c,d=b.width,e=b.height,f=b.thickness;c=d-f>=0&&e-f>=0?["M",d,0,"H0 M0 0 V0",e].join(" "):"M 0 0 0 0",V(a).attr({d:c,stroke:b.color,"stroke-width":b.thickness})}}],doubleMesh:[{color:"#AAAAAA",thickness:1,markup:"path",update:function(a,b){var c,d=b.width,e=b.height,f=b.thickness;c=d-f>=0&&e-f>=0?["M",d,0,"H0 M0 0 V0",e].join(" "):"M 0 0 0 0",V(a).attr({d:c,stroke:b.color,"stroke-width":b.thickness})}},{color:"#000000",thickness:3,scaleFactor:4,markup:"path",update:function(a,b){var c,d=b.width,e=b.height,f=b.thickness;c=d-f>=0&&e-f>=0?["M",d,0,"H0 M0 0 V0",e].join(" "):"M 0 0 0 0",V(a).attr({d:c,stroke:b.color,"stroke-width":b.thickness})}}]}}),function(a,b){var c=function(c){var d=b.cloneDeep(c)||{};this.ports=[],this.groups={},this.portLayoutNamespace=a.layout.Port,this.portLabelLayoutNamespace=a.layout.PortLabel,this._init(d)};c.prototype={getPorts:function(){return this.ports},getGroup:function(a){return this.groups[a]||{}},getPortsByGroup:function(a){return this.ports.filter(function(b){return b.group===a})},getGroupPortsMetrics:function(a,c){var d=this.getGroup(a),e=this.getPortsByGroup(a),f=d.position||{},h=f.name,i=this.portLayoutNamespace;i[h]||(h="left");var j=f.args||{},k=e.map(function(a){return a&&a.position&&a.position.args}),l=i[h](k,c,j),m={ports:e,result:[]};return b.toArray(l).reduce(function(a,b,d){var e=a.ports[d];return a.result.push({portId:e.id,portTransformation:b,labelTransformation:this._getPortLabelLayout(e,g.Point(b),c),portAttrs:e.attrs,portSize:e.size,labelSize:e.label.size}),a}.bind(this),m),m.result},_getPortLabelLayout:function(a,b,c){var d=this.portLabelLayoutNamespace,e=a.label.position.name||"left";return d[e]?d[e](b,c,a.label.position.args):null},_init:function(a){if(b.isObject(a.groups))for(var c=Object.keys(a.groups),d=0,e=c.length;d<e;d++){var f=c[d];this.groups[f]=this._evaluateGroup(a.groups[f])}for(var g=b.toArray(a.items),h=0,i=g.length;h<i;h++)this.ports.push(this._evaluatePort(g[h]))},_evaluateGroup:function(a){return b.merge(a,{position:this._getPosition(a.position,!0),label:this._getLabel(a,!0)})},_evaluatePort:function(a){var c=b.assign({},a),d=this.getGroup(a.group);return c.markup=c.markup||d.markup,c.attrs=b.merge({},d.attrs,c.attrs),c.position=this._createPositionNode(d,c),c.label=b.merge({},d.label,this._getLabel(c)),c.z=this._getZIndex(d,c),c.size=b.assign({},d.size,c.size),c},_getZIndex:function(a,c){return b.isNumber(c.z)?c.z:b.isNumber(a.z)||"auto"===a.z?a.z:"auto"},_createPositionNode:function(a,c){return b.merge({name:"left",args:{}},a.position,{args:c.args})},_getPosition:function(a,c){var d,e={};b.isFunction(a)?(d="fn",e.fn=a):b.isString(a)?d=a:void 0===a?d=c?"left":null:Array.isArray(a)?(d="absolute",e.x=a[0],e.y=a[1]):b.isObject(a)&&(d=a.name,b.assign(e,a.args));var f={args:e};return d&&(f.name=d),f},_getLabel:function(a,b){var c=a.label||{},d=c;return d.position=this._getPosition(c.position,b),d}},b.assign(a.dia.Element.prototype,{_initializePorts:function(){this._createPortData(),this.on("change:ports",function(){this._processRemovedPort(),this._createPortData()},this)},_processRemovedPort:function(){var a=this.get("ports")||{},c={};b.toArray(a.items).forEach(function(a){c[a.id]=!0});var d=this.previous("ports")||{},e={};b.toArray(d.items).forEach(function(a){c[a.id]||(e[a.id]=!0)});var f=this.graph;if(f&&!b.isEmpty(e)){var g=f.getConnectedLinks(this,{inbound:!0});g.forEach(function(a){e[a.get("target").port]&&a.remove()});var h=f.getConnectedLinks(this,{outbound:!0});h.forEach(function(a){e[a.get("source").port]&&a.remove()})}},hasPorts:function(){var a=this.prop("ports/items");return Array.isArray(a)&&a.length>0},hasPort:function(a){return this.getPortIndex(a)!==-1},getPorts:function(){return b.cloneDeep(this.prop("ports/items"))||[]},getPort:function(a){return b.cloneDeep(b.toArray(this.prop("ports/items")).find(function(b){return b.id&&b.id===a}))},getPortsPositions:function(a){var b=this._portSettingsData.getGroupPortsMetrics(a,g.Rect(this.size()));return b.reduce(function(a,b){var c=b.portTransformation;return a[b.portId]={x:c.x,y:c.y,angle:c.angle},a},{})},getPortIndex:function(a){var c=b.isObject(a)?a.id:a;return this._isValidPortId(c)?b.toArray(this.prop("ports/items")).findIndex(function(a){return a.id===c}):-1},addPort:function(a,c){if(!b.isObject(a)||Array.isArray(a))throw new Error("Element: addPort requires an object.");var d=b.assign([],this.prop("ports/items"));return d.push(a),this.prop("ports/items",d,c),this},portProp:function(a,c,d,e){var f=this.getPortIndex(a);if(f===-1)throw new Error("Element: unable to find port with id "+a);var g=Array.prototype.slice.call(arguments,1);return Array.isArray(c)?g[0]=["ports","items",f].concat(c):b.isString(c)?g[0]=["ports/items/",f,"/",c].join(""):(g=["ports/items/"+f],b.isPlainObject(c)&&(g.push(c),g.push(d))),this.prop.apply(this,g)},_validatePorts:function(){var c=this.get("ports")||{},d=[];c=c||{};var e=b.toArray(c.items);return e.forEach(function(a){"object"!=typeof a&&d.push("Element: invalid port ",a),this._isValidPortId(a.id)||(a.id=b.uuid())},this),a.util.uniq(e,"id").length!==e.length&&d.push("Element: found id duplicities in ports."),d},_isValidPortId:function(a){return null!==a&&void 0!==a&&!b.isObject(a)},addPorts:function(a,c){return a.length&&this.prop("ports/items",b.assign([],this.prop("ports/items")).concat(a),c),this},removePort:function(a,c){var d=c||{},e=b.assign([],this.prop("ports/items")),f=this.getPortIndex(a);return f!==-1&&(e.splice(f,1),d.rewrite=!0,this.prop("ports/items",e,d)),this},_createPortData:function(){var a=this._validatePorts();if(a.length>0)throw this.set("ports",this.previous("ports")),new Error(a.join(" "));var b;this._portSettingsData&&(b=this._portSettingsData.getPorts()),this._portSettingsData=new c(this.get("ports"));var d=this._portSettingsData.getPorts();if(b){var e=d.filter(function(a){if(!b.find(function(b){return b.id===a.id}))return a}),f=b.filter(function(a){if(!d.find(function(b){return b.id===a.id}))return a});f.length>0&&this.trigger("ports:remove",this,f),e.length>0&&this.trigger("ports:add",this,e)}}}),b.assign(a.dia.ElementView.prototype,{portContainerMarkup:"g",portMarkup:[{tagName:"circle",selector:"circle",attributes:{r:10,fill:"#FFFFFF",stroke:"#000000"}}],portLabelMarkup:[{tagName:"text",selector:"text",attributes:{fill:"#000000"}}],_portElementsCache:null,_initializePorts:function(){this._portElementsCache={},this.listenTo(this.model,"change:ports",function(){this._refreshPorts()})},_refreshPorts:function(){this._removePorts(),this._portElementsCache={},this._renderPorts()},_renderPorts:function(){for(var a=[],c=this._getContainerElement(),d=0,e=c.node.childNodes.length;d<e;d++)a.push(c.node.childNodes[d]);var f=b.groupBy(this.model._portSettingsData.getPorts(),"z"),g="auto";b.toArray(f[g]).forEach(function(b){var d=this._getPortElement(b);c.append(d),a.push(d)},this);for(var h=Object.keys(f),i=0;i<h.length;i++){var j=h[i];if(j!==g){var k=parseInt(j,10);this._appendPorts(f[j],k,a)}}this._updatePorts()},_getContainerElement:function(){return this.rotatableNode||this.vel},_appendPorts:function(a,c,d){var e=this._getContainerElement(),f=b.toArray(a).map(this._getPortElement,this);d[c]||c<0?V(d[Math.max(c,0)]).before(f):e.append(f)},_getPortElement:function(a){return this._portElementsCache[a.id]?this._portElementsCache[a.id].portElement:this._createPortElement(a)},findPortNode:function(a,b){var c=this._portElementsCache[a];if(!c)return null;var d=c.portContentElement.node,e=c.portContentSelectors;return this.findBySelector(b,d,e)[0]},_updatePorts:function(){this._updatePortGroup(void 0);var a=Object.keys(this.model._portSettingsData.groups);a.forEach(this._updatePortGroup,this)},_removePorts:function(){b.invoke(this._portElementsCache,"portElement.remove")},_createPortElement:function(a){var c,d,e,f=this._getPortMarkup(a);if(Array.isArray(f)){var g=b.parseDOMJSON(f),h=g.fragment;c=h.childNodes.length>1?V("g").append(h):V(h.firstChild),e=g.selectors}else c=V(f),Array.isArray(c)&&(c=V("g").append(c));if(!c)throw new Error("ElementView: Invalid port markup.");c.attr({port:a.id,"port-group":a.group});var i,j=this._getPortLabelMarkup(a.label);if(Array.isArray(j)){var k=b.parseDOMJSON(j),l=k.fragment;d=l.childNodes.length>1?V("g").append(l):V(l.firstChild),i=k.selectors}else d=V(j),Array.isArray(d)&&(d=V("g").append(d));if(!d)throw new Error("ElementView: Invalid port label markup.");var m;if(e&&i){for(var n in i)if(e[n])throw new Error("ElementView: selectors within port must be unique.");m=b.assign({},e,i)}else m=e||i;var o=V(this.portContainerMarkup).addClass("joint-port").append([c.addClass("joint-port-body"),d.addClass("joint-port-label")]);return this._portElementsCache[a.id]={portElement:o,portLabelElement:d,portSelectors:m,portLabelSelectors:i,portContentElement:c,portContentSelectors:e},o},_updatePortGroup:function(a){for(var b=g.Rect(this.model.size()),c=this.model._portSettingsData.getGroupPortsMetrics(a,b),d=0,e=c.length;d<e;d++){var f=c[d],h=f.portId,i=this._portElementsCache[h]||{},j=f.portTransformation;this.applyPortTransform(i.portElement,j),this.updateDOMSubtreeAttributes(i.portElement.node,f.portAttrs,{rootBBox:new g.Rect(f.portSize),selectors:i.portSelectors});var k=f.labelTransformation;k&&(this.applyPortTransform(i.portLabelElement,k,-j.angle||0),this.updateDOMSubtreeAttributes(i.portLabelElement.node,k.attrs,{rootBBox:new g.Rect(f.labelSize),selectors:i.portLabelSelectors}))}},applyPortTransform:function(a,b,c){var d=V.createSVGMatrix().rotate(c||0).translate(b.x||0,b.y||0).rotate(b.angle||0);a.transform(d,{absolute:!0})},_getPortMarkup:function(a){return a.markup||this.model.get("portMarkup")||this.model.portMarkup||this.portMarkup},_getPortLabelMarkup:function(a){return a.markup||this.model.get("portLabelMarkup")||this.model.portLabelMarkup||this.portLabelMarkup}})}(joint,joint.util),joint.dia.Element.define("basic.Generic",{attrs:{".":{fill:"#ffffff",stroke:"none"}}}),joint.shapes.basic.Generic.define("basic.Rect",{attrs:{rect:{fill:"#ffffff",stroke:"#000000",width:100,height:60},text:{fill:"#000000",text:"","font-size":14,"ref-x":.5,"ref-y":.5,"text-anchor":"middle","y-alignment":"middle","font-family":"Arial, helvetica, sans-serif"}}},{markup:'<g class="rotatable"><g class="scalable"><rect/></g><text/></g>'}),joint.shapes.basic.TextView=joint.dia.ElementView.extend({initialize:function(){joint.dia.ElementView.prototype.initialize.apply(this,arguments),this.listenTo(this.model,"change:attrs",this.resize)}}),joint.shapes.basic.Generic.define("basic.Text",{attrs:{text:{"font-size":18,fill:"#000000"}}},{markup:'<g class="rotatable"><g class="scalable"><text/></g></g>'}),joint.shapes.basic.Generic.define("basic.Circle",{size:{width:60,height:60},attrs:{circle:{fill:"#ffffff",stroke:"#000000",r:30,cx:30,cy:30},text:{"font-size":14,text:"","text-anchor":"middle","ref-x":.5,"ref-y":.5,"y-alignment":"middle",fill:"#000000","font-family":"Arial, helvetica, sans-serif"}}},{markup:'<g class="rotatable"><g class="scalable"><circle/></g><text/></g>'}),joint.shapes.basic.Generic.define("basic.Ellipse",{size:{width:60,height:40},attrs:{ellipse:{fill:"#ffffff",stroke:"#000000",rx:30,ry:20,cx:30,cy:20},text:{"font-size":14,text:"","text-anchor":"middle","ref-x":.5,"ref-y":.5,"y-alignment":"middle",fill:"#000000","font-family":"Arial, helvetica, sans-serif"}}},{markup:'<g class="rotatable"><g class="scalable"><ellipse/></g><text/></g>'}),joint.shapes.basic.Generic.define("basic.Polygon",{size:{width:60,height:40},attrs:{polygon:{fill:"#ffffff",stroke:"#000000"},text:{"font-size":14,text:"","text-anchor":"middle","ref-x":.5,"ref-dy":20,"y-alignment":"middle",fill:"#000000","font-family":"Arial, helvetica, sans-serif"}}},{markup:'<g class="rotatable"><g class="scalable"><polygon/></g><text/></g>'}),joint.shapes.basic.Generic.define("basic.Polyline",{size:{width:60,height:40},attrs:{polyline:{fill:"#ffffff",stroke:"#000000"},text:{"font-size":14,text:"","text-anchor":"middle","ref-x":.5,"ref-dy":20,"y-alignment":"middle",fill:"#000000","font-family":"Arial, helvetica, sans-serif"}}},{markup:'<g class="rotatable"><g class="scalable"><polyline/></g><text/></g>'}),joint.shapes.basic.Generic.define("basic.Image",{attrs:{text:{"font-size":14,text:"","text-anchor":"middle","ref-x":.5,"ref-dy":20,"y-alignment":"middle",fill:"#000000","font-family":"Arial, helvetica, sans-serif"}}},{markup:'<g class="rotatable"><g class="scalable"><image/></g><text/></g>'}),joint.shapes.basic.Generic.define("basic.Path",{size:{width:60,height:60},attrs:{path:{fill:"#ffffff",stroke:"#000000"},text:{"font-size":14,text:"","text-anchor":"middle",ref:"path","ref-x":.5,"ref-dy":10,fill:"#000000","font-family":"Arial, helvetica, sans-serif"}}},{markup:'<g class="rotatable"><g class="scalable"><path/></g><text/></g>'}),joint.shapes.basic.Path.define("basic.Rhombus",{attrs:{path:{d:"M 30 0 L 60 30 30 60 0 30 z"},text:{"ref-y":.5,"ref-dy":null,"y-alignment":"middle"}}}),joint.shapes.basic.PortsModelInterface={initialize:function(){this.updatePortsAttrs(),this.on("change:inPorts change:outPorts",this.updatePortsAttrs,this),this.constructor.__super__.constructor.__super__.initialize.apply(this,arguments)},updatePortsAttrs:function(a){if(this._portSelectors){var b=joint.util.omit(this.get("attrs"),this._portSelectors);this.set("attrs",b,{silent:!0})}this._portSelectors=[];var c={};joint.util.toArray(this.get("inPorts")).forEach(function(a,b,d){var e=this.getPortAttrs(a,b,d.length,".inPorts","in");this._portSelectors=this._portSelectors.concat(Object.keys(e)),joint.util.assign(c,e)},this),joint.util.toArray(this.get("outPorts")).forEach(function(a,b,d){var e=this.getPortAttrs(a,b,d.length,".outPorts","out");this._portSelectors=this._portSelectors.concat(Object.keys(e)),joint.util.assign(c,e)},this),this.attr(c,{silent:!0}),this.processPorts(),this.trigger("process:ports")},getPortSelector:function(a){var b=".inPorts",c=this.get("inPorts").indexOf(a);if(c<0&&(b=".outPorts",c=this.get("outPorts").indexOf(a),c<0))throw new Error("getPortSelector(): Port doesn't exist.");return b+">g:nth-child("+(c+1)+")>.port-body"}},joint.shapes.basic.PortsViewInterface={initialize:function(){this.listenTo(this.model,"process:ports",this.update),joint.dia.ElementView.prototype.initialize.apply(this,arguments)},update:function(){this.renderPorts(),joint.dia.ElementView.prototype.update.apply(this,arguments)},renderPorts:function(){var a=this.$(".inPorts").empty(),b=this.$(".outPorts").empty(),c=joint.util.template(this.model.portMarkup),d=this.model.ports||[];d.filter(function(a){return"in"===a.type}).forEach(function(b,d){a.append(V(c({id:d,port:b})).node)}),d.filter(function(a){return"out"===a.type}).forEach(function(a,d){b.append(V(c({id:d,port:a})).node)})}},joint.shapes.basic.Generic.define("basic.TextBlock",{attrs:{rect:{fill:"#ffffff",stroke:"#000000",width:80,height:100},text:{fill:"#000000","font-size":14,"font-family":"Arial, helvetica, sans-serif"},".content":{text:"","ref-x":.5,"ref-y":.5,"y-alignment":"middle","x-alignment":"middle"}},content:""},{markup:['<g class="rotatable">','<g class="scalable"><rect/></g>',joint.env.test("svgforeignobject")?'<foreignObject class="fobj"><body xmlns="http://www.w3.org/1999/xhtml"><div class="content"/></body></foreignObject>':'<text class="content"/>',"</g>"].join(""),initialize:function(){this.listenTo(this,"change:size",this.updateSize),this.listenTo(this,"change:content",this.updateContent),this.updateSize(this,this.get("size")),this.updateContent(this,this.get("content")),joint.shapes.basic.Generic.prototype.initialize.apply(this,arguments)},updateSize:function(a,b){this.attr({".fobj":joint.util.assign({},b),div:{style:joint.util.assign({},b)}})},updateContent:function(a,b){joint.env.test("svgforeignobject")?this.attr({".content":{html:joint.util.sanitizeHTML(b)}}):this.attr({".content":{text:b}})},setForeignObjectSize:function(){this.updateSize.apply(this,arguments)},setDivContent:function(){this.updateContent.apply(this,arguments)}}),joint.shapes.basic.TextBlockView=joint.dia.ElementView.extend({initialize:function(){joint.dia.ElementView.prototype.initialize.apply(this,arguments),this.noSVGForeignObjectElement=!joint.env.test("svgforeignobject"),joint.env.test("svgforeignobject")||this.listenTo(this.model,"change:content change:size",function(a){this.updateContent(a)})},update:function(a,b){var c=this.model;if(joint.env.test("svgforeignobject"))joint.dia.ElementView.prototype.update.call(this,c,b);else{var d=joint.util.omit(b||c.get("attrs"),".content");joint.dia.ElementView.prototype.update.call(this,c,d),b&&!joint.util.has(b,".content")||this.updateContent(c,b)}},updateContent:function(a,b){var c=joint.util.merge({},(b||a.get("attrs"))[".content"]);c=joint.util.omit(c,"text");var d=joint.util.breakText(a.get("content"),a.get("size"),c,{svgDocument:this.paper.svg}),e=joint.util.setByPath({},".content",c,"/");e[".content"].text=d,joint.dia.ElementView.prototype.update.call(this,a,e)}}),function(a,b,c,d){"use strict";var e=a.Element;e.define("standard.Rectangle",{attrs:{body:{refWidth:"100%",refHeight:"100%",strokeWidth:2,stroke:"#000000",fill:"#FFFFFF"},label:{textVerticalAnchor:"middle",textAnchor:"middle",refX:"50%",refY:"50%",fontSize:14,fill:"#333333"}}},{markup:[{tagName:"rect",selector:"body"},{tagName:"text",selector:"label"}]}),e.define("standard.Circle",{attrs:{body:{refCx:"50%",refCy:"50%",refR:"50%",strokeWidth:2,stroke:"#333333",fill:"#FFFFFF"},label:{textVerticalAnchor:"middle",textAnchor:"middle",refX:"50%",refY:"50%",fontSize:14,fill:"#333333"}}},{markup:[{tagName:"circle",selector:"body"},{tagName:"text",selector:"label"}]}),e.define("standard.Ellipse",{attrs:{body:{refCx:"50%",refCy:"50%",refRx:"50%",refRy:"50%",strokeWidth:2,stroke:"#333333",fill:"#FFFFFF"},label:{textVerticalAnchor:"middle",textAnchor:"middle",refX:"50%",refY:"50%",fontSize:14,fill:"#333333"}}},{markup:[{tagName:"ellipse",selector:"body"},{tagName:"text",selector:"label"}]}),e.define("standard.Path",{attrs:{body:{refD:"M 0 0 L 10 0 10 10 0 10 Z",strokeWidth:2,stroke:"#333333",fill:"#FFFFFF"},label:{textVerticalAnchor:"middle",textAnchor:"middle",refX:"50%",refY:"50%",fontSize:14,fill:"#333333"}}},{markup:[{tagName:"path",selector:"body"},{tagName:"text",selector:"label"}]}),e.define("standard.Polygon",{attrs:{body:{refPoints:"0 0 10 0 10 10 0 10",strokeWidth:2,stroke:"#333333",fill:"#FFFFFF"},label:{textVerticalAnchor:"middle",textAnchor:"middle",refX:"50%",refY:"50%",fontSize:14,fill:"#333333"}}},{markup:[{tagName:"polygon",selector:"body"},{tagName:"text",selector:"label"}]}),e.define("standard.Polyline",{attrs:{body:{refPoints:"0 0 10 0 10 10 0 10 0 0",strokeWidth:2,stroke:"#333333",fill:"#FFFFFF"},label:{textVerticalAnchor:"middle",textAnchor:"middle",refX:"50%",refY:"50%",fontSize:14,fill:"#333333"}}},{markup:[{tagName:"polyline",selector:"body"},{tagName:"text",selector:"label"}]}),e.define("standard.Image",{attrs:{image:{refWidth:"100%",refHeight:"100%"},label:{textVerticalAnchor:"top",textAnchor:"middle",refX:"50%",refY:"100%",refY2:10,fontSize:14,fill:"#333333"}}},{markup:[{tagName:"image",selector:"image"},{tagName:"text",selector:"label"}]}),e.define("standard.BorderedImage",{attrs:{border:{refWidth:"100%",refHeight:"100%",stroke:"#333333",strokeWidth:2},image:{refWidth:-1,refHeight:-1,x:.5,y:.5},label:{textVerticalAnchor:"top",textAnchor:"middle",refX:"50%",refY:"100%",refY2:10,fontSize:14,fill:"#333333"}}},{markup:[{tagName:"image",selector:"image"},{tagName:"rect",selector:"border",attributes:{fill:"none"}},{tagName:"text",selector:"label"}]}),e.define("standard.EmbeddedImage",{attrs:{body:{refWidth:"100%",refHeight:"100%",stroke:"#333333",fill:"#FFFFFF",strokeWidth:2},image:{refWidth:"30%",refHeight:-20,x:10,y:10,preserveAspectRatio:"xMidYMin"},label:{textVerticalAnchor:"top",textAnchor:"left",refX:"30%",refX2:20,refY:10,fontSize:14,fill:"#333333"}}},{markup:[{tagName:"rect",selector:"body"},{tagName:"image",selector:"image"},{tagName:"text",selector:"label"}]}),e.define("standard.HeaderedRectangle",{attrs:{body:{refWidth:"100%",refHeight:"100%",strokeWidth:2,stroke:"#000000",fill:"#FFFFFF"},header:{refWidth:"100%",height:30,strokeWidth:2,stroke:"#000000",fill:"#FFFFFF"},headerText:{textVerticalAnchor:"middle",textAnchor:"middle",refX:"50%",refY:15,fontSize:16,fill:"#333333"},bodyText:{textVerticalAnchor:"middle",textAnchor:"middle",refX:"50%",refY:"50%",refY2:15,fontSize:14,fill:"#333333"}}},{markup:[{tagName:"rect",selector:"body"},{tagName:"rect",selector:"header"},{tagName:"text",selector:"headerText"},{tagName:"text",selector:"bodyText"}]});var f=10;joint.dia.Element.define("standard.Cylinder",{attrs:{body:{lateralArea:f,fill:"#FFFFFF",stroke:"#333333",strokeWidth:2},top:{refCx:"50%",cy:f,refRx:"50%",ry:f,fill:"#FFFFFF",stroke:"#333333",strokeWidth:2},label:{textVerticalAnchor:"middle",textAnchor:"middle",refX:"50%",refY:"100%",refY2:15,fontSize:14,fill:"#333333"}}},{markup:[{tagName:"path",selector:"body"},{tagName:"ellipse",selector:"top"},{tagName:"text",selector:"label"}],topRy:function(a,c){
if(void 0===a)return this.attr("body/lateralArea");var d=b.isPercentage(a),e={lateralArea:a},f=d?{refCy:a,refRy:a,cy:null,ry:null}:{refCy:null,refRy:null,cy:a,ry:a};return this.attr({body:e,top:f},c)}},{attributes:{lateralArea:{set:function(a,c){var e=b.isPercentage(a);e&&(a=parseFloat(a)/100);var f=c.x,g=c.y,h=c.width,i=c.height,j=h/2,k=e?i*a:a,l=d.KAPPA,m=l*j,n=l*(e?i*a:a),o=f,p=f+h/2,q=f+h,r=g+k,s=r-k,t=g+i-k,u=g+i,v=["M",o,r,"L",o,t,"C",f,t+n,p-m,u,p,u,"C",p+m,u,q,t+n,q,t,"L",q,r,"C",q,r-n,p+m,s,p,s,"C",p-m,s,o,r-n,o,r,"Z"];return{d:v.join(" ")}}}}});var g={tagName:"foreignObject",selector:"foreignObject",attributes:{overflow:"hidden"},children:[{tagName:"div",namespaceURI:"http://www.w3.org/1999/xhtml",selector:"label",style:{width:"100%",height:"100%",position:"static",backgroundColor:"transparent",textAlign:"center",margin:0,padding:"0px 5px",boxSizing:"border-box",display:"flex",alignItems:"center",justifyContent:"center"}}]},h={tagName:"text",selector:"label",attributes:{"text-anchor":"middle"}},i=c.test("svgforeignobject")?g:h;e.define("standard.TextBlock",{attrs:{body:{refWidth:"100%",refHeight:"100%",stroke:"#333333",fill:"#ffffff",strokeWidth:2},foreignObject:{refWidth:"100%",refHeight:"100%"},label:{style:{fontSize:14}}}},{markup:[{tagName:"rect",selector:"body"},i]},{attributes:{text:{set:function(c,d,e,f){if(!(e instanceof HTMLElement)){var g=f.style||{},h={text:c,width:-5,height:"100%"},i=b.assign({textVerticalAnchor:"middle"},g);return a.attributes.textWrap.set.call(this,h,d,e,i),{fill:g.color||null}}e.textContent=c},position:function(a,b,c){if(c instanceof SVGElement)return b.center()}}}});var j=a.Link;j.define("standard.Link",{attrs:{line:{connection:!0,stroke:"#333333",strokeWidth:2,strokeLinejoin:"round",targetMarker:{type:"path",d:"M 10 -5 0 0 10 5 z"}},wrapper:{connection:!0,strokeWidth:10,strokeLinejoin:"round"}}},{markup:[{tagName:"path",selector:"wrapper",attributes:{fill:"none",cursor:"pointer",stroke:"transparent"}},{tagName:"path",selector:"line",attributes:{fill:"none","pointer-events":"none"}}]}),j.define("standard.DoubleLink",{attrs:{line:{connection:!0,stroke:"#DDDDDD",strokeWidth:4,strokeLinejoin:"round",targetMarker:{type:"path",stroke:"#000000",d:"M 10 -3 10 -10 -2 0 10 10 10 3"}},outline:{connection:!0,stroke:"#000000",strokeWidth:6,strokeLinejoin:"round"}}},{markup:[{tagName:"path",selector:"outline",attributes:{fill:"none"}},{tagName:"path",selector:"line",attributes:{fill:"none"}}]}),j.define("standard.ShadowLink",{attrs:{line:{connection:!0,stroke:"#FF0000",strokeWidth:20,strokeLinejoin:"round",targetMarker:{type:"path",stroke:"none",d:"M 0 -10 -10 0 0 10 z"},sourceMarker:{type:"path",stroke:"none",d:"M -10 -10 0 0 -10 10 0 10 0 -10 z"}},shadow:{connection:!0,refX:3,refY:6,stroke:"#000000",strokeOpacity:.2,strokeWidth:20,strokeLinejoin:"round",targetMarker:{type:"path",d:"M 0 -10 -10 0 0 10 z",stroke:"none"},sourceMarker:{type:"path",stroke:"none",d:"M -10 -10 0 0 -10 10 0 10 0 -10 z"}}}},{markup:[{tagName:"path",selector:"shadow",attributes:{fill:"none"}},{tagName:"path",selector:"line",attributes:{fill:"none"}}]})}(joint.dia,joint.util,joint.env,V),joint.routers.manhattan=function(a,b,c){"use strict";function d(a){this.map={},this.options=a,this.mapGridSize=100}function e(){this.items=[],this.hash={},this.values={},this.OPEN=1,this.CLOSE=2}function f(a,b){return b&&b.paddingBox?a.sourceBBox.clone().moveAndExpand(b.paddingBox):a.sourceBBox.clone()}function g(a,b){return b&&b.paddingBox?a.targetBBox.clone().moveAndExpand(b.paddingBox):a.targetBBox.clone()}function h(a,b){if(a.sourceAnchor)return a.sourceAnchor;var c=f(a,b);return c.center()}function i(a,b){if(a.targetAnchor)return a.targetAnchor;var c=g(a,b);return c.center()}function j(b,c,d,e,f){var g=360/d,h=b.theta(k(b,c,e,f)),i=a.normalizeAngle(h+g/2);return g*Math.floor(i/g)}function k(b,c,d,e){var f=e.step,g=c.x-b.x,h=c.y-b.y,i=g/d.x,j=h/d.y,k=i*f,l=j*f;return new a.Point(b.x+k,b.y+l)}function l(a,b){var c=Math.abs(a-b);return c>180?360-c:c}function m(a,b,d){var e=d.step;c.toArray(d.directions).forEach(function(a){a.gridOffsetX=a.offsetX/e*b.x,a.gridOffsetY=a.offsetY/e*b.y})}function n(a,b,c){return{source:b.clone(),x:o(c.x-b.x,a),y:o(c.y-b.y,a)}}function o(a,b){if(!a)return b;var c=Math.abs(a),d=Math.round(c/b);if(!d)return c;var e=d*b,f=c-e,g=f/d;return b+g}function p(b,c){var d=c.source,e=a.snapToGrid(b.x-d.x,c.x)+d.x,f=a.snapToGrid(b.y-d.y,c.y)+d.y;return new a.Point(e,f)}function q(a,b){return a?a.round(b.precision):a}function r(a){return a.clone().round().toString()}function s(b){return new a.Point(0===b.x?0:Math.abs(b.x)/b.x,0===b.y?0:Math.abs(b.y)/b.y)}function t(a,b,c,d,e,f){for(var g,h=[],i=s(e.difference(c)),j=r(c),k=a[j];k;){g=q(b[j],f);var l=s(g.difference(q(k.clone(),f)));l.equals(i)||(h.unshift(g),i=l),j=r(k),k=a[j]}var m=q(b[j],f),n=s(m.difference(d));return n.equals(i)||h.unshift(m),h}function u(a,b){for(var c=1/0,d=0,e=b.length;d<e;d++){var f=a.manhattanDistance(b[d]);f<c&&(c=f)}return c}function v(b,d,e,f,g){var h=g.directionMap,i=q(p(b,f),g),j=q(p(d.center(),f),g),k=i.difference(j),l=c.isObject(h)?Object.keys(h):[],m=c.toArray(e),n=l.reduce(function(c,e){if(m.includes(e)){for(var j,l=h[e],n=new a.Point(i.x+l.x*(Math.abs(k.x)+d.width),i.y+l.y*(Math.abs(k.y)+d.height)),o=new a.Line(b,n),r=o.intersect(d)||[],s=r.length,t=null,u=0;u<s;u++){var v=r[u],w=i.squaredDistance(v);(void 0===j||w>j)&&(j=w,t=p(v,f))}var x=q(t,g);x&&(d.containsPoint(x)&&q(x.offset(l.x*f.x,l.y*f.y),g),c.push(x))}return c},[]);return d.containsPoint(i)||n.push(i),n}function w(b,d,f,g){var k,o;k=b instanceof a.Rect?h(this,g).clone():b.clone(),o=d instanceof a.Rect?i(this,g).clone():d.clone();var s,w,x,y,z=n(g.step,k,o);if(b instanceof a.Rect?(s=q(p(k,z),g),x=v(s,b,g.startDirections,z,g)):(s=q(p(k,z),g),x=[s]),d instanceof a.Rect?(w=q(p(o,z),g),y=v(o,d,g.endDirections,z,g)):(w=q(p(o,z),g),y=[w]),x=x.filter(f.isPointAccessible,f),y=y.filter(f.isPointAccessible,f),x.length>0&&y.length>0){for(var A=new e,B={},C={},D={},E=0,F=x.length;E<F;E++){var G=x[E],H=r(G);A.add(H,u(G,y)),B[H]=G,D[H]=0}var I,J,K=g.previousDirectionAngle,L=void 0===K,M=g.directions;m(M,z,g);for(var N=M.length,O=c.toArray(y).reduce(function(a,b){var c=r(b);return a.push(c),a},[]),P=g.maximumLoops;!A.isEmpty()&&P>0;){var Q,R=A.pop(),S=B[R],T=C[R],U=D[R],V=void 0===T,W=S.equals(s);if(Q=V?L?W?null:j(s,S,N,z,g):K:j(T,S,N,z,g),O.indexOf(R)>=0)return g.previousDirectionAngle=Q,t(C,B,S,s,w,g);for(E=0;E<N;E++){I=M[E];var X=I.angle;if(J=l(Q,X),L&&W||!(J>g.maxAllowedDirectionChange)){var Y=S.clone().offset(I.gridOffsetX,I.gridOffsetY),Z=r(Y);if(!A.isClose(Z)&&f.isPointAccessible(Y)){if(O.indexOf(Z)>=0){q(Y,g);var $=Y.equals(w);if(!$){var _=j(Y,w,N,z,g),aa=l(X,_);if(aa>g.maxAllowedDirectionChange)continue}}var ba=I.cost,ca=W?0:g.penalties[J],da=U+ba+ca;(!A.isOpen(Z)||da<D[Z])&&(B[Z]=Y,C[Z]=S,D[Z]=da,A.add(Z,da+u(Y,y)))}}}P--}}return g.fallbackRoute.call(this,s,w,g)}function x(b){b.directions=c.result(b,"directions"),b.penalties=c.result(b,"penalties"),b.paddingBox=c.result(b,"paddingBox"),c.toArray(b.directions).forEach(function(b){var c=new a.Point(0,0),d=new a.Point(b.offsetX,b.offsetY);b.angle=a.normalizeAngle(c.theta(d))})}function y(b,e,i){x(e),i.options.perpendicular=!!e.perpendicular;for(var j=f(i,e),k=g(i,e),l=h(i,e),m=new d(e).build(i.paper.model,i.model),n=c.toArray(b).map(a.Point),o=[],p=l,q=0,r=n.length;q<=r;q++){var s=null,t=u||j,u=n[q];if(!u){u=k;var v=!i.model.get("source").id||!i.model.get("target").id;if(v&&c.isFunction(e.draggingRoute)){var y=t===j?l:t,z=u.origin();s=e.draggingRoute.call(i,y,z,e)}}if(s=s||w.call(i,t,u,m,e),null===s)return e.fallbackRouter(b,e,i);var A=s[0];A&&A.equals(p)&&s.shift(),p=s[s.length-1]||p,Array.prototype.push.apply(o,s)}return o}var z={step:10,maximumLoops:2e3,precision:10,maxAllowedDirectionChange:90,perpendicular:!0,excludeEnds:[],excludeTypes:["basic.Text"],startDirections:["top","right","bottom","left"],endDirections:["top","right","bottom","left"],directionMap:{top:{x:0,y:-1},right:{x:1,y:0},bottom:{x:0,y:1},left:{x:-1,y:0}},cost:function(){return this.step},directions:function(){var a=this.step,b=this.cost();return[{offsetX:a,offsetY:0,cost:b},{offsetX:0,offsetY:a,cost:b},{offsetX:-a,offsetY:0,cost:b},{offsetX:0,offsetY:-a,cost:b}]},penalties:function(){return{0:0,45:this.step/2,90:this.step/2}},paddingBox:function(){var a=this.step;return{x:-a,y:-a,width:2*a,height:2*a}},fallbackRouter:function(a,d,e){if(!c.isFunction(b.routers.orthogonal))throw new Error("Manhattan requires the orthogonal router as default fallback.");return b.routers.orthogonal(a,c.assign({},z,d),e)},fallbackRoute:function(a,b,c){return null},draggingRoute:null};return d.prototype.build=function(a,b){var d=this.options,e=c.toArray(d.excludeEnds).reduce(function(c,d){var e=b.get(d);if(e){var f=a.getCell(e.id);f&&c.push(f)}return c},[]),f=[],g=a.getCell(b.get("source").id);g&&(f=c.union(f,g.getAncestors().map(function(a){return a.id})));var h=a.getCell(b.get("target").id);h&&(f=c.union(f,h.getAncestors().map(function(a){return a.id})));var i=this.mapGridSize;return a.getElements().reduce(function(a,b){var g=c.toArray(d.excludeTypes).includes(b.get("type")),h=e.find(function(a){return a.id===b.id}),j=f.includes(b.id),k=g||h||j;if(!k)for(var l=b.getBBox().moveAndExpand(d.paddingBox),m=l.origin().snapToGrid(i),n=l.corner().snapToGrid(i),o=m.x;o<=n.x;o+=i)for(var p=m.y;p<=n.y;p+=i){var q=o+"@"+p;a[q]=a[q]||[],a[q].push(l)}return a},this.map),this},d.prototype.isPointAccessible=function(a){var b=a.clone().snapToGrid(this.mapGridSize).toString();return c.toArray(this.map[b]).every(function(b){return!b.containsPoint(a)})},e.prototype.add=function(a,c){this.hash[a]?this.items.splice(this.items.indexOf(a),1):this.hash[a]=this.OPEN,this.values[a]=c;var d=b.util.sortedIndex(this.items,a,function(a){return this.values[a]}.bind(this));this.items.splice(d,0,a)},e.prototype.remove=function(a){this.hash[a]=this.CLOSE},e.prototype.isOpen=function(a){return this.hash[a]===this.OPEN},e.prototype.isClose=function(a){return this.hash[a]===this.CLOSE},e.prototype.isEmpty=function(){return 0===this.items.length},e.prototype.pop=function(){var a=this.items.shift();return this.remove(a),a},function(a,b,d){return y(a,c.assign({},z,b),d)}}(g,joint,joint.util),joint.routers.metro=function(a){var b={maxAllowedDirectionChange:45,diagonalCost:function(){var a=this.step;return Math.ceil(Math.sqrt(a*a<<1))},directions:function(){var a=this.step,b=this.cost(),c=this.diagonalCost();return[{offsetX:a,offsetY:0,cost:b},{offsetX:a,offsetY:a,cost:c},{offsetX:0,offsetY:a,cost:b},{offsetX:-a,offsetY:a,cost:c},{offsetX:-a,offsetY:0,cost:b},{offsetX:-a,offsetY:-a,cost:c},{offsetX:0,offsetY:-a,cost:b},{offsetX:a,offsetY:-a,cost:c}]},fallbackRoute:function(a,b,c){var d=a.theta(b),e=[],f={x:b.x,y:a.y},h={x:a.x,y:b.y};if(d%180>90){var i=f;f=h,h=i}var j=d%90<45?f:h,k=new g.Line(a,j),l=90*Math.ceil(d/90),m=g.Point.fromPolar(k.squaredLength(),g.toRad(l+135),j),n=new g.Line(b,m),o=k.intersection(n),p=o?o:b,q=o?p:a,r=360/c.directions.length,s=q.theta(b),t=g.normalizeAngle(s+r/2),u=r*Math.floor(t/r);return c.previousDirectionAngle=u,p&&e.push(p.round()),e.push(b),e}};return function(c,d,e){if(!a.isFunction(joint.routers.manhattan))throw new Error("Metro requires the manhattan router.");return joint.routers.manhattan(c,a.assign({},b,d),e)}}(joint.util),joint.routers.normal=function(a,b,c){return a},joint.routers.oneSide=function(a,b,c){var d,e,f,g=b.side||"bottom",h=b.padding||40,i=c.sourceBBox,j=c.targetBBox,k=i.center(),l=j.center();switch(g){case"bottom":f=1,d="y",e="height";break;case"top":f=-1,d="y",e="height";break;case"left":f=-1,d="x",e="width";break;case"right":f=1,d="x",e="width";break;default:throw new Error("Router: invalid side")}return k[d]+=f*(i[e]/2+h),l[d]+=f*(j[e]/2+h),f*(k[d]-l[d])>0?l[d]=k[d]:k[d]=l[d],[k].concat(a,l)},joint.routers.orthogonal=function(a){function b(a,b,c){var d=new g.Point(a.x,b.y);return c.containsPoint(d)&&(d=new g.Point(b.x,a.y)),d}function c(a,b){return a["W"===b||"E"===b?"width":"height"]}function d(a,b){return a.x===b.x?a.y>b.y?"N":"S":a.y===b.y?a.x>b.x?"W":"E":null}function e(a){return new g.Rect(a.x,a.y,0,0)}function f(a,b){var c=b&&b.elementPadding||20;return a.sourceBBox.clone().inflate(c)}function h(a,b){var c=b&&b.elementPadding||20;return a.targetBBox.clone().inflate(c)}function i(a,b){if(a.sourceAnchor)return a.sourceAnchor;var c=f(a,b);return c.center()}function j(a,b){if(a.targetAnchor)return a.targetAnchor;var c=h(a,b);return c.center()}function k(a,b,c){var e=new g.Point(a.x,b.y),f=new g.Point(b.x,a.y),h=d(a,e),i=d(a,f),j=q[c],k=h===c||h!==j&&(i===j||i!==c)?e:f;return{points:[k],direction:d(k,b)}}function l(a,c,e){var f=b(a,c,e);return{points:[f],direction:d(f,c)}}function m(e,f,h,i){var j,k={},l=[new g.Point(e.x,f.y),new g.Point(f.x,e.y)],m=l.filter(function(a){return!h.containsPoint(a)}),n=m.filter(function(a){return d(a,e)!==i});if(n.length>0)j=n.filter(function(a){return d(e,a)===i}).pop(),j=j||n[0],k.points=[j],k.direction=d(j,f);else{j=a.difference(l,m)[0];var o=new g.Point(f).move(j,-c(h,i)/2),p=b(o,e,h);k.points=[p,o],k.direction=d(o,f)}return k}function n(a,b,e,f){var h=l(b,a,f),i=h.points[0];if(e.containsPoint(i)){h=l(a,b,e);var j=h.points[0];if(f.containsPoint(j)){var m=new g.Point(a).move(j,-c(e,d(a,j))/2),n=new g.Point(b).move(i,-c(f,d(b,i))/2),o=new g.Line(m,n).midpoint(),p=l(a,o,e),q=k(o,b,p.direction);h.points=[p.points[0],q.points[0]],h.direction=q.direction}}return h}function o(a,c,e,f,h){var i,j,k,l={},m=e.union(f).inflate(1),n=m.center().distance(c)>m.center().distance(a),o=n?c:a,p=n?a:c;return h?(i=g.Point.fromPolar(m.width+m.height,r[h],o),i=m.pointNearestToPoint(i).move(i,-1)):i=m.pointNearestToPoint(o).move(o,1),j=b(i,p,m),i.round().equals(j.round())?(j=g.Point.fromPolar(m.width+m.height,g.toRad(i.theta(o))+Math.PI/2,p),j=m.pointNearestToPoint(j).move(p,1).round(),k=b(i,j,m),l.points=n?[j,k,i]:[i,k,j]):l.points=n?[j,i]:[i,j],l.direction=n?d(i,c):d(j,c),l}function p(b,c,p){var q=c.elementPadding||20,r=f(p,c),s=h(p,c),t=i(p,c),u=j(p,c);r=r.union(e(t)),s=s.union(e(u)),b=a.toArray(b).map(g.Point),b.unshift(t),b.push(u);for(var v,w=[],x=0,y=b.length-1;x<y;x++){var z=null,A=b[x],B=b[x+1],C=!!d(A,B);if(0===x)x+1===y?r.intersect(s.clone().inflate(1))?z=o(A,B,r,s):C||(z=n(A,B,r,s)):r.containsPoint(B)?z=o(A,B,r,e(B).inflate(q)):C||(z=l(A,B,r));else if(x+1===y){var D=C&&d(B,A)===v;s.containsPoint(A)||D?z=o(A,B,e(A).inflate(q),s,v):C||(z=m(A,B,s,v))}else C||(z=k(A,B,v));z?(Array.prototype.push.apply(w,z.points),v=z.direction):v=d(A,B),x+1<y&&w.push(B)}return w}var q={N:"S",S:"N",E:"W",W:"E"},r={N:-Math.PI/2*3,S:-Math.PI/2,E:0,W:Math.PI};return p}(joint.util),joint.connectors.normal=function(a,b,c,d){var e=d&&d.raw,f=[a].concat(c).concat([b]),h=new g.Polyline(f),i=new g.Path(h);return e?i:i.serialize()},joint.connectors.rounded=function(a,b,c,d){d||(d={});var e,f=d.radius||10,h=d.raw,i=new g.Path;e=g.Path.createSegment("M",a),i.appendSegment(e);for(var j,k,l,m,n,o,p,q,r,s,t,u=1/3,v=2/3,w=0,x=c.length;w<x;w++)j=new g.Point(c[w]),k=c[w-1]||a,l=c[w+1]||b,m=n||j.distance(k)/2,n=j.distance(l)/2,o=-Math.min(f,m),p=-Math.min(f,n),q=j.clone().move(k,o).round(),r=j.clone().move(l,p).round(),s=new g.Point(u*q.x+v*j.x,v*j.y+u*q.y),t=new g.Point(u*r.x+v*j.x,v*j.y+u*r.y),e=g.Path.createSegment("L",q),i.appendSegment(e),e=g.Path.createSegment("C",s,t,r),i.appendSegment(e);return e=g.Path.createSegment("L",b),i.appendSegment(e),h?i:i.serialize()},joint.connectors.smooth=function(a,b,c,d){var e,f=d&&d.raw;if(c&&0!==c.length){var h=[a].concat(c).concat([b]),i=g.Curve.throughPoints(h);e=new g.Path(i)}else{e=new g.Path;var j;if(j=g.Path.createSegment("M",a),e.appendSegment(j),Math.abs(a.x-b.x)>=Math.abs(a.y-b.y)){var k=(a.x+b.x)/2;j=g.Path.createSegment("C",k,a.y,k,b.y,b.x,b.y),e.appendSegment(j)}else{var l=(a.y+b.y)/2;j=g.Path.createSegment("C",a.x,l,b.x,l,b.x,b.y),e.appendSegment(j)}}return f?e:e.serialize()},joint.connectors.jumpover=function(a,b){function c(b,c,d){var e=[].concat(b,d,c);return e.reduce(function(b,c,d){var f=e[d+1];return null!=f&&(b[d]=a.line(c,f)),b},[])}function d(a){var b=a.paper._jumpOverUpdateList;null==b&&(b=a.paper._jumpOverUpdateList=[],a.paper.on("cell:pointerup",e),a.paper.model.on("reset",function(){b=a.paper._jumpOverUpdateList=[]})),b.indexOf(a)<0&&(b.push(a),a.listenToOnce(a.model,"change:connector remove",function(){b.splice(b.indexOf(a),1)}))}function e(){for(var a=this._jumpOverUpdateList,b=0;b<a.length;b++)a[b].update()}function f(a,c){return b.toArray(c).reduce(function(b,c){var d=a.intersection(c);return d&&b.push(d),b},[])}function g(b,c){return a.line(b,c).squaredLength()}function h(b,c,d){return c.reduce(function(e,f,g){if(f.skip===!0)return e;var h=e.pop()||b,i=a.point(f).move(h.start,-d),j=a.point(f).move(h.start,+d),k=c[g+1];if(null!=k){var m=j.distance(k);m<=d&&(j=k.move(h.start,m),k.skip=!0)}else{var n=i.distance(h.end);if(n<2*d+l)return e.push(h),e}var o=j.distance(h.start);if(o<2*d+l)return e.push(h),e;var p=a.line(i,j);return p.isJump=!0,e.push(a.line(h.start,i),p,a.line(j,h.end)),e},[])}function i(b,c,d){var e,f=new a.Path;return e=a.Path.createSegment("M",b[0].start),f.appendSegment(e),joint.util.toArray(b).forEach(function(b,g){if(b.isJump){var h,i,j,k;if("arc"===d){h=-90,i=b.start.difference(b.end);var l=Number(i.x<0||0===i.x&&i.y<0);l&&(h+=180);var m,n=b.midpoint(),o=new a.Line(n,b.end).rotate(n,h);m=new a.Line(b.start,n),j=m.pointAt(2/3).rotate(b.start,h),k=o.pointAt(1/3).rotate(o.end,-h),e=a.Path.createSegment("C",j,k,o.end),f.appendSegment(e),m=new a.Line(n,b.end),j=o.pointAt(1/3).rotate(o.end,h),k=m.pointAt(1/3).rotate(b.end,-h),e=a.Path.createSegment("C",j,k,b.end),f.appendSegment(e)}else if("gap"===d)e=a.Path.createSegment("M",b.end),f.appendSegment(e);else if("cubic"===d){h=b.start.theta(b.end);var p=.6*c,q=1.35*c;i=b.start.difference(b.end),l=Number(i.x<0||0===i.x&&i.y<0),l&&(q*=-1),j=a.Point(b.start.x+p,b.start.y+q).rotate(b.start,h),k=a.Point(b.end.x-p,b.end.y+q).rotate(b.end,h),e=a.Path.createSegment("C",j,k,b.end),f.appendSegment(e)}}else e=a.Path.createSegment("L",b.end),f.appendSegment(e)}),f}var j=5,k=["arc","gap","cubic"],l=1,m=["smooth"];return function(a,e,l,n){d(this);var o=n.raw,p=n.size||j,q=n.jump&&(""+n.jump).toLowerCase(),r=n.ignoreConnectors||m;k.indexOf(q)===-1&&(q=k[0]);var s=this.paper,t=s.model,u=t.getLinks();if(1===u.length)return i(c(a,e,l),p,q);var v=this.model,w=u.indexOf(v),x=s.options.defaultConnector||{},y=u.filter(function(a,c){var d=a.get("connector")||x;return!b.toArray(r).includes(d.name)&&(!(c>w)||"jumpover"!==d.name)}),z=y.map(function(a){return s.findViewByModel(a)}),A=c(a,e,l),B=z.map(function(a){return null==a?[]:a===this?A:c(a.sourcePoint,a.targetPoint,a.route)},this),C=A.reduce(function(a,b){var c=y.reduce(function(a,c,d){if(c!==v){var e=f(b,B[d]);a.push.apply(a,e)}return a},[]).sort(function(a,c){return g(b.start,a)-g(b.start,c)});return c.length>0?a.push.apply(a,h(b,c,p)):a.push(b),a},[]),D=i(C,p,q);return o?D:D.serialize()}}(g,joint.util),function(a,b,c){function d(a,c,d){var e=a.toJSON();return e.angle=c||0,b.util.defaults({},d,e)}function e(b,c,e){return b.map(function(a,b,c){var e=this.pointAt((b+.5)/c.length);return(a.dx||a.dy)&&e.offset(a.dx||0,a.dy||0),d(e.round(),0,a)},a.line(c,e))}function f(b,c,e,f){var g=c.center(),h=c.width/c.height,i=c.topMiddle(),j=a.Ellipse.fromRect(c);return b.map(function(a,b,c){var k=e+f(b,c.length),l=i.clone().rotate(g,-k).scale(h,1,g),m=a.compensateRotation?-j.tangentTheta(l):0;return(a.dx||a.dy)&&l.offset(a.dx||0,a.dy||0),a.dr&&l.move(g,a.dr),d(l.round(),m,a)})}function g(b,d){var e=d.x;c.isString(e)&&(e=parseFloat(e)/100*b.width);var f=d.y;return c.isString(f)&&(f=parseFloat(f)/100*b.height),a.point(e||0,f||0)}b.layout.Port={absolute:function(a,b,c){return a.map(g.bind(null,b))},fn:function(a,b,c){return c.fn(a,b,c)},line:function(a,b,c){var d=g(b,c.start||b.origin()),f=g(b,c.end||b.corner());return e(a,d,f)},left:function(a,b,c){return e(a,b.origin(),b.bottomLeft())},right:function(a,b,c){return e(a,b.topRight(),b.corner())},top:function(a,b,c){return e(a,b.origin(),b.topRight())},bottom:function(a,b,c){return e(a,b.bottomLeft(),b.corner())},ellipseSpread:function(a,b,c){var d=c.startAngle||0,e=c.step||360/a.length;return f(a,b,d,function(a){return a*e})},ellipse:function(a,b,c){var d=c.startAngle||0,e=c.step||20;return f(a,b,d,function(a,b){return(a+.5-b/2)*e})}}}(g,joint,joint.util),function(a,b,c){function d(a,b){return c.defaultsDeep({},a,b,{x:0,y:0,angle:0,attrs:{".":{y:"0","text-anchor":"start"}}})}function e(a,b,e,g){g=c.defaults({},g,{offset:15});var h,i,j,k,l=b.center().theta(a),m=f(b),n=g.offset,o=0;l<m[1]||l>m[2]?(j=".3em",h=n,i=0,k="start"):l<m[0]?(j="0",h=0,i=-n,e?(o=-90,k="start"):k="middle"):l<m[3]?(j=".3em",h=-n,i=0,k="end"):(j=".6em",h=0,i=n,e?(o=90,k="start"):k="middle");var p=Math.round;return d({x:p(h),y:p(i),angle:o,attrs:{".":{y:j,"text-anchor":k}}})}function f(a){var b=a.center(),c=b.theta(a.origin()),d=b.theta(a.bottomLeft()),e=b.theta(a.corner()),f=b.theta(a.topRight());return[c,f,e,d]}function g(a,b,e,g){var h=b.center().theta(a);g=c.defaults({},g,{offset:15});var i,j,k,l,m=g.offset,n=0,o=f(b);h<o[1]||h>o[2]?(k=".3em",i=-m,j=0,l="end"):h<o[0]?(k=".6em",i=0,j=m,e?(n=90,l="start"):l="middle"):h<o[3]?(k=".3em",i=m,j=0,l="start"):(k="0em",i=0,j=-m,e?(n=-90,l="start"):l="middle");var p=Math.round;return d({x:p(i),y:p(j),angle:n,attrs:{".":{y:k,"text-anchor":l}}})}function h(b,e,f){f=c.defaults({},f,{offset:20});var g,h=a.point(0,0),i=-b.theta(h),j=i,k=b.clone().move(h,f.offset).difference(b).round(),l=".3em";(i+90)%180===0?(g=e?"end":"middle",e||i!==-270||(l="0em")):i>-270&&i<-90?(g="start",j=i-180):g="end";var m=Math.round;return d({x:m(k.x),y:m(k.y),angle:e?j:0,attrs:{".":{y:l,"text-anchor":g}}})}b.layout.PortLabel={manual:function(a,b,c){return d(c,b)},left:function(a,b,c){return d(c,{x:-15,attrs:{".":{y:".3em","text-anchor":"end"}}})},right:function(a,b,c){return d(c,{x:15,attrs:{".":{y:".3em","text-anchor":"start"}}})},top:function(a,b,c){return d(c,{y:-15,attrs:{".":{"text-anchor":"middle"}}})},bottom:function(a,b,c){return d(c,{y:15,attrs:{".":{y:".6em","text-anchor":"middle"}}})},outsideOriented:function(a,b,c){return e(a,b,!0,c)},outside:function(a,b,c){return e(a,b,!1,c)},insideOriented:function(a,b,c){return g(a,b,!0,c)},inside:function(a,b,c){return g(a,b,!1,c)},radial:function(a,b,c){return h(a.difference(b.center()),!1,c)},radialOriented:function(a,b,c){return h(a.difference(b.center()),!0,c)}}}(g,joint,joint.util),joint.highlighters.addClass={className:joint.util.addClassNamePrefix("highlighted"),highlight:function(a,b,c){var d=c||{},e=d.className||this.className;V(b).addClass(e)},unhighlight:function(a,b,c){var d=c||{},e=d.className||this.className;V(b).removeClass(e)}},joint.highlighters.opacity={highlight:function(a,b){V(b).addClass(joint.util.addClassNamePrefix("highlight-opacity"))},unhighlight:function(a,b){V(b).removeClass(joint.util.addClassNamePrefix("highlight-opacity"))}},joint.highlighters.stroke={defaultOptions:{padding:3,rx:0,ry:0,attrs:{"stroke-width":3,stroke:"#FEB663"}},_views:{},getHighlighterId:function(a,b){return a.id+JSON.stringify(b)},removeHighlighter:function(a){this._views[a]&&(this._views[a].remove(),this._views[a]=null)},highlight:function(a,b,c){var d=this.getHighlighterId(b,c);if(!this._views[d]){var e,f=joint.util.defaults(c||{},this.defaultOptions),g=V(b);try{var h=g.convertToPathData()}catch(a){e=g.bbox(!0),h=V.rectToPath(joint.util.assign({},f,e))}var i=V("path").attr({d:h,"pointer-events":"none","vector-effect":"non-scaling-stroke",fill:"none"}).attr(f.attrs),j=g.getTransformToElement(a.el),k=f.padding;if(k){e||(e=g.bbox(!0));var l=e.x+e.width/2,m=e.y+e.height/2;e=V.transformRect(e,j);var n=Math.max(e.width,1),o=Math.max(e.height,1),p=(n+k)/n,q=(o+k)/o,r=V.createSVGMatrix({a:p,b:0,c:0,d:q,e:l-p*l,f:m-q*m});j=j.multiply(r)}i.transform(j);var s=this._views[d]=new joint.mvc.View({svgElement:!0,className:"highlight-stroke",el:i.node}),t=this.removeHighlighter.bind(this,d),u=a.model;s.listenTo(u,"remove",t),s.listenTo(u.graph,"reset",t),a.vel.append(i)}},unhighlight:function(a,b,c){this.removeHighlighter(this.getHighlighterId(b,c))}},function(a,b){function c(a){return function(c,d,e,f){var g=!!f.rotate,h=g?c.getNodeUnrotatedBBox(d):c.getNodeBBox(d),i=h[a](),j=f.dx;if(j){var k=b.isPercentage(j);j=parseFloat(j),isFinite(j)&&(k&&(j/=100,j*=h.width),i.x+=j)}var l=f.dy;if(l){var m=b.isPercentage(l);l=parseFloat(l),isFinite(l)&&(m&&(l/=100,l*=h.height),i.y+=l)}return g?i.rotate(c.model.getBBox().center(),-c.model.angle()):i}}function d(a){return function(b,c,d,e){if(d instanceof Element){var f=this.paper.findView(d),h=f?f.getNodeBBox(d).center():new g.Point;return a.call(this,b,c,h,e)}return a.apply(this,arguments)}}function e(a,b,c,d){var e=a.model.angle(),f=a.getNodeBBox(b),h=f.center(),i=f.origin(),j=f.corner(),k=d.padding;if(isFinite(k)||(k=0),i.y+k<=c.y&&c.y<=j.y-k){var l=c.y-h.y;h.x+=0===e||180===e?0:1*l/Math.tan(g.toRad(e)),h.y+=l}else if(i.x+k<=c.x&&c.x<=j.x-k){var m=c.x-h.x;h.y+=90===e||270===e?0:m*Math.tan(g.toRad(e)),h.x+=m}return h}function f(a,b,c,d){var e,f,g,h=!!d.rotate;h?(e=a.getNodeUnrotatedBBox(b),g=a.model.getBBox().center(),f=a.model.angle()):e=a.getNodeBBox(b);var i=d.padding;isFinite(i)&&e.inflate(i),h&&c.rotate(g,f);var j,k=e.sideNearestToPoint(c);switch(k){case"left":j=e.leftMiddle();break;case"right":j=e.rightMiddle();break;case"top":j=e.topMiddle();break;case"bottom":j=e.bottomMiddle()}return h?j.rotate(g,-f):j}function h(a,b){var c=a.model,d=c.getBBox(),e=d.center(),f=c.angle(),h=a.findAttribute("port",b);if(h){var i=c.portProp(h,"group"),j=c.getPortsPositions(i),k=new g.Point(j[h]).offset(d.origin());return k.rotate(e,-f),k}return e}a.anchors={center:c("center"),top:c("topMiddle"),bottom:c("bottomMiddle"),left:c("leftMiddle"),right:c("rightMiddle"),topLeft:c("origin"),topRight:c("topRight"),bottomLeft:c("bottomLeft"),bottomRight:c("corner"),perpendicular:d(e),midSide:d(f),modelCenter:h}}(joint,joint.util),function(a,b,c,d){function e(a,c){return 1===a.length?a[0]:b.sortBy(a,function(a){return a.squaredDistance(c)})[0]}function f(a,b,c){if(!isFinite(c))return a;var d=a.distance(b);return 0===c&&d>0?a:a.move(b,-Math.min(c,d-1))}function g(a){var b=a.getAttribute("stroke-width");return null===b?0:parseFloat(b)||0}function h(a,b,c,d){return f(a.end,a.start,d.offset)}function i(a,b,c,d){var h=b.getNodeBBox(c);d.stroke&&h.inflate(g(c)/2);var i=a.intersect(h),j=i?e(i,a.start):a.end;return f(j,a.start,d.offset)}function j(a,b,c,d){var h=b.model.angle();if(0===h)return i(a,b,c,d);var j=b.getNodeUnrotatedBBox(c);d.stroke&&j.inflate(g(c)/2);var k=j.center(),l=a.clone().rotate(k,h),m=l.setLength(1e6).intersect(j),n=m?e(m,l.start).rotate(k,-h):a.end;return f(n,a.start,d.offset)}function k(a,h,i,j){var k,n,o=j.selector,p=a.end;if("string"==typeof o)k=h.findBySelector(o)[0];else if(Array.isArray(o))k=b.getByPath(i,o);else{k=i;do{var q=k.tagName.toUpperCase();if("G"===q)k=k.firstChild;else{if("TITLE"!==q)break;k=k.nextSibling}}while(k)}if(!(k instanceof Element))return p;var r=h.getNodeShape(k),s=h.getNodeMatrix(k),t=h.getRootTranslateMatrix(),u=h.getRootRotateMatrix(),v=t.multiply(u).multiply(s),w=v.inverse(),x=d.transformLine(a,w),y=x.start.clone(),z=h.getNodeData(k);if(j.insideout===!1){z[m]||(z[m]=r.bbox());var A=z[m];if(A.containsPoint(y))return p}var B;if(r instanceof c.Path){var C=j.precision||2;z[l]||(z[l]=r.getSegmentSubdivisions({precision:C})),B={precision:C,segmentSubdivisions:z[l]}}j.extrapolate===!0&&x.setLength(1e6),n=x.intersect(r,B),n?d.isArray(n)&&(n=e(n,y)):j.sticky===!0&&(n=r instanceof c.Rect?r.pointNearestToPoint(y):r instanceof c.Ellipse?r.intersectionWithLineFromCenterToPoint(y):r.closestPoint(y,B));var D=n?d.transformPoint(n,v):p,E=j.offset||0;return j.stroke&&(E+=g(k)/2),f(D,a.start,E)}var l="segmentSubdivisons",m="shapeBBox";a.connectionPoints={anchor:h,bbox:i,rectangle:j,boundary:k}}(joint,joint.util,g,V),function(a,b){function c(a,b){return 0===b?"0%":Math.round(a/b*100)+"%"}function d(a){return function(b,d,e,f){var g=d.model.angle(),h=d.getNodeUnrotatedBBox(e),i=d.model.getBBox().center();f.rotate(i,g);var j=f.x-h.x,k=f.y-h.y;return a&&(j=c(j,h.width),k=c(k,h.height)),b.anchor={name:"topLeft",args:{dx:j,dy:k,rotate:!0}},b}}a.connectionStrategies={useDefaults:b.noop,pinAbsolute:d(!1),pinRelative:d(!0)}}(joint,joint.util),function(a,b,c,d){function e(b,c,d){var e=a.connectionStrategies.pinRelative.call(this.paper,{},c,d,b,this.model);return e.anchor}function f(a,b,c,d,e,f){var g=f.options.snapRadius,h="source"===d,i=h?0:-1,j=this.model.vertex(i)||this.getEndAnchor(h?"target":"source");return j&&(Math.abs(j.x-a.x)<g&&(a.x=j.x),Math.abs(j.y-a.y)<g&&(a.y=j.y)),a}var g=a.dia.ToolView,h=a.mvc.View.extend({tagName:"circle",svgElement:!0,className:"marker-vertex",events:{mousedown:"onPointerDown",touchstart:"onPointerDown",dblclick:"onDoubleClick"},documentEvents:{mousemove:"onPointerMove",touchmove:"onPointerMove",mouseup:"onPointerUp",touchend:"onPointerUp"},attributes:{r:6,fill:"#33334F",stroke:"#FFFFFF","stroke-width":2,cursor:"move"},position:function(a,b){this.vel.attr({cx:a,cy:b})},onPointerDown:function(a){a.stopPropagation(),this.options.paper.undelegateEvents(),this.delegateDocumentEvents(null,a.data),this.trigger("will-change")},onPointerMove:function(a){this.trigger("changing",this,a)},onDoubleClick:function(a){this.trigger("remove",this,a)},onPointerUp:function(a){this.trigger("changed",this,a),this.undelegateDocumentEvents(),this.options.paper.delegateEvents()}}),i=g.extend({name:"vertices",options:{handleClass:h,snapRadius:20,redundancyRemoval:!0,vertexAdding:!0},children:[{tagName:"path",selector:"connection",className:"joint-vertices-path",attributes:{fill:"none",stroke:"transparent","stroke-width":10,cursor:"cell"}}],handles:null,events:{"mousedown .joint-vertices-path":"onPathPointerDown"},onRender:function(){this.resetHandles(),this.options.vertexAdding&&(this.renderChildren(),this.updatePath());for(var a=this.relatedView,b=a.model.vertices(),c=0,d=b.length;c<d;c++){var e=b[c],f=new this.options.handleClass({index:c,paper:this.paper});f.render(),f.position(e.x,e.y),this.simulateRelatedView(f.el),f.vel.appendTo(this.el),this.handles.push(f),this.startHandleListening(f)}return this},update:function(){return this.render(),this},updatePath:function(){var a=this.childNodes.connection;a&&a.setAttribute("d",this.relatedView.getConnection().serialize())},startHandleListening:function(a){var b=this.relatedView;b.can("vertexMove")&&(this.listenTo(a,"will-change",this.onHandleWillChange),this.listenTo(a,"changing",this.onHandleChanging),this.listenTo(a,"changed",this.onHandleChanged)),b.can("vertexRemove")&&this.listenTo(a,"remove",this.onHandleRemove)},resetHandles:function(){var a=this.handles;if(this.handles=[],this.stopListening(),Array.isArray(a))for(var b=0,c=a.length;b<c;b++)a[b].remove()},getNeighborPoints:function(a){var b=this.relatedView,c=b.model.vertices(),e=a>0?c[a-1]:b.sourceAnchor,f=a<c.length-1?c[a+1]:b.targetAnchor;return{prev:new d.Point(e),next:new d.Point(f)}},onHandleWillChange:function(a,b){this.focus(),this.relatedView.model.startBatch("vertex-move",{ui:!0,tool:this.cid})},onHandleChanging:function(a,b){var c=this.relatedView,d=c.paper,e=a.options.index,f=d.snapToGrid(b.clientX,b.clientY).toJSON();this.snapVertex(f,e),c.model.vertex(e,f,{ui:!0,tool:this.cid}),a.position(f.x,f.y)},snapVertex:function(a,b){var c=this.options.snapRadius;if(c>0){var d=this.getNeighborPoints(b),e=d.prev,f=d.next;Math.abs(a.x-e.x)<c?a.x=e.x:Math.abs(a.x-f.x)<c&&(a.x=f.x),Math.abs(a.y-e.y)<c?a.y=d.prev.y:Math.abs(a.y-f.y)<c&&(a.y=f.y)}},onHandleChanged:function(a,b){if(this.options.vertexAdding&&this.updatePath(),this.options.redundancyRemoval){var c=this.relatedView,d=c.removeRedundantLinearVertices({ui:!0,tool:this.cid});d&&this.render(),this.blur(),c.model.stopBatch("vertex-move",{
ui:!0,tool:this.cid}),this.eventData(b).vertexAdded&&c.model.stopBatch("vertex-add",{ui:!0,tool:this.cid})}},onHandleRemove:function(a){var b=a.options.index;this.relatedView.model.removeVertex(b,{ui:!0})},onPathPointerDown:function(a){a.stopPropagation();var b=this.paper.snapToGrid(a.clientX,a.clientY).toJSON(),c=this.relatedView;c.model.startBatch("vertex-add",{ui:!0,tool:this.cid});var d=c.getVertexIndex(b.x,b.y);this.snapVertex(b,d),c.model.insertVertex(d,b,{ui:!0,tool:this.cid}),this.render();var e=this.handles[d];this.eventData(a,{vertexAdded:!0}),e.onPointerDown(a)},onRemove:function(){this.resetHandles()}},{VertexHandle:h}),j=a.mvc.View.extend({tagName:"g",svgElement:!0,className:"marker-segment",events:{mousedown:"onPointerDown",touchstart:"onPointerDown"},documentEvents:{mousemove:"onPointerMove",touchmove:"onPointerMove",mouseup:"onPointerUp",touchend:"onPointerUp"},children:[{tagName:"line",selector:"line",attributes:{stroke:"#33334F","stroke-width":2,fill:"none","pointer-events":"none"}},{tagName:"rect",selector:"handle",attributes:{width:20,height:8,x:-10,y:-4,rx:4,ry:4,fill:"#33334F",stroke:"#FFFFFF","stroke-width":2}}],onRender:function(){this.renderChildren()},position:function(a,b,e,f){var g=c.createSVGMatrix().translate(a,b).rotate(e),h=this.childNodes.handle;h.setAttribute("transform",c.matrixToTransformString(g)),h.setAttribute("cursor",e%180===0?"row-resize":"col-resize");var i=f.getClosestPoint(new d.Point(a,b)),j=this.childNodes.line;j.setAttribute("x1",a),j.setAttribute("y1",b),j.setAttribute("x2",i.x),j.setAttribute("y2",i.y)},onPointerDown:function(a){this.trigger("change:start",this,a),a.stopPropagation(),this.options.paper.undelegateEvents(),this.delegateDocumentEvents(null,a.data)},onPointerMove:function(a){this.trigger("changing",this,a)},onPointerUp:function(a){this.undelegateDocumentEvents(),this.options.paper.delegateEvents(),this.trigger("change:end",this,a)},show:function(){this.el.style.display=""},hide:function(){this.el.style.display="none"}}),k=g.extend({name:"segments",precision:.5,options:{handleClass:j,segmentLengthThreshold:40,redundancyRemoval:!0,anchor:e,snapRadius:10,snapHandle:!0},handles:null,onRender:function(){this.resetHandles();var a=this.relatedView,b=a.model.vertices();b.unshift(a.sourcePoint),b.push(a.targetPoint);for(var c=0,d=b.length;c<d-1;c++){var e=b[c],f=b[c+1],g=this.renderHandle(e,f);this.simulateRelatedView(g.el),this.handles.push(g),g.options.index=c}return this},renderHandle:function(a,b){var c=new this.options.handleClass({paper:this.paper});return c.render(),this.updateHandle(c,a,b),c.vel.appendTo(this.el),this.startHandleListening(c),c},update:function(){return this.render(),this},startHandleListening:function(a){this.listenTo(a,"change:start",this.onHandleChangeStart),this.listenTo(a,"changing",this.onHandleChanging),this.listenTo(a,"change:end",this.onHandleChangeEnd)},resetHandles:function(){var a=this.handles;if(this.handles=[],this.stopListening(),Array.isArray(a))for(var b=0,c=a.length;b<c;b++)a[b].remove()},shiftHandleIndexes:function(a){for(var b=this.handles,c=0,d=b.length;c<d;c++)b[c].options.index+=a},resetAnchor:function(a,b){var c=this.relatedView.model;b?c.prop([a,"anchor"],b,{rewrite:!0,ui:!0,tool:this.cid}):c.removeProp([a,"anchor"],{ui:!0,tool:this.cid})},snapHandle:function(a,b,c){var d=a.options.index,e=this.relatedView,f=e.model,g=f.vertices(),h=a.options.axis,i=g[d-2]||c.sourceAnchor,j=g[d+1]||c.targetAnchor,k=this.options.snapRadius;return Math.abs(b[h]-i[h])<k?b[h]=i[h]:Math.abs(b[h]-j[h])<k&&(b[h]=j[h]),b},onHandleChanging:function(a,c){var d=this.eventData(c),e=this.relatedView,f=e.paper,g=a.options.index-1,h=f.snapToGrid(c.clientX,c.clientY),i=this.snapHandle(a,h.clone(),d),j=a.options.axis,k=this.options.snapHandle?0:h[j]-i[j],l=e.model,m=b.cloneDeep(l.vertices()),n=m[g],o=m[g+1],p=this.options.anchor;"function"!=typeof p&&(p=null);var q=e.sourceView,r=e.sourceBBox,s=!1,t=!1;if(n?0===g?r.containsPoint(n)?(m.shift(),this.shiftHandleIndexes(-1),s=!0):(n[j]=i[j],t=!0):n[j]=i[j]:(n=e.sourceAnchor.toJSON(),n[j]=i[j],r.containsPoint(n)?(n[j]=i[j],s=!0):(m.unshift(n),this.shiftHandleIndexes(1),t=!0)),p&&q){if(s){var u=d.sourceAnchor.clone();u[j]=i[j];var v=p.call(e,u,q,e.sourceMagnet||q.el,"source",e);this.resetAnchor("source",v)}t&&this.resetAnchor("source",d.sourceAnchorDef)}var w=e.targetView,x=e.targetBBox,y=!1,z=!1;if(o?g===m.length-2?x.containsPoint(o)?(m.pop(),y=!0):(o[j]=i[j],z=!0):o[j]=i[j]:(o=e.targetAnchor.toJSON(),o[j]=i[j],x.containsPoint(o)?y=!0:(m.push(o),z=!0)),p&&w){if(y){var A=d.targetAnchor.clone();A[j]=i[j];var B=p.call(e,A,w,e.targetMagnet||w.el,"target",e);this.resetAnchor("target",B)}z&&this.resetAnchor("target",d.targetAnchorDef)}l.vertices(m,{ui:!0,tool:this.cid}),this.updateHandle(a,n,o,k)},onHandleChangeStart:function(a,c){var d=a.options.index,e=this.handles;if(Array.isArray(e)){for(var f=0,g=e.length;f<g;f++)f!==d&&e[f].hide();this.focus();var h=this.relatedView,i=h.model;this.eventData(c,{sourceAnchor:h.sourceAnchor.clone(),targetAnchor:h.targetAnchor.clone(),sourceAnchorDef:b.clone(i.prop(["source","anchor"])),targetAnchorDef:b.clone(i.prop(["target","anchor"]))}),h.model.startBatch("segment-move",{ui:!0,tool:this.cid})}},onHandleChangeEnd:function(a){var b=this.relatedView;this.options.redundancyRemoval&&b.removeRedundantLinearVertices({ui:!0,tool:this.cid}),this.render(),this.blur(),b.model.stopBatch("segment-move",{ui:!0,tool:this.cid})},updateHandle:function(a,b,c,e){var f=Math.abs(b.x-c.x)<this.precision,g=Math.abs(b.y-c.y)<this.precision;if(f||g){var h=new d.Line(b,c),i=h.length();if(i<this.options.segmentLengthThreshold)a.hide();else{var j=h.midpoint(),k=f?"x":"y";j[k]+=e||0;var l=h.vector().vectorAngle(new d.Point(1,0));a.position(j.x,j.y,l,this.relatedView),a.show(),a.options.axis=k}}else a.hide()},onRemove:function(){this.resetHandles()}},{SegmentHandle:j}),l=g.extend({tagName:"path",xAxisVector:new d.Point(1,0),events:{mousedown:"onPointerDown",touchstart:"onPointerDown"},documentEvents:{mousemove:"onPointerMove",touchmove:"onPointerMove",mouseup:"onPointerUp",touchend:"onPointerUp"},onRender:function(){this.update()},update:function(){var a,b,d=this.ratio,e=this.relatedView,f=e.getTangentAtRatio(d);f?(a=f.start,b=f.vector().vectorAngle(this.xAxisVector)||0):(a=e.getPointAtRatio(d),b=0);var g=c.createSVGMatrix().translate(a.x,a.y).rotate(b);return this.vel.transform(g,{absolute:!0}),this},onPointerDown:function(a){a.stopPropagation();var b=this.relatedView;b.model.startBatch("arrowhead-move",{ui:!0,tool:this.cid}),b.can("arrowheadMove")&&(b.startArrowheadMove(this.arrowheadType),this.delegateDocumentEvents(),b.paper.undelegateEvents()),this.focus(),this.el.style.pointerEvents="none"},onPointerMove:function(a){var b=this.paper.snapToGrid(a.clientX,a.clientY);this.relatedView.pointermove(a,b.x,b.y)},onPointerUp:function(a){this.undelegateDocumentEvents();var b=this.relatedView,c=b.paper,d=c.snapToGrid(a.clientX,a.clientY);b.pointerup(a,d.x,d.y),c.delegateEvents(),this.blur(),this.el.style.pointerEvents="",b.model.stopBatch("arrowhead-move",{ui:!0,tool:this.cid})}}),m=l.extend({name:"target-arrowhead",ratio:1,arrowheadType:"target",attributes:{d:"M -10 -8 10 0 -10 8 Z",fill:"#33334F",stroke:"#FFFFFF","stroke-width":2,cursor:"move",class:"target-arrowhead"}}),n=l.extend({name:"source-arrowhead",ratio:0,arrowheadType:"source",attributes:{d:"M 10 -8 -10 0 10 8 Z",fill:"#33334F",stroke:"#FFFFFF","stroke-width":2,cursor:"move",class:"source-arrowhead"}}),o=g.extend({name:"button",events:{mousedown:"onPointerDown",touchstart:"onPointerDown"},options:{distance:0,offset:0,rotate:!1},onRender:function(){this.renderChildren(this.options.markup),this.update()},update:function(){var a,e,f,g=this.options.distance||0;a=b.isPercentage(g)?this.relatedView.getTangentAtRatio(parseFloat(g)/100):this.relatedView.getTangentAtLength(g),a?(e=a.start,f=a.vector().vectorAngle(new d.Point(1,0))||0):(e=this.relatedView.getConnection().start,f=0);var h=c.createSVGMatrix().translate(e.x,e.y).rotate(f).translate(0,this.options.offset||0);return this.options.rotate||(h=h.rotate(-f)),this.vel.transform(h,{absolute:!0}),this},onPointerDown:function(a){a.stopPropagation();var b=this.options.action;"function"==typeof b&&b.call(this.relatedView,a,this.relatedView)}}),p=o.extend({children:[{tagName:"circle",selector:"button",attributes:{r:7,fill:"#FF1D00",cursor:"pointer"}},{tagName:"path",selector:"icon",attributes:{d:"M -3 -3 3 3 M -3 3 3 -3",fill:"none",stroke:"#FFFFFF","stroke-width":2,"pointer-events":"none"}}],options:{distance:60,offset:0,action:function(a){this.model.remove({ui:!0,tool:this.cid})}}}),q=g.extend({name:"boundary",tagName:"rect",options:{padding:10},attributes:{fill:"none",stroke:"#33334F","stroke-width":.5,"stroke-dasharray":"5, 5","pointer-events":"none"},onRender:function(){this.update()},update:function(){var a=this.options.padding;isFinite(a)||(a=0);var b=this.relatedView.getConnection().bbox().inflate(a);return this.vel.attr(b.toJSON()),this}}),r=g.extend({tagName:"g",type:null,children:[{tagName:"circle",selector:"anchor",attributes:{cursor:"pointer"}},{tagName:"rect",selector:"area",attributes:{"pointer-events":"none",fill:"none",stroke:"#33334F","stroke-dasharray":"2,4",rx:5,ry:5}}],events:{mousedown:"onPointerDown",touchstart:"onPointerDown",dblclick:"onPointerDblClick"},documentEvents:{mousemove:"onPointerMove",touchmove:"onPointerMove",mouseup:"onPointerUp",touchend:"onPointerUp"},options:{snap:f,anchor:e,customAnchorAttributes:{"stroke-width":4,stroke:"#33334F",fill:"#FFFFFF",r:5},defaultAnchorAttributes:{"stroke-width":2,stroke:"#FFFFFF",fill:"#33334F",r:6},areaPadding:6,snapRadius:10,restrictArea:!0,redundancyRemoval:!0},onRender:function(){this.renderChildren(),this.toggleArea(!1),this.update()},update:function(){var a=this.type,b=this.relatedView,c=b.getEndView(a);return c?(this.updateAnchor(),this.updateArea(),this.el.style.display=""):this.el.style.display="none",this},updateAnchor:function(){var a=this.childNodes;if(a){var b=a.anchor;if(b){var c=this.relatedView,d=this.type,e=c.getEndAnchor(d),f=this.options,g=c.model.prop([d,"anchor"]);b.setAttribute("transform","translate("+e.x+","+e.y+")");var h=g?f.customAnchorAttributes:f.defaultAnchorAttributes;for(var i in h)b.setAttribute(i,h[i])}}},updateArea:function(){var a=this.childNodes;if(a){var b=a.area;if(b){var c=this.relatedView,d=this.type,e=c.getEndView(d),f=c.getEndMagnet(d),g=this.options.areaPadding;isFinite(g)||(g=0);var h=e.getNodeUnrotatedBBox(f).inflate(g),i=e.model.angle();b.setAttribute("x",-h.width/2),b.setAttribute("y",-h.height/2),b.setAttribute("width",h.width),b.setAttribute("height",h.height);var j=e.model.getBBox().center(),k=h.center().rotate(j,-i);b.setAttribute("transform","translate("+k.x+","+k.y+") rotate("+i+")")}}},toggleArea:function(a){this.childNodes.area.style.display=a?"":"none"},onPointerDown:function(a){a.stopPropagation(),this.paper.undelegateEvents(),this.delegateDocumentEvents(),this.focus(),this.toggleArea(this.options.restrictArea),this.relatedView.model.startBatch("anchor-move",{ui:!0,tool:this.cid})},resetAnchor:function(a){var b=this.type,c=this.relatedView.model;a?c.prop([b,"anchor"],a,{rewrite:!0,ui:!0,tool:this.cid}):c.removeProp([b,"anchor"],{ui:!0,tool:this.cid})},onPointerMove:function(a){var b=this.relatedView,c=this.type,e=b.getEndView(c),f=b.getEndMagnet(c),g=this.paper.clientToLocalPoint(a.clientX,a.clientY),h=this.options.snap;if("function"==typeof h&&(g=h.call(b,g,e,f,c,b,this),g=new d.Point(g)),this.options.restrictArea){var i=e.getNodeUnrotatedBBox(f),j=e.model.angle(),k=e.model.getBBox().center(),l=g.clone().rotate(k,j);i.containsPoint(l)||(g=i.pointNearestToPoint(l).rotate(k,-j))}var m,n=this.options.anchor;"function"==typeof n&&(m=n.call(b,g,e,f,c,b)),this.resetAnchor(m),this.update()},onPointerUp:function(a){this.paper.delegateEvents(),this.undelegateDocumentEvents(),this.blur(),this.toggleArea(!1);var b=this.relatedView;this.options.redundancyRemoval&&b.removeRedundantLinearVertices({ui:!0,tool:this.cid}),b.model.stopBatch("anchor-move",{ui:!0,tool:this.cid})},onPointerDblClick:function(){this.resetAnchor(),this.update()}}),s=r.extend({name:"source-anchor",type:"source"}),t=r.extend({name:"target-anchor",type:"target"});a.linkTools={Vertices:i,Segments:k,SourceArrowhead:n,TargetArrowhead:m,SourceAnchor:s,TargetAnchor:t,Button:o,Remove:p,Boundary:q}}(joint,joint.util,V,g);
joint.dia.Element.define("erd.Entity",{size:{width:150,height:60},attrs:{".outer":{fill:"#2ECC71",stroke:"#27AE60","stroke-width":2,points:"100,0 100,60 0,60 0,0"},".inner":{fill:"#2ECC71",stroke:"#27AE60","stroke-width":2,points:"95,5 95,55 5,55 5,5",display:"none"},text:{text:"Entity","font-family":"Arial","font-size":14,"ref-x":.5,"ref-y":.5,"y-alignment":"middle","text-anchor":"middle"}}},{markup:'<g class="rotatable"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g><text/></g>'}),joint.shapes.erd.Entity.define("erd.WeakEntity",{attrs:{".inner":{display:"auto"},text:{text:"Weak Entity"}}}),joint.dia.Element.define("erd.Relationship",{size:{width:80,height:80},attrs:{".outer":{fill:"#3498DB",stroke:"#2980B9","stroke-width":2,points:"40,0 80,40 40,80 0,40"},".inner":{fill:"#3498DB",stroke:"#2980B9","stroke-width":2,points:"40,5 75,40 40,75 5,40",display:"none"},text:{text:"Relationship","font-family":"Arial","font-size":12,"ref-x":.5,"ref-y":.5,"y-alignment":"middle","text-anchor":"middle"}}},{markup:'<g class="rotatable"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g><text/></g>'}),joint.shapes.erd.Relationship.define("erd.IdentifyingRelationship",{attrs:{".inner":{display:"auto"},text:{text:"Identifying"}}}),joint.dia.Element.define("erd.Attribute",{size:{width:100,height:50},attrs:{ellipse:{transform:"translate(50, 25)"},".outer":{stroke:"#D35400","stroke-width":2,cx:0,cy:0,rx:50,ry:25,fill:"#E67E22"},".inner":{stroke:"#D35400","stroke-width":2,cx:0,cy:0,rx:45,ry:20,fill:"#E67E22",display:"none"},text:{"font-family":"Arial","font-size":14,"ref-x":.5,"ref-y":.5,"y-alignment":"middle","text-anchor":"middle"}}},{markup:'<g class="rotatable"><g class="scalable"><ellipse class="outer"/><ellipse class="inner"/></g><text/></g>'}),joint.shapes.erd.Attribute.define("erd.Multivalued",{attrs:{".inner":{display:"block"},text:{text:"multivalued"}}}),joint.shapes.erd.Attribute.define("erd.Derived",{attrs:{".outer":{"stroke-dasharray":"3,5"},text:{text:"derived"}}}),joint.shapes.erd.Attribute.define("erd.Key",{attrs:{ellipse:{"stroke-width":4},text:{text:"key","font-weight":"800","text-decoration":"underline"}}}),joint.shapes.erd.Attribute.define("erd.Normal",{attrs:{text:{text:"Normal"}}}),joint.dia.Element.define("erd.ISA",{type:"erd.ISA",size:{width:100,height:50},attrs:{polygon:{points:"0,0 50,50 100,0",fill:"#F1C40F",stroke:"#F39C12","stroke-width":2},text:{text:"ISA","font-size":18,"ref-x":.5,"ref-y":.3,"y-alignment":"middle","text-anchor":"middle"}}},{markup:'<g class="rotatable"><g class="scalable"><polygon/></g><text/></g>'}),joint.dia.Link.define("erd.Line",{},{cardinality:function(a){this.set("labels",[{position:-20,attrs:{text:{dy:-8,text:a}}}])}});
joint.shapes.basic.Circle.define("fsa.State",{attrs:{circle:{"stroke-width":3},text:{"font-weight":"800"}}}),joint.dia.Element.define("fsa.StartState",{size:{width:20,height:20},attrs:{circle:{transform:"translate(10, 10)",r:10,fill:"#000000"}}},{markup:'<g class="rotatable"><g class="scalable"><circle/></g></g>'}),joint.dia.Element.define("fsa.EndState",{size:{width:20,height:20},attrs:{".outer":{transform:"translate(10, 10)",r:10,fill:"#ffffff",stroke:"#000000"},".inner":{transform:"translate(10, 10)",r:6,fill:"#000000"}}},{markup:'<g class="rotatable"><g class="scalable"><circle class="outer"/><circle class="inner"/></g></g>'}),joint.dia.Link.define("fsa.Arrow",{attrs:{".marker-target":{d:"M 10 0 L 0 5 L 10 10 z"}},smooth:!0});
joint.dia.Element.define("org.Member",{size:{width:180,height:70},attrs:{rect:{width:170,height:60},".card":{fill:"#FFFFFF",stroke:"#000000","stroke-width":2,"pointer-events":"visiblePainted",rx:10,ry:10},image:{width:48,height:48,ref:".card","ref-x":10,"ref-y":5},".rank":{"text-decoration":"underline",ref:".card","ref-x":.9,"ref-y":.2,"font-family":"Courier New","font-size":14,"text-anchor":"end"},".name":{"font-weight":"800",ref:".card","ref-x":.9,"ref-y":.6,"font-family":"Courier New","font-size":14,"text-anchor":"end"}}},{markup:'<g class="rotatable"><g class="scalable"><rect class="card"/><image/></g><text class="rank"/><text class="name"/></g>'}),joint.dia.Link.define("org.Arrow",{source:{selector:".card"},target:{selector:".card"},attrs:{".connection":{stroke:"#585858","stroke-width":3}},z:-1});
joint.shapes.basic.Generic.define("chess.KingWhite",{size:{width:42,height:38}},{markup:'<g class="rotatable"><g class="scalable"><g style="fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"><path      d="M 22.5,11.63 L 22.5,6"      style="fill:none; stroke:#000000; stroke-linejoin:miter;" />    <path      d="M 20,8 L 25,8"      style="fill:none; stroke:#000000; stroke-linejoin:miter;" />    <path      d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"      style="fill:#ffffff; stroke:#000000; stroke-linecap:butt; stroke-linejoin:miter;" />    <path      d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "      style="fill:#ffffff; stroke:#000000;" />    <path      d="M 11.5,30 C 17,27 27,27 32.5,30"      style="fill:none; stroke:#000000;" />    <path      d="M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5"      style="fill:none; stroke:#000000;" />    <path      d="M 11.5,37 C 17,34 27,34 32.5,37"      style="fill:none; stroke:#000000;" />  </g></g></g>'}),joint.shapes.basic.Generic.define("chess.KingBlack",{size:{width:42,height:38}},{markup:'<g class="rotatable"><g class="scalable"><g style="fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path       d="M 22.5,11.63 L 22.5,6"       style="fill:none; stroke:#000000; stroke-linejoin:miter;"       id="path6570" />    <path       d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"       style="fill:#000000;fill-opacity:1; stroke-linecap:butt; stroke-linejoin:miter;" />    <path       d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "       style="fill:#000000; stroke:#000000;" />    <path       d="M 20,8 L 25,8"       style="fill:none; stroke:#000000; stroke-linejoin:miter;" />    <path       d="M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85"       style="fill:none; stroke:#ffffff;" />    <path       d="M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37"       style="fill:none; stroke:#ffffff;" />  </g></g></g>'}),joint.shapes.basic.Generic.define("chess.QueenWhite",{size:{width:42,height:38}},{markup:'<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path      d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"      transform="translate(-1,-1)" />    <path      d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"      transform="translate(15.5,-5.5)" />    <path      d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"      transform="translate(32,-1)" />    <path      d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"      transform="translate(7,-4.5)" />    <path      d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"      transform="translate(24,-4)" />    <path      d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z "      style="stroke-linecap:butt;" />    <path      d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z "      style="stroke-linecap:butt;" />    <path      d="M 11.5,30 C 15,29 30,29 33.5,30"      style="fill:none;" />    <path      d="M 12,33.5 C 18,32.5 27,32.5 33,33.5"      style="fill:none;" />  </g></g></g>'}),joint.shapes.basic.Generic.define("chess.QueenBlack",{size:{width:42,height:38}},{markup:'<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:#000000; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <g style="fill:#000000; stroke:none;">      <circle cx="6"    cy="12" r="2.75" />      <circle cx="14"   cy="9"  r="2.75" />      <circle cx="22.5" cy="8"  r="2.75" />      <circle cx="31"   cy="9"  r="2.75" />      <circle cx="39"   cy="12" r="2.75" />    </g>    <path       d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"       style="stroke-linecap:butt; stroke:#000000;" />    <path       d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"       style="stroke-linecap:butt;" />    <path       d="M 11,38.5 A 35,35 1 0 0 34,38.5"       style="fill:none; stroke:#000000; stroke-linecap:butt;" />    <path       d="M 11,29 A 35,35 1 0 1 34,29"       style="fill:none; stroke:#ffffff;" />    <path       d="M 12.5,31.5 L 32.5,31.5"       style="fill:none; stroke:#ffffff;" />    <path       d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5"       style="fill:none; stroke:#ffffff;" />    <path       d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5"       style="fill:none; stroke:#ffffff;" />  </g></g></g>'}),joint.shapes.basic.Generic.define("chess.RookWhite",{size:{width:32,height:34}},{markup:'<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path      d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "      style="stroke-linecap:butt;" />    <path      d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "      style="stroke-linecap:butt;" />    <path      d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"      style="stroke-linecap:butt;" />    <path      d="M 34,14 L 31,17 L 14,17 L 11,14" />    <path      d="M 31,17 L 31,29.5 L 14,29.5 L 14,17"      style="stroke-linecap:butt; stroke-linejoin:miter;" />    <path      d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />    <path      d="M 11,14 L 34,14"      style="fill:none; stroke:#000000; stroke-linejoin:miter;" />  </g></g></g>'}),joint.shapes.basic.Generic.define("chess.RookBlack",{size:{width:32,height:34}},{markup:'<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:#000000; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path      d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "      style="stroke-linecap:butt;" />    <path      d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z "      style="stroke-linecap:butt;" />    <path      d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "      style="stroke-linecap:butt;" />    <path      d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z "      style="stroke-linecap:butt;stroke-linejoin:miter;" />    <path      d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z "      style="stroke-linecap:butt;" />    <path      d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z "      style="stroke-linecap:butt;" />    <path      d="M 12,35.5 L 33,35.5 L 33,35.5"      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />    <path      d="M 13,31.5 L 32,31.5"      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />    <path      d="M 14,29.5 L 31,29.5"      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />    <path      d="M 14,16.5 L 31,16.5"      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />    <path      d="M 11,14 L 34,14"      style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />  </g></g></g>'}),joint.shapes.basic.Generic.define("chess.BishopWhite",{size:{width:38,height:38}},{markup:'<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:none; fill-rule:evenodd; fill-opacity:1; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <g style="fill:#ffffff; stroke:#000000; stroke-linecap:butt;">       <path        d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />      <path        d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />      <path        d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />    </g>    <path      d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"      style="fill:none; stroke:#000000; stroke-linejoin:miter;" />  </g></g></g>'}),joint.shapes.basic.Generic.define("chess.BishopBlack",{size:{width:38,height:38}},{markup:'<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:none; fill-rule:evenodd; fill-opacity:1; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <g style="fill:#000000; stroke:#000000; stroke-linecap:butt;">       <path        d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />      <path        d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />      <path        d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />    </g>    <path       d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"       style="fill:none; stroke:#ffffff; stroke-linejoin:miter;" />  </g></g></g>'}),joint.shapes.basic.Generic.define("chess.KnightWhite",{size:{width:38,height:37}},{markup:'<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path      d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"      style="fill:#ffffff; stroke:#000000;" />    <path      d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"      style="fill:#ffffff; stroke:#000000;" />    <path      d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"      style="fill:#000000; stroke:#000000;" />    <path      d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"      transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"      style="fill:#000000; stroke:#000000;" />  </g></g></g>'}),joint.shapes.basic.Generic.define("chess.KnightBlack",{size:{width:38,height:37}},{markup:'<g class="rotatable"><g class="scalable"><g style="opacity:1; fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">    <path      d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"      style="fill:#000000; stroke:#000000;" />    <path      d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"      style="fill:#000000; stroke:#000000;" />    <path      d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"      style="fill:#ffffff; stroke:#ffffff;" />    <path      d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"      transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"      style="fill:#ffffff; stroke:#ffffff;" />    <path      d="M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z "      style="fill:#ffffff; stroke:none;" />  </g></g></g>'}),joint.shapes.basic.Generic.define("chess.PawnWhite",{size:{width:28,height:33}},{markup:'<g class="rotatable"><g class="scalable"><path d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "  style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:nonzero; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;" /></g></g>'}),joint.shapes.basic.Generic.define("chess.PawnBlack",{size:{width:28,height:33}},{markup:'<g class="rotatable"><g class="scalable"><path d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "  style="opacity:1; fill:#000000; fill-opacity:1; fill-rule:nonzero; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;" /></g></g>'});
joint.shapes.basic.Generic.define("pn.Place",{size:{width:50,height:50},attrs:{".root":{r:25,fill:"#ffffff",stroke:"#000000",transform:"translate(25, 25)"},".label":{"text-anchor":"middle","ref-x":.5,"ref-y":-20,ref:".root",fill:"#000000","font-size":12},".tokens > circle":{fill:"#000000",r:5},".tokens.one > circle":{transform:"translate(25, 25)"},".tokens.two > circle:nth-child(1)":{transform:"translate(19, 25)"},".tokens.two > circle:nth-child(2)":{transform:"translate(31, 25)"},".tokens.three > circle:nth-child(1)":{transform:"translate(18, 29)"},".tokens.three > circle:nth-child(2)":{transform:"translate(25, 19)"},".tokens.three > circle:nth-child(3)":{transform:"translate(32, 29)"},".tokens.alot > text":{transform:"translate(25, 18)","text-anchor":"middle",fill:"#000000"}}},{markup:'<g class="rotatable"><g class="scalable"><circle class="root"/><g class="tokens" /></g><text class="label"/></g>'}),joint.shapes.pn.PlaceView=joint.dia.ElementView.extend({},{initialize:function(){joint.dia.ElementView.prototype.initialize.apply(this,arguments),this.model.on("change:tokens",function(){this.renderTokens(),this.update()},this)},render:function(){joint.dia.ElementView.prototype.render.apply(this,arguments),this.renderTokens(),this.update()},renderTokens:function(){var a=this.$(".tokens").empty();a[0].className.baseVal="tokens";var b=this.model.get("tokens");if(b)switch(b){case 1:a[0].className.baseVal+=" one",a.append(V("<circle/>").node);break;case 2:a[0].className.baseVal+=" two",a.append(V("<circle/>").node,V("<circle/>").node);break;case 3:a[0].className.baseVal+=" three",a.append(V("<circle/>").node,V("<circle/>").node,V("<circle/>").node);break;default:a[0].className.baseVal+=" alot",a.append(V("<text/>").text(b+"").node)}}}),joint.shapes.basic.Generic.define("pn.Transition",{size:{width:12,height:50},attrs:{rect:{width:12,height:50,fill:"#000000",stroke:"#000000"},".label":{"text-anchor":"middle","ref-x":.5,"ref-y":-20,ref:"rect",fill:"#000000","font-size":12}}},{markup:'<g class="rotatable"><g class="scalable"><rect class="root"/></g></g><text class="label"/>'}),joint.dia.Link.define("pn.Link",{attrs:{".marker-target":{d:"M 10 0 L 0 5 L 10 10 z"}}});
joint.shapes.basic.Generic.define("devs.Model",{inPorts:[],outPorts:[],size:{width:80,height:80},attrs:{".":{magnet:!1},".label":{text:"Model","ref-x":.5,"ref-y":10,"font-size":18,"text-anchor":"middle",fill:"#000"},".body":{"ref-width":"100%","ref-height":"100%",stroke:"#000"}},ports:{groups:{in:{position:{name:"left"},attrs:{".port-label":{fill:"#000"},".port-body":{fill:"#fff",stroke:"#000",r:10,magnet:!0}},label:{position:{name:"left",args:{y:10}}}},out:{position:{name:"right"},attrs:{".port-label":{fill:"#000"},".port-body":{fill:"#fff",stroke:"#000",r:10,magnet:!0}},label:{position:{name:"right",args:{y:10}}}}}}},{markup:'<g class="rotatable"><rect class="body"/><text class="label"/></g>',portMarkup:'<circle class="port-body"/>',portLabelMarkup:'<text class="port-label"/>',initialize:function(){joint.shapes.basic.Generic.prototype.initialize.apply(this,arguments),this.on("change:inPorts change:outPorts",this.updatePortItems,this),this.updatePortItems()},updatePortItems:function(a,b,c){var d=joint.util.uniq(this.get("inPorts")),e=joint.util.difference(joint.util.uniq(this.get("outPorts")),d),f=this.createPortItems("in",d),g=this.createPortItems("out",e);this.prop("ports/items",f.concat(g),joint.util.assign({rewrite:!0},c))},createPortItem:function(a,b){return{id:b,group:a,attrs:{".port-label":{text:b}}}},createPortItems:function(a,b){return joint.util.toArray(b).map(this.createPortItem.bind(this,a))},_addGroupPort:function(a,b,c){var d=this.get(b);return this.set(b,Array.isArray(d)?d.concat(a):[a],c)},addOutPort:function(a,b){return this._addGroupPort(a,"outPorts",b)},addInPort:function(a,b){return this._addGroupPort(a,"inPorts",b)},_removeGroupPort:function(a,b,c){return this.set(b,joint.util.without(this.get(b),a),c)},removeOutPort:function(a,b){return this._removeGroupPort(a,"outPorts",b)},removeInPort:function(a,b){return this._removeGroupPort(a,"inPorts",b)},_changeGroup:function(a,b,c){return this.prop("ports/groups/"+a,joint.util.isObject(b)?b:{},c)},changeInGroup:function(a,b){return this._changeGroup("in",a,b)},changeOutGroup:function(a,b){return this._changeGroup("out",a,b)}}),joint.shapes.devs.Model.define("devs.Atomic",{size:{width:80,height:80},attrs:{".label":{text:"Atomic"}}}),joint.shapes.devs.Model.define("devs.Coupled",{size:{width:200,height:300},attrs:{".label":{text:"Coupled"}}}),joint.dia.Link.define("devs.Link",{attrs:{".connection":{"stroke-width":2}}});
joint.shapes.basic.Generic.define("uml.Class",{attrs:{rect:{width:200},".uml-class-name-rect":{stroke:"black","stroke-width":2,fill:"#3498db"},".uml-class-attrs-rect":{stroke:"black","stroke-width":2,fill:"#2980b9"},".uml-class-methods-rect":{stroke:"black","stroke-width":2,fill:"#2980b9"},".uml-class-name-text":{ref:".uml-class-name-rect","ref-y":.5,"ref-x":.5,"text-anchor":"middle","y-alignment":"middle","font-weight":"bold",fill:"black","font-size":12,"font-family":"Times New Roman"},".uml-class-attrs-text":{ref:".uml-class-attrs-rect","ref-y":5,"ref-x":5,fill:"black","font-size":12,"font-family":"Times New Roman"},".uml-class-methods-text":{ref:".uml-class-methods-rect","ref-y":5,"ref-x":5,fill:"black","font-size":12,"font-family":"Times New Roman"}},name:[],attributes:[],methods:[]},{markup:['<g class="rotatable">','<g class="scalable">','<rect class="uml-class-name-rect"/><rect class="uml-class-attrs-rect"/><rect class="uml-class-methods-rect"/>',"</g>",'<text class="uml-class-name-text"/><text class="uml-class-attrs-text"/><text class="uml-class-methods-text"/>',"</g>"].join(""),initialize:function(){this.on("change:name change:attributes change:methods",function(){this.updateRectangles(),this.trigger("uml-update")},this),this.updateRectangles(),joint.shapes.basic.Generic.prototype.initialize.apply(this,arguments)},getClassName:function(){return this.get("name")},updateRectangles:function(){var a=this.get("attrs"),b=[{type:"name",text:this.getClassName()},{type:"attrs",text:this.get("attributes")},{type:"methods",text:this.get("methods")}],c=0;b.forEach(function(b){var d=Array.isArray(b.text)?b.text:[b.text],e=20*d.length+20;a[".uml-class-"+b.type+"-text"].text=d.join("\n"),a[".uml-class-"+b.type+"-rect"].height=e,a[".uml-class-"+b.type+"-rect"].transform="translate(0,"+c+")",c+=e})}}),joint.shapes.uml.ClassView=joint.dia.ElementView.extend({initialize:function(){joint.dia.ElementView.prototype.initialize.apply(this,arguments),this.listenTo(this.model,"uml-update",function(){this.update(),this.resize()})}}),joint.shapes.uml.Class.define("uml.Abstract",{attrs:{".uml-class-name-rect":{fill:"#e74c3c"},".uml-class-attrs-rect":{fill:"#c0392b"},".uml-class-methods-rect":{fill:"#c0392b"}}},{getClassName:function(){return["<<Abstract>>",this.get("name")]}}),joint.shapes.uml.AbstractView=joint.shapes.uml.ClassView,joint.shapes.uml.Class.define("uml.Interface",{attrs:{".uml-class-name-rect":{fill:"#f1c40f"},".uml-class-attrs-rect":{fill:"#f39c12"},".uml-class-methods-rect":{fill:"#f39c12"}}},{getClassName:function(){return["<<Interface>>",this.get("name")]}}),joint.shapes.uml.InterfaceView=joint.shapes.uml.ClassView,joint.dia.Link.define("uml.Generalization",{attrs:{".marker-target":{d:"M 20 0 L 0 10 L 20 20 z",fill:"white"}}}),joint.dia.Link.define("uml.Implementation",{attrs:{".marker-target":{d:"M 20 0 L 0 10 L 20 20 z",fill:"white"},".connection":{"stroke-dasharray":"3,3"}}}),joint.dia.Link.define("uml.Aggregation",{attrs:{".marker-target":{d:"M 40 10 L 20 20 L 0 10 L 20 0 z",fill:"white"}}}),joint.dia.Link.define("uml.Composition",{attrs:{".marker-target":{d:"M 40 10 L 20 20 L 0 10 L 20 0 z",fill:"black"}}}),joint.dia.Link.define("uml.Association"),joint.shapes.basic.Generic.define("uml.State",{attrs:{".uml-state-body":{width:200,height:200,rx:10,ry:10,fill:"#ecf0f1",stroke:"#bdc3c7","stroke-width":3},".uml-state-separator":{stroke:"#bdc3c7","stroke-width":2},".uml-state-name":{ref:".uml-state-body","ref-x":.5,"ref-y":5,"text-anchor":"middle",fill:"#000000","font-family":"Courier New","font-size":14},".uml-state-events":{ref:".uml-state-separator","ref-x":5,"ref-y":5,fill:"#000000","font-family":"Courier New","font-size":14}},name:"State",events:[]},{markup:['<g class="rotatable">','<g class="scalable">','<rect class="uml-state-body"/>',"</g>",'<path class="uml-state-separator"/>','<text class="uml-state-name"/>','<text class="uml-state-events"/>',"</g>"].join(""),initialize:function(){this.on({"change:name":this.updateName,"change:events":this.updateEvents,"change:size":this.updatePath},this),this.updateName(),this.updateEvents(),this.updatePath(),joint.shapes.basic.Generic.prototype.initialize.apply(this,arguments)},updateName:function(){this.attr(".uml-state-name/text",this.get("name"))},updateEvents:function(){this.attr(".uml-state-events/text",this.get("events").join("\n"))},updatePath:function(){var a="M 0 20 L "+this.get("size").width+" 20";this.attr(".uml-state-separator/d",a,{silent:!0})}}),joint.shapes.basic.Circle.define("uml.StartState",{type:"uml.StartState",attrs:{circle:{fill:"#34495e",stroke:"#2c3e50","stroke-width":2,rx:1}}}),joint.shapes.basic.Generic.define("uml.EndState",{size:{width:20,height:20},attrs:{"circle.outer":{transform:"translate(10, 10)",r:10,fill:"#ffffff",stroke:"#2c3e50"},"circle.inner":{transform:"translate(10, 10)",r:6,fill:"#34495e"}}},{markup:'<g class="rotatable"><g class="scalable"><circle class="outer"/><circle class="inner"/></g></g>'}),joint.dia.Link.define("uml.Transition",{attrs:{".marker-target":{d:"M 10 0 L 0 5 L 10 10 z",fill:"#34495e",stroke:"#2c3e50"},".connection":{stroke:"#2c3e50"}}});
joint.shapes.basic.Generic.define("logic.Gate",{size:{width:80,height:40},attrs:{".":{magnet:!1},".body":{width:100,height:50},circle:{r:7,stroke:"black",fill:"transparent","stroke-width":2}}},{operation:function(){return!0}}),joint.shapes.logic.Gate.define("logic.IO",{size:{width:60,height:30},attrs:{".body":{fill:"white",stroke:"black","stroke-width":2},".wire":{ref:".body","ref-y":.5,stroke:"black"},text:{fill:"black",ref:".body","ref-x":.5,"ref-y":.5,"y-alignment":"middle","text-anchor":"middle","font-weight":"bold","font-variant":"small-caps","text-transform":"capitalize","font-size":"14px"}}},{markup:'<g class="rotatable"><g class="scalable"><rect class="body"/></g><path class="wire"/><circle/><text/></g>'}),joint.shapes.logic.IO.define("logic.Input",{attrs:{".wire":{"ref-dx":0,d:"M 0 0 L 23 0"},circle:{ref:".body","ref-dx":30,"ref-y":.5,magnet:!0,class:"output",port:"out"},text:{text:"input"}}}),joint.shapes.logic.IO.define("logic.Output",{attrs:{".wire":{"ref-x":0,d:"M 0 0 L -23 0"},circle:{ref:".body","ref-x":-30,"ref-y":.5,magnet:"passive",class:"input",port:"in"},text:{text:"output"}}}),joint.shapes.logic.Gate.define("logic.Gate11",{attrs:{".input":{ref:".body","ref-x":-2,"ref-y":.5,magnet:"passive",port:"in"},".output":{ref:".body","ref-dx":2,"ref-y":.5,magnet:!0,port:"out"}}},{markup:'<g class="rotatable"><g class="scalable"><image class="body"/></g><circle class="input"/><circle class="output"/></g>'}),joint.shapes.logic.Gate.define("logic.Gate21",{attrs:{".input1":{ref:".body","ref-x":-2,"ref-y":.3,magnet:"passive",port:"in1"},".input2":{ref:".body","ref-x":-2,"ref-y":.7,magnet:"passive",port:"in2"},".output":{ref:".body","ref-dx":2,"ref-y":.5,magnet:!0,port:"out"}}},{markup:'<g class="rotatable"><g class="scalable"><image class="body"/></g><circle class="input input1"/><circle  class="input input2"/><circle class="output"/></g>'}),joint.shapes.logic.Gate11.define("logic.Repeater",{attrs:{image:{"xlink:href":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSIxMDAiCiAgIGhlaWdodD0iNTAiCiAgIGlkPSJzdmcyIgogICBzb2RpcG9kaTp2ZXJzaW9uPSIwLjMyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ2IgogICB2ZXJzaW9uPSIxLjAiCiAgIHNvZGlwb2RpOmRvY25hbWU9Ik5PVCBBTlNJLnN2ZyIKICAgaW5rc2NhcGU6b3V0cHV0X2V4dGVuc2lvbj0ib3JnLmlua3NjYXBlLm91dHB1dC5zdmcuaW5rc2NhcGUiPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM0Ij4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAxNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF96PSI1MCA6IDE1IDogMSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIyNSA6IDEwIDogMSIKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI3MTQiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMC41IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEgOiAwLjUgOiAxIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjAuNSA6IDAuMzMzMzMzMzMgOiAxIgogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgwNiIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgxOSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIzNzIuMDQ3MjQgOiAzNTAuNzg3MzkgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNzQ0LjA5NDQ4IDogNTI2LjE4MTA5IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MjYuMTgxMDkgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjc3NyIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSI3NSA6IDQwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjE1MCA6IDYwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA2MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmUzMjc1IgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjUwIDogMzMuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEwMCA6IDUwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmU1NTMzIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjMyIDogMjEuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjY0IDogMzIgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDMyIDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI1NTciCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMjUgOiAxNi42NjY2NjcgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNTAgOiAyNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMjUgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICA8L2RlZnM+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJiYXNlIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnpvb209IjgiCiAgICAgaW5rc2NhcGU6Y3g9Ijg0LjY4NTM1MiIKICAgICBpbmtzY2FwZTpjeT0iMTUuMjg4NjI4IgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiCiAgICAgc2hvd2dyaWQ9InRydWUiCiAgICAgaW5rc2NhcGU6Z3JpZC1iYm94PSJ0cnVlIgogICAgIGlua3NjYXBlOmdyaWQtcG9pbnRzPSJ0cnVlIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwMDAwIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTM5OSIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI4NzQiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjMzIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIwIgogICAgIGlua3NjYXBlOnNuYXAtYmJveD0idHJ1ZSI+CiAgICA8aW5rc2NhcGU6Z3JpZAogICAgICAgaWQ9IkdyaWRGcm9tUHJlMDQ2U2V0dGluZ3MiCiAgICAgICB0eXBlPSJ4eWdyaWQiCiAgICAgICBvcmlnaW54PSIwcHgiCiAgICAgICBvcmlnaW55PSIwcHgiCiAgICAgICBzcGFjaW5neD0iMXB4IgogICAgICAgc3BhY2luZ3k9IjFweCIKICAgICAgIGNvbG9yPSIjMDAwMGZmIgogICAgICAgZW1wY29sb3I9IiMwMDAwZmYiCiAgICAgICBvcGFjaXR5PSIwLjIiCiAgICAgICBlbXBvcGFjaXR5PSIwLjQiCiAgICAgICBlbXBzcGFjaW5nPSI1IgogICAgICAgdmlzaWJsZT0idHJ1ZSIKICAgICAgIGVuYWJsZWQ9InRydWUiIC8+CiAgPC9zb2RpcG9kaTpuYW1lZHZpZXc+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNyI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuOTk5OTk5ODg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Ik0gNzIuMTU2OTEsMjUgTCA5NSwyNSIKICAgICAgIGlkPSJwYXRoMzA1OSIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2MiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0iTSAyOS4wNDM0NzgsMjUgTCA1LjA0MzQ3ODEsMjUiCiAgICAgICBpZD0icGF0aDMwNjEiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MztzdHJva2UtbGluZWpvaW46bWl0ZXI7bWFya2VyOm5vbmU7c3Ryb2tlLW9wYWNpdHk6MTt2aXNpYmlsaXR5OnZpc2libGU7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIgogICAgICAgZD0iTSAyOC45Njg3NSwyLjU5Mzc1IEwgMjguOTY4NzUsNSBMIDI4Ljk2ODc1LDQ1IEwgMjguOTY4NzUsNDcuNDA2MjUgTCAzMS4xMjUsNDYuMzQzNzUgTCA3Mi4xNTYyNSwyNi4zNDM3NSBMIDcyLjE1NjI1LDIzLjY1NjI1IEwgMzEuMTI1LDMuNjU2MjUgTCAyOC45Njg3NSwyLjU5Mzc1IHogTSAzMS45Njg3NSw3LjQwNjI1IEwgNjguMDkzNzUsMjUgTCAzMS45Njg3NSw0Mi41OTM3NSBMIDMxLjk2ODc1LDcuNDA2MjUgeiIKICAgICAgIGlkPSJwYXRoMjYzOCIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjY2NjY2NjYyIgLz4KICA8L2c+Cjwvc3ZnPgo="}}},{operation:function(a){return a}}),joint.shapes.logic.Gate11.define("logic.Not",{attrs:{image:{"xlink:href":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSIxMDAiCiAgIGhlaWdodD0iNTAiCiAgIGlkPSJzdmcyIgogICBzb2RpcG9kaTp2ZXJzaW9uPSIwLjMyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ2IgogICB2ZXJzaW9uPSIxLjAiCiAgIHNvZGlwb2RpOmRvY25hbWU9Ik5PVCBBTlNJLnN2ZyIKICAgaW5rc2NhcGU6b3V0cHV0X2V4dGVuc2lvbj0ib3JnLmlua3NjYXBlLm91dHB1dC5zdmcuaW5rc2NhcGUiPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM0Ij4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAxNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF96PSI1MCA6IDE1IDogMSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIyNSA6IDEwIDogMSIKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI3MTQiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMC41IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEgOiAwLjUgOiAxIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjAuNSA6IDAuMzMzMzMzMzMgOiAxIgogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgwNiIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgxOSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIzNzIuMDQ3MjQgOiAzNTAuNzg3MzkgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNzQ0LjA5NDQ4IDogNTI2LjE4MTA5IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MjYuMTgxMDkgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjc3NyIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSI3NSA6IDQwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjE1MCA6IDYwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA2MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmUzMjc1IgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjUwIDogMzMuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEwMCA6IDUwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmU1NTMzIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjMyIDogMjEuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjY0IDogMzIgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDMyIDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI1NTciCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMjUgOiAxNi42NjY2NjcgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNTAgOiAyNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMjUgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICA8L2RlZnM+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJiYXNlIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnpvb209IjgiCiAgICAgaW5rc2NhcGU6Y3g9Ijg0LjY4NTM1MiIKICAgICBpbmtzY2FwZTpjeT0iMTUuMjg4NjI4IgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiCiAgICAgc2hvd2dyaWQ9InRydWUiCiAgICAgaW5rc2NhcGU6Z3JpZC1iYm94PSJ0cnVlIgogICAgIGlua3NjYXBlOmdyaWQtcG9pbnRzPSJ0cnVlIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwMDAwIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTM5OSIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI4NzQiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjMzIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIwIgogICAgIGlua3NjYXBlOnNuYXAtYmJveD0idHJ1ZSI+CiAgICA8aW5rc2NhcGU6Z3JpZAogICAgICAgaWQ9IkdyaWRGcm9tUHJlMDQ2U2V0dGluZ3MiCiAgICAgICB0eXBlPSJ4eWdyaWQiCiAgICAgICBvcmlnaW54PSIwcHgiCiAgICAgICBvcmlnaW55PSIwcHgiCiAgICAgICBzcGFjaW5neD0iMXB4IgogICAgICAgc3BhY2luZ3k9IjFweCIKICAgICAgIGNvbG9yPSIjMDAwMGZmIgogICAgICAgZW1wY29sb3I9IiMwMDAwZmYiCiAgICAgICBvcGFjaXR5PSIwLjIiCiAgICAgICBlbXBvcGFjaXR5PSIwLjQiCiAgICAgICBlbXBzcGFjaW5nPSI1IgogICAgICAgdmlzaWJsZT0idHJ1ZSIKICAgICAgIGVuYWJsZWQ9InRydWUiIC8+CiAgPC9zb2RpcG9kaTpuYW1lZHZpZXc+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNyI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuOTk5OTk5ODg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Ik0gNzkuMTU2OTEsMjUgTCA5NSwyNSIKICAgICAgIGlkPSJwYXRoMzA1OSIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2MiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0iTSAyOS4wNDM0NzgsMjUgTCA1LjA0MzQ3ODEsMjUiCiAgICAgICBpZD0icGF0aDMwNjEiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MztzdHJva2UtbGluZWpvaW46bWl0ZXI7bWFya2VyOm5vbmU7c3Ryb2tlLW9wYWNpdHk6MTt2aXNpYmlsaXR5OnZpc2libGU7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIgogICAgICAgZD0iTSAyOC45Njg3NSwyLjU5Mzc1IEwgMjguOTY4NzUsNSBMIDI4Ljk2ODc1LDQ1IEwgMjguOTY4NzUsNDcuNDA2MjUgTCAzMS4xMjUsNDYuMzQzNzUgTCA3Mi4xNTYyNSwyNi4zNDM3NSBMIDcyLjE1NjI1LDIzLjY1NjI1IEwgMzEuMTI1LDMuNjU2MjUgTCAyOC45Njg3NSwyLjU5Mzc1IHogTSAzMS45Njg3NSw3LjQwNjI1IEwgNjguMDkzNzUsMjUgTCAzMS45Njg3NSw0Mi41OTM3NSBMIDMxLjk2ODc1LDcuNDA2MjUgeiIKICAgICAgIGlkPSJwYXRoMjYzOCIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjY2NjY2NjYyIgLz4KICAgIDxwYXRoCiAgICAgICBzb2RpcG9kaTp0eXBlPSJhcmMiCiAgICAgICBzdHlsZT0iZmlsbDpub25lO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDozO3N0cm9rZS1saW5lam9pbjptaXRlcjttYXJrZXI6bm9uZTtzdHJva2Utb3BhY2l0eToxO3Zpc2liaWxpdHk6dmlzaWJsZTtkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiCiAgICAgICBpZD0icGF0aDI2NzEiCiAgICAgICBzb2RpcG9kaTpjeD0iNzYiCiAgICAgICBzb2RpcG9kaTpjeT0iMjUiCiAgICAgICBzb2RpcG9kaTpyeD0iNCIKICAgICAgIHNvZGlwb2RpOnJ5PSI0IgogICAgICAgZD0iTSA4MCwyNSBBIDQsNCAwIDEgMSA3MiwyNSBBIDQsNCAwIDEgMSA4MCwyNSB6IgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEsMCkiIC8+CiAgPC9nPgo8L3N2Zz4K"}}},{operation:function(a){return!a}}),joint.shapes.logic.Gate21.define("logic.Or",{attrs:{image:{"xlink:href":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSIxMDAiCiAgIGhlaWdodD0iNTAiCiAgIGlkPSJzdmcyIgogICBzb2RpcG9kaTp2ZXJzaW9uPSIwLjMyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ2IgogICB2ZXJzaW9uPSIxLjAiCiAgIHNvZGlwb2RpOmRvY25hbWU9Ik9SIEFOU0kuc3ZnIgogICBpbmtzY2FwZTpvdXRwdXRfZXh0ZW5zaW9uPSJvcmcuaW5rc2NhcGUub3V0cHV0LnN2Zy5pbmtzY2FwZSI+CiAgPGRlZnMKICAgICBpZD0iZGVmczQiPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDE1IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3o9IjUwIDogMTUgOiAxIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjI1IDogMTAgOiAxIgogICAgICAgaWQ9InBlcnNwZWN0aXZlMjcxNCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAwLjUgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfej0iMSA6IDAuNSA6IDEiCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMC41IDogMC4zMzMzMzMzMyA6IDEiCiAgICAgICBpZD0icGVyc3BlY3RpdmUyODA2IiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmUyODE5IgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjM3Mi4wNDcyNCA6IDM1MC43ODczOSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF96PSI3NDQuMDk0NDggOiA1MjYuMTgxMDkgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDUyNi4xODEwOSA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmUyNzc3IgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49Ijc1IDogNDAgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iMTUwIDogNjAgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDYwIDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTMyNzUiCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iNTAgOiAzMy4zMzMzMzMgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iMTAwIDogNTAgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDUwIDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTU1MzMiCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMzIgOiAyMS4zMzMzMzMgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNjQgOiAzMiA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMzIgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjU1NyIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIyNSA6IDE2LjY2NjY2NyA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF96PSI1MCA6IDI1IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAyNSA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogIDwvZGVmcz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iNCIKICAgICBpbmtzY2FwZTpjeD0iMTEzLjAwMDM5IgogICAgIGlua3NjYXBlOmN5PSIxMi44OTM3MzEiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB4IgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImcyNTYwIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTpncmlkLWJib3g9InRydWUiCiAgICAgaW5rc2NhcGU6Z3JpZC1wb2ludHM9InRydWUiCiAgICAgZ3JpZHRvbGVyYW5jZT0iMTAwMDAiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxMzk5IgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijg3NCIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMzciCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii00IgogICAgIGlua3NjYXBlOnNuYXAtYmJveD0idHJ1ZSI+CiAgICA8aW5rc2NhcGU6Z3JpZAogICAgICAgaWQ9IkdyaWRGcm9tUHJlMDQ2U2V0dGluZ3MiCiAgICAgICB0eXBlPSJ4eWdyaWQiCiAgICAgICBvcmlnaW54PSIwcHgiCiAgICAgICBvcmlnaW55PSIwcHgiCiAgICAgICBzcGFjaW5neD0iMXB4IgogICAgICAgc3BhY2luZ3k9IjFweCIKICAgICAgIGNvbG9yPSIjMDAwMGZmIgogICAgICAgZW1wY29sb3I9IiMwMDAwZmYiCiAgICAgICBvcGFjaXR5PSIwLjIiCiAgICAgICBlbXBvcGFjaXR5PSIwLjQiCiAgICAgICBlbXBzcGFjaW5nPSI1IgogICAgICAgdmlzaWJsZT0idHJ1ZSIKICAgICAgIGVuYWJsZWQ9InRydWUiIC8+CiAgPC9zb2RpcG9kaTpuYW1lZHZpZXc+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNyI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Im0gNzAsMjUgYyAyMCwwIDI1LDAgMjUsMCIKICAgICAgIGlkPSJwYXRoMzA1OSIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2MiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0iTSAzMSwxNSA1LDE1IgogICAgICAgaWQ9InBhdGgzMDYxIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuOTk5OTk5ODg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Ik0gMzIsMzUgNSwzNSIKICAgICAgIGlkPSJwYXRoMzk0NCIgLz4KICAgIDxnCiAgICAgICBpZD0iZzI1NjAiCiAgICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI2LjUsLTM5LjUpIj4KICAgICAgPHBhdGgKICAgICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MztzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICBkPSJNIC0yLjQwNjI1LDQ0LjUgTCAtMC40MDYyNSw0Ni45Mzc1IEMgLTAuNDA2MjUsNDYuOTM3NSA1LjI1LDUzLjkzNzU0OSA1LjI1LDY0LjUgQyA1LjI1LDc1LjA2MjQ1MSAtMC40MDYyNSw4Mi4wNjI1IC0wLjQwNjI1LDgyLjA2MjUgTCAtMi40MDYyNSw4NC41IEwgMC43NSw4NC41IEwgMTQuNzUsODQuNSBDIDE3LjE1ODA3Niw4NC41MDAwMDEgMjIuNDM5Njk5LDg0LjUyNDUxNCAyOC4zNzUsODIuMDkzNzUgQyAzNC4zMTAzMDEsNzkuNjYyOTg2IDQwLjkxMTUzNiw3NC43NTA0ODQgNDYuMDYyNSw2NS4yMTg3NSBMIDQ0Ljc1LDY0LjUgTCA0Ni4wNjI1LDYzLjc4MTI1IEMgMzUuNzU5Mzg3LDQ0LjcxNTU5IDE5LjUwNjU3NCw0NC41IDE0Ljc1LDQ0LjUgTCAwLjc1LDQ0LjUgTCAtMi40MDYyNSw0NC41IHogTSAzLjQ2ODc1LDQ3LjUgTCAxNC43NSw0Ny41IEMgMTkuNDM0MTczLDQ3LjUgMzMuMDM2ODUsNDcuMzY5NzkzIDQyLjcxODc1LDY0LjUgQyAzNy45NTE5NjQsNzIuOTI5MDc1IDMyLjE5NzQ2OSw3Ny4xODM5MSAyNyw3OS4zMTI1IEMgMjEuNjM5MzM5LDgxLjUwNzkyNCAxNy4xNTgwNzUsODEuNTAwMDAxIDE0Ljc1LDgxLjUgTCAzLjUsODEuNSBDIDUuMzczNTg4NCw3OC4zOTE1NjYgOC4yNSw3Mi40NTA2NSA4LjI1LDY0LjUgQyA4LjI1LDU2LjUyNjY0NiA1LjM0MTQ2ODYsNTAuNTk5ODE1IDMuNDY4NzUsNDcuNSB6IgogICAgICAgICBpZD0icGF0aDQ5NzMiCiAgICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NzY2NjY3NjY2NjY2NjY2NzY2NzYyIgLz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo="}}},{operation:function(a,b){return a||b}}),joint.shapes.logic.Gate21.define("logic.And",{attrs:{image:{"xlink:href":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSIxMDAiCiAgIGhlaWdodD0iNTAiCiAgIGlkPSJzdmcyIgogICBzb2RpcG9kaTp2ZXJzaW9uPSIwLjMyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ2IgogICB2ZXJzaW9uPSIxLjAiCiAgIHNvZGlwb2RpOmRvY25hbWU9IkFORCBBTlNJLnN2ZyIKICAgaW5rc2NhcGU6b3V0cHV0X2V4dGVuc2lvbj0ib3JnLmlua3NjYXBlLm91dHB1dC5zdmcuaW5rc2NhcGUiPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM0Ij4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAxNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF96PSI1MCA6IDE1IDogMSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIyNSA6IDEwIDogMSIKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI3MTQiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMC41IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEgOiAwLjUgOiAxIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjAuNSA6IDAuMzMzMzMzMzMgOiAxIgogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgwNiIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgxOSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIzNzIuMDQ3MjQgOiAzNTAuNzg3MzkgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNzQ0LjA5NDQ4IDogNTI2LjE4MTA5IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MjYuMTgxMDkgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjc3NyIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSI3NSA6IDQwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjE1MCA6IDYwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA2MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmUzMjc1IgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjUwIDogMzMuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEwMCA6IDUwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmU1NTMzIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjMyIDogMjEuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjY0IDogMzIgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDMyIDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgPC9kZWZzPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0iYmFzZSIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMS4wIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp6b29tPSI4IgogICAgIGlua3NjYXBlOmN4PSI1Ni42OTgzNDgiCiAgICAgaW5rc2NhcGU6Y3k9IjI1LjMyNjg5OSIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJ0cnVlIgogICAgIGlua3NjYXBlOmdyaWQtYmJveD0idHJ1ZSIKICAgICBpbmtzY2FwZTpncmlkLXBvaW50cz0idHJ1ZSIKICAgICBncmlkdG9sZXJhbmNlPSIxMDAwMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEzOTkiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iODc0IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIzMyIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMCIKICAgICBpbmtzY2FwZTpzbmFwLWJib3g9InRydWUiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIGlkPSJHcmlkRnJvbVByZTA0NlNldHRpbmdzIgogICAgICAgdHlwZT0ieHlncmlkIgogICAgICAgb3JpZ2lueD0iMHB4IgogICAgICAgb3JpZ2lueT0iMHB4IgogICAgICAgc3BhY2luZ3g9IjFweCIKICAgICAgIHNwYWNpbmd5PSIxcHgiCiAgICAgICBjb2xvcj0iIzAwMDBmZiIKICAgICAgIGVtcGNvbG9yPSIjMDAwMGZmIgogICAgICAgb3BhY2l0eT0iMC4yIgogICAgICAgZW1wb3BhY2l0eT0iMC40IgogICAgICAgZW1wc3BhY2luZz0iNSIKICAgICAgIHZpc2libGU9InRydWUiCiAgICAgICBlbmFibGVkPSJ0cnVlIiAvPgogIDwvc29kaXBvZGk6bmFtZWR2aWV3PgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTciPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIj4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJtIDcwLDI1IGMgMjAsMCAyNSwwIDI1LDAiCiAgICAgICBpZD0icGF0aDMwNTkiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Ik0gMzEsMTUgNSwxNSIKICAgICAgIGlkPSJwYXRoMzA2MSIgLz4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjk5OTk5OTg4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJNIDMyLDM1IDUsMzUiCiAgICAgICBpZD0icGF0aDM5NDQiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZvbnQtc2l6ZTptZWRpdW07Zm9udC1zdHlsZTpub3JtYWw7Zm9udC12YXJpYW50Om5vcm1hbDtmb250LXdlaWdodDpub3JtYWw7Zm9udC1zdHJldGNoOm5vcm1hbDt0ZXh0LWluZGVudDowO3RleHQtYWxpZ246c3RhcnQ7dGV4dC1kZWNvcmF0aW9uOm5vbmU7bGluZS1oZWlnaHQ6bm9ybWFsO2xldHRlci1zcGFjaW5nOm5vcm1hbDt3b3JkLXNwYWNpbmc6bm9ybWFsO3RleHQtdHJhbnNmb3JtOm5vbmU7ZGlyZWN0aW9uOmx0cjtibG9jay1wcm9ncmVzc2lvbjp0Yjt3cml0aW5nLW1vZGU6bHItdGI7dGV4dC1hbmNob3I6c3RhcnQ7ZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDozO21hcmtlcjpub25lO3Zpc2liaWxpdHk6dmlzaWJsZTtkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGU7Zm9udC1mYW1pbHk6Qml0c3RyZWFtIFZlcmEgU2FuczstaW5rc2NhcGUtZm9udC1zcGVjaWZpY2F0aW9uOkJpdHN0cmVhbSBWZXJhIFNhbnMiCiAgICAgICBkPSJNIDMwLDUgTCAzMCw2LjQyODU3MTQgTCAzMCw0My41NzE0MjkgTCAzMCw0NSBMIDMxLjQyODU3MSw0NSBMIDUwLjQ3NjE5LDQ1IEMgNjEuNzQ0MDk4LDQ1IDcwLjQ3NjE5LDM1Ljk5OTk1NSA3MC40NzYxOSwyNSBDIDcwLjQ3NjE5LDE0LjAwMDA0NSA2MS43NDQwOTksNS4wMDAwMDAyIDUwLjQ3NjE5LDUgQyA1MC40NzYxOSw1IDUwLjQ3NjE5LDUgMzEuNDI4NTcxLDUgTCAzMCw1IHogTSAzMi44NTcxNDMsNy44NTcxNDI5IEMgNDAuODM0MjY0LDcuODU3MTQyOSA0NS45MTgzNjgsNy44NTcxNDI5IDQ4LjA5NTIzOCw3Ljg1NzE0MjkgQyA0OS4yODU3MTQsNy44NTcxNDI5IDQ5Ljg4MDk1Miw3Ljg1NzE0MjkgNTAuMTc4NTcxLDcuODU3MTQyOSBDIDUwLjMyNzM4MSw3Ljg1NzE0MjkgNTAuNDA5MjI3LDcuODU3MTQyOSA1MC40NDY0MjksNy44NTcxNDI5IEMgNTAuNDY1MDI5LDcuODU3MTQyOSA1MC40NzE1NDMsNy44NTcxNDI5IDUwLjQ3NjE5LDcuODU3MTQyOSBDIDYwLjIzNjg1Myw3Ljg1NzE0MyA2Ny4xNDI4NTcsMTUuNDk3MDk4IDY3LjE0Mjg1NywyNSBDIDY3LjE0Mjg1NywzNC41MDI5MDIgNTkuNzYwNjYyLDQyLjE0Mjg1NyA1MCw0Mi4xNDI4NTcgTCAzMi44NTcxNDMsNDIuMTQyODU3IEwgMzIuODU3MTQzLDcuODU3MTQyOSB6IgogICAgICAgaWQ9InBhdGgyODg0IgogICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NjY2NzY2NjY3Nzc3NzY2NjIiAvPgogIDwvZz4KPC9zdmc+Cg=="}}},{operation:function(a,b){return a&&b}}),joint.shapes.logic.Gate21.define("logic.Nor",{attrs:{image:{"xlink:href":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSIxMDAiCiAgIGhlaWdodD0iNTAiCiAgIGlkPSJzdmcyIgogICBzb2RpcG9kaTp2ZXJzaW9uPSIwLjMyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ2IgogICB2ZXJzaW9uPSIxLjAiCiAgIHNvZGlwb2RpOmRvY25hbWU9Ik5PUiBBTlNJLnN2ZyIKICAgaW5rc2NhcGU6b3V0cHV0X2V4dGVuc2lvbj0ib3JnLmlua3NjYXBlLm91dHB1dC5zdmcuaW5rc2NhcGUiPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM0Ij4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAxNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF96PSI1MCA6IDE1IDogMSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIyNSA6IDEwIDogMSIKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI3MTQiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMC41IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEgOiAwLjUgOiAxIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjAuNSA6IDAuMzMzMzMzMzMgOiAxIgogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgwNiIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgxOSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIzNzIuMDQ3MjQgOiAzNTAuNzg3MzkgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNzQ0LjA5NDQ4IDogNTI2LjE4MTA5IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MjYuMTgxMDkgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjc3NyIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSI3NSA6IDQwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjE1MCA6IDYwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA2MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmUzMjc1IgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjUwIDogMzMuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEwMCA6IDUwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmU1NTMzIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjMyIDogMjEuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjY0IDogMzIgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDMyIDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI1NTciCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMjUgOiAxNi42NjY2NjcgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNTAgOiAyNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMjUgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICA8L2RlZnM+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJiYXNlIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnpvb209IjEiCiAgICAgaW5rc2NhcGU6Y3g9Ijc4LjY3NzY0NCIKICAgICBpbmtzY2FwZTpjeT0iMjIuMTAyMzQ0IgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiCiAgICAgc2hvd2dyaWQ9InRydWUiCiAgICAgaW5rc2NhcGU6Z3JpZC1iYm94PSJ0cnVlIgogICAgIGlua3NjYXBlOmdyaWQtcG9pbnRzPSJ0cnVlIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwMDAwIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTM5OSIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI4NzQiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjM3IgogICAgIGlua3NjYXBlOndpbmRvdy15PSItNCIKICAgICBpbmtzY2FwZTpzbmFwLWJib3g9InRydWUiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIGlkPSJHcmlkRnJvbVByZTA0NlNldHRpbmdzIgogICAgICAgdHlwZT0ieHlncmlkIgogICAgICAgb3JpZ2lueD0iMHB4IgogICAgICAgb3JpZ2lueT0iMHB4IgogICAgICAgc3BhY2luZ3g9IjFweCIKICAgICAgIHNwYWNpbmd5PSIxcHgiCiAgICAgICBjb2xvcj0iIzAwMDBmZiIKICAgICAgIGVtcGNvbG9yPSIjMDAwMGZmIgogICAgICAgb3BhY2l0eT0iMC4yIgogICAgICAgZW1wb3BhY2l0eT0iMC40IgogICAgICAgZW1wc3BhY2luZz0iNSIKICAgICAgIHZpc2libGU9InRydWUiCiAgICAgICBlbmFibGVkPSJ0cnVlIiAvPgogIDwvc29kaXBvZGk6bmFtZWR2aWV3PgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTciPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIj4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJNIDc5LDI1IEMgOTksMjUgOTUsMjUgOTUsMjUiCiAgICAgICBpZD0icGF0aDMwNTkiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Ik0gMzEsMTUgNSwxNSIKICAgICAgIGlkPSJwYXRoMzA2MSIgLz4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjk5OTk5OTg4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJNIDMyLDM1IDUsMzUiCiAgICAgICBpZD0icGF0aDM5NDQiIC8+CiAgICA8ZwogICAgICAgaWQ9ImcyNTYwIgogICAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi41LC0zOS41KSI+CiAgICAgIDxwYXRoCiAgICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjM7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgZD0iTSAtMi40MDYyNSw0NC41IEwgLTAuNDA2MjUsNDYuOTM3NSBDIC0wLjQwNjI1LDQ2LjkzNzUgNS4yNSw1My45Mzc1NDkgNS4yNSw2NC41IEMgNS4yNSw3NS4wNjI0NTEgLTAuNDA2MjUsODIuMDYyNSAtMC40MDYyNSw4Mi4wNjI1IEwgLTIuNDA2MjUsODQuNSBMIDAuNzUsODQuNSBMIDE0Ljc1LDg0LjUgQyAxNy4xNTgwNzYsODQuNTAwMDAxIDIyLjQzOTY5OSw4NC41MjQ1MTQgMjguMzc1LDgyLjA5Mzc1IEMgMzQuMzEwMzAxLDc5LjY2Mjk4NiA0MC45MTE1MzYsNzQuNzUwNDg0IDQ2LjA2MjUsNjUuMjE4NzUgTCA0NC43NSw2NC41IEwgNDYuMDYyNSw2My43ODEyNSBDIDM1Ljc1OTM4Nyw0NC43MTU1OSAxOS41MDY1NzQsNDQuNSAxNC43NSw0NC41IEwgMC43NSw0NC41IEwgLTIuNDA2MjUsNDQuNSB6IE0gMy40Njg3NSw0Ny41IEwgMTQuNzUsNDcuNSBDIDE5LjQzNDE3Myw0Ny41IDMzLjAzNjg1LDQ3LjM2OTc5MyA0Mi43MTg3NSw2NC41IEMgMzcuOTUxOTY0LDcyLjkyOTA3NSAzMi4xOTc0NjksNzcuMTgzOTEgMjcsNzkuMzEyNSBDIDIxLjYzOTMzOSw4MS41MDc5MjQgMTcuMTU4MDc1LDgxLjUwMDAwMSAxNC43NSw4MS41IEwgMy41LDgxLjUgQyA1LjM3MzU4ODQsNzguMzkxNTY2IDguMjUsNzIuNDUwNjUgOC4yNSw2NC41IEMgOC4yNSw1Ni41MjY2NDYgNS4zNDE0Njg2LDUwLjU5OTgxNSAzLjQ2ODc1LDQ3LjUgeiIKICAgICAgICAgaWQ9InBhdGg0OTczIgogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjc2NjY2NzY2NjY2NjY2Njc2Njc2MiIC8+CiAgICAgIDxwYXRoCiAgICAgICAgIHNvZGlwb2RpOnR5cGU9ImFyYyIKICAgICAgICAgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MztzdHJva2UtbGluZWpvaW46bWl0ZXI7bWFya2VyOm5vbmU7c3Ryb2tlLW9wYWNpdHk6MTt2aXNpYmlsaXR5OnZpc2libGU7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIgogICAgICAgICBpZD0icGF0aDI2MDQiCiAgICAgICAgIHNvZGlwb2RpOmN4PSI3NSIKICAgICAgICAgc29kaXBvZGk6Y3k9IjI1IgogICAgICAgICBzb2RpcG9kaTpyeD0iNCIKICAgICAgICAgc29kaXBvZGk6cnk9IjQiCiAgICAgICAgIGQ9Ik0gNzksMjUgQSA0LDQgMCAxIDEgNzEsMjUgQSA0LDQgMCAxIDEgNzksMjUgeiIKICAgICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2LjUsMzkuNSkiIC8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"
}}},{operation:function(a,b){return!(a||b)}}),joint.shapes.logic.Gate21.define("logic.Nand",{attrs:{image:{"xlink:href":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSIxMDAiCiAgIGhlaWdodD0iNTAiCiAgIGlkPSJzdmcyIgogICBzb2RpcG9kaTp2ZXJzaW9uPSIwLjMyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ2IgogICB2ZXJzaW9uPSIxLjAiCiAgIHNvZGlwb2RpOmRvY25hbWU9Ik5BTkQgQU5TSS5zdmciCiAgIGlua3NjYXBlOm91dHB1dF9leHRlbnNpb249Im9yZy5pbmtzY2FwZS5vdXRwdXQuc3ZnLmlua3NjYXBlIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzNCI+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMTUgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfej0iNTAgOiAxNSA6IDEiCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMjUgOiAxMCA6IDEiCiAgICAgICBpZD0icGVyc3BlY3RpdmUyNzE0IiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDAuNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF96PSIxIDogMC41IDogMSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIwLjUgOiAwLjMzMzMzMzMzIDogMSIKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI4MDYiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI4MTkiCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMzcyLjA0NzI0IDogMzUwLjc4NzM5IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9Ijc0NC4wOTQ0OCA6IDUyNi4xODEwOSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogNTI2LjE4MTA5IDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI3NzciCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iNzUgOiA0MCA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF96PSIxNTAgOiA2MCA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogNjAgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMzI3NSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSI1MCA6IDMzLjMzMzMzMyA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF96PSIxMDAgOiA1MCA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogNTAgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlNTUzMyIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIzMiA6IDIxLjMzMzMzMyA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF96PSI2NCA6IDMyIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAzMiA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogIDwvZGVmcz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iMTYiCiAgICAgaW5rc2NhcGU6Y3g9Ijc4LjI4MzMwNyIKICAgICBpbmtzY2FwZTpjeT0iMTYuNDQyODQzIgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiCiAgICAgc2hvd2dyaWQ9InRydWUiCiAgICAgaW5rc2NhcGU6Z3JpZC1iYm94PSJ0cnVlIgogICAgIGlua3NjYXBlOmdyaWQtcG9pbnRzPSJ0cnVlIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwMDAwIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTM5OSIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI4NzQiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjMzIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIwIgogICAgIGlua3NjYXBlOnNuYXAtYmJveD0idHJ1ZSI+CiAgICA8aW5rc2NhcGU6Z3JpZAogICAgICAgaWQ9IkdyaWRGcm9tUHJlMDQ2U2V0dGluZ3MiCiAgICAgICB0eXBlPSJ4eWdyaWQiCiAgICAgICBvcmlnaW54PSIwcHgiCiAgICAgICBvcmlnaW55PSIwcHgiCiAgICAgICBzcGFjaW5neD0iMXB4IgogICAgICAgc3BhY2luZ3k9IjFweCIKICAgICAgIGNvbG9yPSIjMDAwMGZmIgogICAgICAgZW1wY29sb3I9IiMwMDAwZmYiCiAgICAgICBvcGFjaXR5PSIwLjIiCiAgICAgICBlbXBvcGFjaXR5PSIwLjQiCiAgICAgICBlbXBzcGFjaW5nPSI1IgogICAgICAgdmlzaWJsZT0idHJ1ZSIKICAgICAgIGVuYWJsZWQ9InRydWUiIC8+CiAgPC9zb2RpcG9kaTpuYW1lZHZpZXc+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNyI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Ik0gNzksMjUgQyA5MS44LDI1IDk1LDI1IDk1LDI1IgogICAgICAgaWQ9InBhdGgzMDU5IgogICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjYyIgLz4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJNIDMxLDE1IDUsMTUiCiAgICAgICBpZD0icGF0aDMwNjEiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS45OTk5OTk4ODtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0iTSAzMiwzNSA1LDM1IgogICAgICAgaWQ9InBhdGgzOTQ0IiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmb250LXNpemU6bWVkaXVtO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtdmFyaWFudDpub3JtYWw7Zm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc3RyZXRjaDpub3JtYWw7dGV4dC1pbmRlbnQ6MDt0ZXh0LWFsaWduOnN0YXJ0O3RleHQtZGVjb3JhdGlvbjpub25lO2xpbmUtaGVpZ2h0Om5vcm1hbDtsZXR0ZXItc3BhY2luZzpub3JtYWw7d29yZC1zcGFjaW5nOm5vcm1hbDt0ZXh0LXRyYW5zZm9ybTpub25lO2RpcmVjdGlvbjpsdHI7YmxvY2stcHJvZ3Jlc3Npb246dGI7d3JpdGluZy1tb2RlOmxyLXRiO3RleHQtYW5jaG9yOnN0YXJ0O2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MzttYXJrZXI6bm9uZTt2aXNpYmlsaXR5OnZpc2libGU7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlO2ZvbnQtZmFtaWx5OkJpdHN0cmVhbSBWZXJhIFNhbnM7LWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjpCaXRzdHJlYW0gVmVyYSBTYW5zIgogICAgICAgZD0iTSAzMCw1IEwgMzAsNi40Mjg1NzE0IEwgMzAsNDMuNTcxNDI5IEwgMzAsNDUgTCAzMS40Mjg1NzEsNDUgTCA1MC40NzYxOSw0NSBDIDYxLjc0NDA5OCw0NSA3MC40NzYxOSwzNS45OTk5NTUgNzAuNDc2MTksMjUgQyA3MC40NzYxOSwxNC4wMDAwNDUgNjEuNzQ0MDk5LDUuMDAwMDAwMiA1MC40NzYxOSw1IEMgNTAuNDc2MTksNSA1MC40NzYxOSw1IDMxLjQyODU3MSw1IEwgMzAsNSB6IE0gMzIuODU3MTQzLDcuODU3MTQyOSBDIDQwLjgzNDI2NCw3Ljg1NzE0MjkgNDUuOTE4MzY4LDcuODU3MTQyOSA0OC4wOTUyMzgsNy44NTcxNDI5IEMgNDkuMjg1NzE0LDcuODU3MTQyOSA0OS44ODA5NTIsNy44NTcxNDI5IDUwLjE3ODU3MSw3Ljg1NzE0MjkgQyA1MC4zMjczODEsNy44NTcxNDI5IDUwLjQwOTIyNyw3Ljg1NzE0MjkgNTAuNDQ2NDI5LDcuODU3MTQyOSBDIDUwLjQ2NTAyOSw3Ljg1NzE0MjkgNTAuNDcxNTQzLDcuODU3MTQyOSA1MC40NzYxOSw3Ljg1NzE0MjkgQyA2MC4yMzY4NTMsNy44NTcxNDMgNjcuMTQyODU3LDE1LjQ5NzA5OCA2Ny4xNDI4NTcsMjUgQyA2Ny4xNDI4NTcsMzQuNTAyOTAyIDU5Ljc2MDY2Miw0Mi4xNDI4NTcgNTAsNDIuMTQyODU3IEwgMzIuODU3MTQzLDQyLjE0Mjg1NyBMIDMyLjg1NzE0Myw3Ljg1NzE0MjkgeiIKICAgICAgIGlkPSJwYXRoMjg4NCIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2Njc2NjY2Nzc3Nzc2NjYyIgLz4KICAgIDxwYXRoCiAgICAgICBzb2RpcG9kaTp0eXBlPSJhcmMiCiAgICAgICBzdHlsZT0iZmlsbDpub25lO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDozO3N0cm9rZS1saW5lam9pbjptaXRlcjttYXJrZXI6bm9uZTtzdHJva2Utb3BhY2l0eToxO3Zpc2liaWxpdHk6dmlzaWJsZTtkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiCiAgICAgICBpZD0icGF0aDQwMDgiCiAgICAgICBzb2RpcG9kaTpjeD0iNzUiCiAgICAgICBzb2RpcG9kaTpjeT0iMjUiCiAgICAgICBzb2RpcG9kaTpyeD0iNCIKICAgICAgIHNvZGlwb2RpOnJ5PSI0IgogICAgICAgZD0iTSA3OSwyNSBBIDQsNCAwIDEgMSA3MSwyNSBBIDQsNCAwIDEgMSA3OSwyNSB6IiAvPgogIDwvZz4KPC9zdmc+Cg=="}}},{operation:function(a,b){return!(a&&b)}}),joint.shapes.logic.Gate21.define("logic.Xor",{attrs:{image:{"xlink:href":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSIxMDAiCiAgIGhlaWdodD0iNTAiCiAgIGlkPSJzdmcyIgogICBzb2RpcG9kaTp2ZXJzaW9uPSIwLjMyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ2IgogICB2ZXJzaW9uPSIxLjAiCiAgIHNvZGlwb2RpOmRvY25hbWU9IlhPUiBBTlNJLnN2ZyIKICAgaW5rc2NhcGU6b3V0cHV0X2V4dGVuc2lvbj0ib3JnLmlua3NjYXBlLm91dHB1dC5zdmcuaW5rc2NhcGUiPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM0Ij4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAxNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF96PSI1MCA6IDE1IDogMSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIyNSA6IDEwIDogMSIKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI3MTQiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMC41IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEgOiAwLjUgOiAxIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjAuNSA6IDAuMzMzMzMzMzMgOiAxIgogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgwNiIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjgxOSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIzNzIuMDQ3MjQgOiAzNTAuNzg3MzkgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNzQ0LjA5NDQ4IDogNTI2LjE4MTA5IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MjYuMTgxMDkgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMjc3NyIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSI3NSA6IDQwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjE1MCA6IDYwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA2MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmUzMjc1IgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjUwIDogMzMuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjEwMCA6IDUwIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MCA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmU1NTMzIgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjMyIDogMjEuMzMzMzMzIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjY0IDogMzIgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDMyIDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI1NTciCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMjUgOiAxNi42NjY2NjcgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfej0iNTAgOiAyNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMjUgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICA8L2RlZnM+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJiYXNlIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnpvb209IjUuNjU2ODU0MiIKICAgICBpbmtzY2FwZTpjeD0iMjUuOTM4MTE2IgogICAgIGlua3NjYXBlOmN5PSIxNy4yMzAwNSIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJ0cnVlIgogICAgIGlua3NjYXBlOmdyaWQtYmJveD0idHJ1ZSIKICAgICBpbmtzY2FwZTpncmlkLXBvaW50cz0idHJ1ZSIKICAgICBncmlkdG9sZXJhbmNlPSIxMDAwMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEzOTkiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iODc0IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIzMyIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMCIKICAgICBpbmtzY2FwZTpzbmFwLWJib3g9InRydWUiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIGlkPSJHcmlkRnJvbVByZTA0NlNldHRpbmdzIgogICAgICAgdHlwZT0ieHlncmlkIgogICAgICAgb3JpZ2lueD0iMHB4IgogICAgICAgb3JpZ2lueT0iMHB4IgogICAgICAgc3BhY2luZ3g9IjFweCIKICAgICAgIHNwYWNpbmd5PSIxcHgiCiAgICAgICBjb2xvcj0iIzAwMDBmZiIKICAgICAgIGVtcGNvbG9yPSIjMDAwMGZmIgogICAgICAgb3BhY2l0eT0iMC4yIgogICAgICAgZW1wb3BhY2l0eT0iMC40IgogICAgICAgZW1wc3BhY2luZz0iNSIKICAgICAgIHZpc2libGU9InRydWUiCiAgICAgICBlbmFibGVkPSJ0cnVlIiAvPgogIDwvc29kaXBvZGk6bmFtZWR2aWV3PgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTciPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIj4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJtIDcwLDI1IGMgMjAsMCAyNSwwIDI1LDAiCiAgICAgICBpZD0icGF0aDMwNTkiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuOTk5OTk5ODg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Ik0gMzAuMzg1NzE3LDE1IEwgNC45OTk5OTk4LDE1IgogICAgICAgaWQ9InBhdGgzMDYxIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuOTk5OTk5NzY7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Ik0gMzEuMzYyMDkxLDM1IEwgNC45OTk5OTk4LDM1IgogICAgICAgaWQ9InBhdGgzOTQ0IiAvPgogICAgPGcKICAgICAgIGlkPSJnMjU2MCIKICAgICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjYuNSwtMzkuNSkiPgogICAgICA8cGF0aAogICAgICAgICBpZD0icGF0aDM1MTYiCiAgICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjM7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgZD0iTSAtMi4yNSw4MS41MDAwMDUgQyAtMy44NDczNzQsODQuMTQ0NDA1IC00LjUsODQuNTAwMDA1IC00LjUsODQuNTAwMDA1IEwgLTguMTU2MjUsODQuNTAwMDA1IEwgLTYuMTU2MjUsODIuMDYyNTA1IEMgLTYuMTU2MjUsODIuMDYyNTA1IC0wLjUsNzUuMDYyNDUxIC0wLjUsNjQuNSBDIC0wLjUsNTMuOTM3NTQ5IC02LjE1NjI1LDQ2LjkzNzUgLTYuMTU2MjUsNDYuOTM3NSBMIC04LjE1NjI1LDQ0LjUgTCAtNC41LDQ0LjUgQyAtMy43MTg3NSw0NS40Mzc1IC0zLjA3ODEyNSw0Ni4xNTYyNSAtMi4yODEyNSw0Ny41IEMgLTAuNDA4NTMxLDUwLjU5OTgxNSAyLjUsNTYuNTI2NjQ2IDIuNSw2NC41IEMgMi41LDcyLjQ1MDY1IC0wLjM5NjY5Nyw3OC4zNzk0MjUgLTIuMjUsODEuNTAwMDA1IHoiCiAgICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY3NjY2Njc2MiIC8+CiAgICAgIDxwYXRoCiAgICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjM7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgZD0iTSAtMi40MDYyNSw0NC41IEwgLTAuNDA2MjUsNDYuOTM3NSBDIC0wLjQwNjI1LDQ2LjkzNzUgNS4yNSw1My45Mzc1NDkgNS4yNSw2NC41IEMgNS4yNSw3NS4wNjI0NTEgLTAuNDA2MjUsODIuMDYyNSAtMC40MDYyNSw4Mi4wNjI1IEwgLTIuNDA2MjUsODQuNSBMIDAuNzUsODQuNSBMIDE0Ljc1LDg0LjUgQyAxNy4xNTgwNzYsODQuNTAwMDAxIDIyLjQzOTY5OSw4NC41MjQ1MTQgMjguMzc1LDgyLjA5Mzc1IEMgMzQuMzEwMzAxLDc5LjY2Mjk4NiA0MC45MTE1MzYsNzQuNzUwNDg0IDQ2LjA2MjUsNjUuMjE4NzUgTCA0NC43NSw2NC41IEwgNDYuMDYyNSw2My43ODEyNSBDIDM1Ljc1OTM4Nyw0NC43MTU1OSAxOS41MDY1NzQsNDQuNSAxNC43NSw0NC41IEwgMC43NSw0NC41IEwgLTIuNDA2MjUsNDQuNSB6IE0gMy40Njg3NSw0Ny41IEwgMTQuNzUsNDcuNSBDIDE5LjQzNDE3Myw0Ny41IDMzLjAzNjg1LDQ3LjM2OTc5MyA0Mi43MTg3NSw2NC41IEMgMzcuOTUxOTY0LDcyLjkyOTA3NSAzMi4xOTc0NjksNzcuMTgzOTEgMjcsNzkuMzEyNSBDIDIxLjYzOTMzOSw4MS41MDc5MjQgMTcuMTU4MDc1LDgxLjUwMDAwMSAxNC43NSw4MS41IEwgMy41LDgxLjUgQyA1LjM3MzU4ODQsNzguMzkxNTY2IDguMjUsNzIuNDUwNjUgOC4yNSw2NC41IEMgOC4yNSw1Ni41MjY2NDYgNS4zNDE0Njg2LDUwLjU5OTgxNSAzLjQ2ODc1LDQ3LjUgeiIKICAgICAgICAgaWQ9InBhdGg0OTczIgogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjc2NjY2NzY2NjY2NjY2Njc2Njc2MiIC8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"}}},{operation:function(a,b){return(!a||b)&&(a||!b)}}),joint.shapes.logic.Gate21.define("logic.Xnor",{attrs:{image:{"xlink:href":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSIxMDAiCiAgIGhlaWdodD0iNTAiCiAgIGlkPSJzdmcyIgogICBzb2RpcG9kaTp2ZXJzaW9uPSIwLjMyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ2IgogICB2ZXJzaW9uPSIxLjAiCiAgIHNvZGlwb2RpOmRvY25hbWU9IlhOT1IgQU5TSS5zdmciCiAgIGlua3NjYXBlOm91dHB1dF9leHRlbnNpb249Im9yZy5pbmtzY2FwZS5vdXRwdXQuc3ZnLmlua3NjYXBlIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzNCI+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogMTUgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfej0iNTAgOiAxNSA6IDEiCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMjUgOiAxMCA6IDEiCiAgICAgICBpZD0icGVyc3BlY3RpdmUyNzE0IiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDAuNSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF96PSIxIDogMC41IDogMSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIwLjUgOiAwLjMzMzMzMzMzIDogMSIKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI4MDYiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI4MTkiCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMzcyLjA0NzI0IDogMzUwLjc4NzM5IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9Ijc0NC4wOTQ0OCA6IDUyNi4xODEwOSA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogNTI2LjE4MTA5IDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUKICAgICAgIGlkPSJwZXJzcGVjdGl2ZTI3NzciCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iNzUgOiA0MCA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF96PSIxNTAgOiA2MCA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogNjAgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlMzI3NSIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSI1MCA6IDMzLjMzMzMzMyA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF96PSIxMDAgOiA1MCA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF95PSIwIDogMTAwMCA6IDAiCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogNTAgOiAxIgogICAgICAgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCIgLz4KICAgIDxpbmtzY2FwZTpwZXJzcGVjdGl2ZQogICAgICAgaWQ9InBlcnNwZWN0aXZlNTUzMyIKICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIzMiA6IDIxLjMzMzMzMyA6IDEiCiAgICAgICBpbmtzY2FwZTp2cF96PSI2NCA6IDMyIDogMSIKICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCIKICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiAzMiA6IDEiCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPgogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlCiAgICAgICBpZD0icGVyc3BlY3RpdmUyNTU3IgogICAgICAgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjI1IDogMTYuNjY2NjY3IDogMSIKICAgICAgIGlua3NjYXBlOnZwX3o9IjUwIDogMjUgOiAxIgogICAgICAgaW5rc2NhcGU6dnBfeT0iMCA6IDEwMDAgOiAwIgogICAgICAgaW5rc2NhcGU6dnBfeD0iMCA6IDI1IDogMSIKICAgICAgIHNvZGlwb2RpOnR5cGU9Imlua3NjYXBlOnBlcnNwM2QiIC8+CiAgPC9kZWZzPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0iYmFzZSIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMS4wIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp6b29tPSI0IgogICAgIGlua3NjYXBlOmN4PSI5NS43MjM2NiIKICAgICBpbmtzY2FwZTpjeT0iLTI2Ljc3NTAyMyIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJ0cnVlIgogICAgIGlua3NjYXBlOmdyaWQtYmJveD0idHJ1ZSIKICAgICBpbmtzY2FwZTpncmlkLXBvaW50cz0idHJ1ZSIKICAgICBncmlkdG9sZXJhbmNlPSIxMDAwMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEzOTkiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iODc0IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIzMyIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMCIKICAgICBpbmtzY2FwZTpzbmFwLWJib3g9InRydWUiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIGlkPSJHcmlkRnJvbVByZTA0NlNldHRpbmdzIgogICAgICAgdHlwZT0ieHlncmlkIgogICAgICAgb3JpZ2lueD0iMHB4IgogICAgICAgb3JpZ2lueT0iMHB4IgogICAgICAgc3BhY2luZ3g9IjFweCIKICAgICAgIHNwYWNpbmd5PSIxcHgiCiAgICAgICBjb2xvcj0iIzAwMDBmZiIKICAgICAgIGVtcGNvbG9yPSIjMDAwMGZmIgogICAgICAgb3BhY2l0eT0iMC4yIgogICAgICAgZW1wb3BhY2l0eT0iMC40IgogICAgICAgZW1wc3BhY2luZz0iNSIKICAgICAgIHZpc2libGU9InRydWUiCiAgICAgICBlbmFibGVkPSJ0cnVlIiAvPgogIDwvc29kaXBvZGk6bmFtZWR2aWV3PgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTciPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIj4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoyLjAwMDAwMDI0O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJNIDc4LjMzMzMzMiwyNSBDIDkxLjY2NjY2NiwyNSA5NSwyNSA5NSwyNSIKICAgICAgIGlkPSJwYXRoMzA1OSIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2MiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS45OTk5OTk4ODtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0iTSAzMC4zODU3MTcsMTUgTCA0Ljk5OTk5OTgsMTUiCiAgICAgICBpZD0icGF0aDMwNjEiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS45OTk5OTk3NjtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0iTSAzMS4zNjIwOTEsMzUgTCA0Ljk5OTk5OTgsMzUiCiAgICAgICBpZD0icGF0aDM5NDQiIC8+CiAgICA8ZwogICAgICAgaWQ9ImcyNTYwIgogICAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi41LC0zOS41KSI+CiAgICAgIDxwYXRoCiAgICAgICAgIGlkPSJwYXRoMzUxNiIKICAgICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MztzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICBkPSJNIC0yLjI1LDgxLjUwMDAwNSBDIC0zLjg0NzM3NCw4NC4xNDQ0MDUgLTQuNSw4NC41MDAwMDUgLTQuNSw4NC41MDAwMDUgTCAtOC4xNTYyNSw4NC41MDAwMDUgTCAtNi4xNTYyNSw4Mi4wNjI1MDUgQyAtNi4xNTYyNSw4Mi4wNjI1MDUgLTAuNSw3NS4wNjI0NTEgLTAuNSw2NC41IEMgLTAuNSw1My45Mzc1NDkgLTYuMTU2MjUsNDYuOTM3NSAtNi4xNTYyNSw0Ni45Mzc1IEwgLTguMTU2MjUsNDQuNSBMIC00LjUsNDQuNSBDIC0zLjcxODc1LDQ1LjQzNzUgLTMuMDc4MTI1LDQ2LjE1NjI1IC0yLjI4MTI1LDQ3LjUgQyAtMC40MDg1MzEsNTAuNTk5ODE1IDIuNSw1Ni41MjY2NDYgMi41LDY0LjUgQyAyLjUsNzIuNDUwNjUgLTAuMzk2Njk3LDc4LjM3OTQyNSAtMi4yNSw4MS41MDAwMDUgeiIKICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2Njc2NjY2NzYyIgLz4KICAgICAgPHBhdGgKICAgICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MztzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICBkPSJNIC0yLjQwNjI1LDQ0LjUgTCAtMC40MDYyNSw0Ni45Mzc1IEMgLTAuNDA2MjUsNDYuOTM3NSA1LjI1LDUzLjkzNzU0OSA1LjI1LDY0LjUgQyA1LjI1LDc1LjA2MjQ1MSAtMC40MDYyNSw4Mi4wNjI1IC0wLjQwNjI1LDgyLjA2MjUgTCAtMi40MDYyNSw4NC41IEwgMC43NSw4NC41IEwgMTQuNzUsODQuNSBDIDE3LjE1ODA3Niw4NC41MDAwMDEgMjIuNDM5Njk5LDg0LjUyNDUxNCAyOC4zNzUsODIuMDkzNzUgQyAzNC4zMTAzMDEsNzkuNjYyOTg2IDQwLjkxMTUzNiw3NC43NTA0ODQgNDYuMDYyNSw2NS4yMTg3NSBMIDQ0Ljc1LDY0LjUgTCA0Ni4wNjI1LDYzLjc4MTI1IEMgMzUuNzU5Mzg3LDQ0LjcxNTU5IDE5LjUwNjU3NCw0NC41IDE0Ljc1LDQ0LjUgTCAwLjc1LDQ0LjUgTCAtMi40MDYyNSw0NC41IHogTSAzLjQ2ODc1LDQ3LjUgTCAxNC43NSw0Ny41IEMgMTkuNDM0MTczLDQ3LjUgMzMuMDM2ODUsNDcuMzY5NzkzIDQyLjcxODc1LDY0LjUgQyAzNy45NTE5NjQsNzIuOTI5MDc1IDMyLjE5NzQ2OSw3Ny4xODM5MSAyNyw3OS4zMTI1IEMgMjEuNjM5MzM5LDgxLjUwNzkyNCAxNy4xNTgwNzUsODEuNTAwMDAxIDE0Ljc1LDgxLjUgTCAzLjUsODEuNSBDIDUuMzczNTg4NCw3OC4zOTE1NjYgOC4yNSw3Mi40NTA2NSA4LjI1LDY0LjUgQyA4LjI1LDU2LjUyNjY0NiA1LjM0MTQ2ODYsNTAuNTk5ODE1IDMuNDY4NzUsNDcuNSB6IgogICAgICAgICBpZD0icGF0aDQ5NzMiCiAgICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NzY2NjY3NjY2NjY2NjY2NzY2NzYyIgLz4KICAgIDwvZz4KICAgIDxwYXRoCiAgICAgICBzb2RpcG9kaTp0eXBlPSJhcmMiCiAgICAgICBzdHlsZT0iZmlsbDpub25lO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDozO3N0cm9rZS1saW5lam9pbjptaXRlcjttYXJrZXI6bm9uZTtzdHJva2Utb3BhY2l0eToxO3Zpc2liaWxpdHk6dmlzaWJsZTtkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiCiAgICAgICBpZD0icGF0aDM1NTEiCiAgICAgICBzb2RpcG9kaTpjeD0iNzUiCiAgICAgICBzb2RpcG9kaTpjeT0iMjUiCiAgICAgICBzb2RpcG9kaTpyeD0iNCIKICAgICAgIHNvZGlwb2RpOnJ5PSI0IgogICAgICAgZD0iTSA3OSwyNSBBIDQsNCAwIDEgMSA3MSwyNSBBIDQsNCAwIDEgMSA3OSwyNSB6IiAvPgogIDwvZz4KPC9zdmc+Cg=="}}},{operation:function(a,b){return(!a||!b)&&(a||b)}}),joint.dia.Link.define("logic.Wire",{attrs:{".connection":{"stroke-width":2},".marker-vertex":{r:7}},router:{name:"orthogonal"},connector:{name:"rounded",args:{radius:10}}},{arrowheadMarkup:['<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">','<circle class="marker-arrowhead" end="<%= end %>" r="7"/>',"</g>"].join(""),vertexMarkup:['<g class="marker-vertex-group" transform="translate(<%= x %>, <%= y %>)">','<circle class="marker-vertex" idx="<%= idx %>" r="10" />','<g class="marker-vertex-remove-group">','<path class="marker-vertex-remove-area" idx="<%= idx %>" d="M16,5.333c-7.732,0-14,4.701-14,10.5c0,1.982,0.741,3.833,2.016,5.414L2,25.667l5.613-1.441c2.339,1.317,5.237,2.107,8.387,2.107c7.732,0,14-4.701,14-10.5C30,10.034,23.732,5.333,16,5.333z" transform="translate(5, -33)"/>','<path class="marker-vertex-remove" idx="<%= idx %>" transform="scale(.8) translate(9.5, -37)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z">',"<title>Remove vertex.</title>","</path>","</g>","</g>"].join("")});
if("object"==typeof exports)var graphlib=require("graphlib"),dagre=require("dagre");graphlib=graphlib||"undefined"!=typeof window&&window.graphlib,dagre=dagre||"undefined"!=typeof window&&window.dagre,joint.layout.DirectedGraph={exportElement:function(a){return a.size()},exportLink:function(a){var b=a.get("labelSize")||{},c={minLen:a.get("minLen")||1,weight:a.get("weight")||1,labelpos:a.get("labelPosition")||"c",labeloffset:a.get("labelOffset")||0,width:b.width||0,height:b.height||0};return c},importElement:function(a,b,c){var d=this.getCell(b),e=c.node(b);a.setPosition?a.setPosition(d,e):d.set("position",{x:e.x-e.width/2,y:e.y-e.height/2})},importLink:function(a,b,c){var d=this.getCell(b.name),e=c.edge(b),f=e.points||[];if((a.setVertices||a.setLinkVertices)&&(joint.util.isFunction(a.setVertices)?a.setVertices(d,f):d.set("vertices",f.slice(1,f.length-1))),a.setLabels&&"x"in e&&"y"in e){var h={x:e.x,y:e.y};if(joint.util.isFunction(a.setLabels))a.setLabels(d,h,f);else{var i=g.Polyline(f),j=i.closestPointLength(h),k=i.pointAtLength(j),l=j/i.length();d.label(0,{position:{distance:l,offset:g.Point(h).difference(k).toJSON()}})}}},layout:function(a,b){var c;c=a instanceof joint.dia.Graph?a:(new joint.dia.Graph).resetCells(a,{dry:!0,sort:!1}),a=null,b=joint.util.defaults(b||{},{resizeClusters:!0,clusterPadding:10,exportElement:this.exportElement,exportLink:this.exportLink});var d=c.toGraphLib({directed:!0,multigraph:!0,compound:!0,setNodeLabel:b.exportElement,setEdgeLabel:b.exportLink,setEdgeName:function(a){return a.id}}),e={},f=b.marginX||0,h=b.marginY||0;if(b.rankDir&&(e.rankdir=b.rankDir),b.align&&(e.align=b.align),b.nodeSep&&(e.nodesep=b.nodeSep),b.edgeSep&&(e.edgesep=b.edgeSep),b.rankSep&&(e.ranksep=b.rankSep),b.ranker&&(e.ranker=b.ranker),f&&(e.marginx=f),h&&(e.marginy=h),d.setGraph(e),dagre.layout(d,{debugTiming:!!b.debugTiming}),c.startBatch("layout"),c.fromGraphLib(d,{importNode:this.importElement.bind(c,b),importEdge:this.importLink.bind(c,b)}),b.resizeClusters){var i=d.nodes().filter(function(a){return d.children(a).length>0}).map(c.getCell.bind(c)).sort(function(a,b){return b.getAncestors().length-a.getAncestors().length});joint.util.invoke(i,"fitEmbeds",{padding:b.clusterPadding})}c.stopBatch("layout");var j=d.graph();return g.Rect(f,h,Math.abs(j.width-2*f),Math.abs(j.height-2*h))},fromGraphLib:function(a,b){b=b||{};var c=b.importNode||joint.util.noop,d=b.importEdge||joint.util.noop,e=this instanceof joint.dia.Graph?this:new joint.dia.Graph;return a.nodes().forEach(function(d){c.call(e,d,a,e,b)}),a.edges().forEach(function(c){d.call(e,c,a,e,b)}),e},toGraphLib:function(a,b){b=b||{};for(var c=joint.util.pick(b,"directed","compound","multigraph"),d=new graphlib.Graph(c),e=b.setNodeLabel||joint.util.noop,f=b.setEdgeLabel||joint.util.noop,g=b.setEdgeName||joint.util.noop,h=a.get("cells"),i=0,j=h.length;i<j;i++){var k=h.at(i);if(k.isLink()){var l=k.get("source"),m=k.get("target");if(!l.id||!m.id)break;d.setEdge(l.id,m.id,f(k),g(k))}else if(d.setNode(k.id,e(k)),d.isCompound()&&k.has("parent")){var n=k.get("parent");h.has(n)&&d.setParent(k.id,n)}}return d}},joint.dia.Graph.prototype.toGraphLib=function(a){return joint.layout.DirectedGraph.toGraphLib(this,a)},joint.dia.Graph.prototype.fromGraphLib=function(a,b){return joint.layout.DirectedGraph.fromGraphLib.call(this,a,b)};

    joint.g = g;
    joint.V = joint.Vectorizer = V;
    document.joint = joint
    return joint;

}));

window.onload = function(){

    var graph = new joint.dia.Graph();

    var paper = new joint.dia.Paper({
        el: $('#paper'),
        width: 1000,
        height: 600,
        gridSize: 10,
        model: graph
    });


    var source = new joint.shapes.basic.Rect({
        position: { x: 50, y: 50 },
        size: { width: 140, height: 70 },
        attrs: {
            rect: {
                fill: {
                    type: 'linearGradient',
                    stops: [
                        { offset: '0%', color: '#f7a07b' },
                        { offset: '100%', color: '#fe8550' }
                    ],
                    attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
                },
                stroke: '#ed8661',
                'stroke-width': 2
            },
            text: {
                text: 'Source',
                fill: '#f0f0f0',
                'font-size': 18,
                'font-weight': 'lighter',
                'font-variant': 'small-caps'
            }
        }
    });

    var target = source.clone().translate(750, 400).attr('text/text', 'Target');

    var link = new joint.dia.Link({
        source: { id: source.id },
        target: { id: target.id },
        router: { name: 'manhattan' },
        connector: { name: 'rounded' },
        attrs: {
            '.connection': {
                stroke: '#333333',
                'stroke-width': 3
            },
            '.marker-target': {
                fill: '#333333',
                d: 'M 10 0 L 0 5 L 10 10 z'
            }
        }
    });

    var obstacle = source.clone().translate(300, 100).attr({
        text: {
            text: 'Obstacle',
            fill: '#eee'
        },
        rect: {
            fill: {
                stops: [{ color: '#b5acf9' }, { color: '#9687fe' }]
            },
            stroke: '#8e89e5',
            'stroke-width': 2
        }
    });

    var obstacles = [
        obstacle,
        obstacle.clone().translate(200, 100),
        obstacle.clone().translate(-200, 150)
    ];

    var link2 = new joint.dia.Link({
        source: { id: obstacles[1].id },
        target: { id: obstacles[2].id },
        router: { name: 'manhattan' },
        connector: { name: 'rounded' },
        attrs: {
            '.connection': {
                stroke: '#333333',
                'stroke-width': 3
            },
            '.marker-target': {
                fill: '#333333',
                d: 'M 10 0 L 0 5 L 10 10 z'
            }
        }
    });

    var link3 = new joint.dia.Link({
        source: { id: obstacles[0].id },
        target: { id: obstacles[2].id },
        router: { name: 'manhattan' },
        connector: { name: 'rounded' },
        attrs: {
            '.connection': {
                stroke: '#333333',
                'stroke-width': 3
            },
            '.marker-target': {
                fill: '#333333',
                d: 'M 10 0 L 0 5 L 10 10 z'
            }
        }
    });

    graph.addCells([obstacles[1],obstacles[2],link2]).addCells([obstacles[0], obstacles[2],link3]).addCells([source, target, link]);

    link.toBack();

    graph.on('change:position', function(cell) {

        // has an obstacle been moved? Then reroute the link.
        if (_.contains(obstacles, cell)) paper.findViewByModel(link).update();
    });

    console.log("123")

    $('.router-switch').on('click', function(evt) {

        var router = $(evt.target).data('router');
        var connector = $(evt.target).data('connector');

        if (router) {
            link.set('router', { name: router });
        } else {
            link.unset('router');
        }

        link.set('connector', { name: connector });
    });
  }