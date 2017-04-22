(function() {

if(!window.FileReader) return;

var fileInput = document.querySelector("#fileInput"),
	output = document.querySelector("#playground");


	
fileInput.onchange = function() {

	var file = this.files[0],
		reader = new FileReader();
		reader.readAsBinaryString(file);
	

	reader.onload = function(e) {
		var converter = new showdown.Converter();
		var toConvert = reader.result;
        var converted = converter.makeHtml(toConvert);

        output.innerHTML = converted;
        
	}
}

})();


