/* ------------------------------------------------------------------------------
*
*  # Dynamic tree views
*
*  Specific JS code additions for extra_trees.html page
*
*  Version: 1.0
*  Latest update: Aug 1, 2015
*
* ---------------------------------------------------------------------------- */

$(function() {


   /* $(".tree-table").fancytree({
        extensions: ["table"],
        checkbox: false,
        table: {
            indentation: 20,      // indent 20px per node level
            nodeColumnIdx: 2     // render the node title into the 2nd column
            // checkboxColumnIdx: 0  // render the checkboxes into the 1st column
        },
        source: {
            url: "assets/demo_data/fancytree/command_tree.json"
        },
        lazyLoad: function(event, data) {
            data.result = {url: "ajax-sub2.json"};
        },
        renderColumns: function(event, data) {
            var node = data.node,
            $tdList = $(node.tr).find(">td");

            // (index #0 is rendered by fancytree by adding the checkbox)
            $tdList.eq(1).text(node.getIndexHier()).addClass("alignRight");

            // (index #2 is rendered by fancytree)
            if (node.data.command === true){
                $tdList.eq(3).html("<input type='text' value='" + node.data.params + "' class='form-control'>");
            }
            else{
                $tdList.eq(3).html("");
            }

            $tdList.eq(4).html("<input type='text' value='" + node.data.looper + "' maxlength='5' style='width: 80px;'>");
            $tdList.eq(5).html("<input type='text' value='" + node.data.sequence + "' maxlength='5' style='width: 80px;'>");

            // Style checkboxes
            // $(".styled").uniform({radioClass: 'choice'});
        }
    });*/
    
    
    $('.tree-table').fancytree({
    	source: [
    	     	{"title": "Test Case #1", "expanded": true, "looper": "3", "sequence": "1", "folder": true, "children": [
    	     	                                                                                                		{"key": "1_2", "title": "Command Group #1", "expanded": true, "looper": "3", "sequence": "1", "children": [
    	     	                                                                                                			{"key": "1_2_1", "title": "Set Airplane Mode", "looper": "3", "sequence": "1", "command": true,  "params": "-u10 -p" },
    	     	                                                                                                			{"key": "1_2_2", "title": "Get Global Resource", "looper": "3", "sequence": "1", "command": true, "params": "-u10 -p" },
    	     	                                                                                                			{"key": "1_2_2", "title": "Get Local Resource", "looper": "3", "sequence": "1", "command": true, "params": "-u10 -p" }
    	     	                                                                                                		]},
    	     	                                                                                                		{"key": "1_3", "title": "Commad Group # 2", "looper": "3", "sequence": "1", "children": [
    	     	                                                                                                			{"key": "1_3_1", "title": "Make Voice Call", "looper": "3", "sequence": "1", "params": "-u10 -p", "command": true },
    	     	                                                                                                			{"key": "1_3_2", "looper": "3", "sequence": "1", "title": "Answer Voice Call", "params": "-u10 -p",  "command": true}
    	     	                                                                                                		]}
    	     	                                                                                                	]},

    	     	                                                                                                	{"key": "3", "title": "Test Case #2", "looper": "3", "sequence": "1", "folder": true, "children": [
    	     	                                                                                                		{"key": "1_2", "title": "Command Group #1", "expanded": true, "looper": "3", "sequence": "1", "children": [
    	     	                                                                                                			{"key": "1_2_1", "title": "Set Airplane Mode", "looper": "3", "sequence": "1", "command": true,  "params": "-u10 -p" },
    	     	                                                                                                			{"key": "1_2_2", "title": "Get Global Resource", "looper": "3", "sequence": "1", "command": true, "params": "-u10 -p" },
    	     	                                                                                                			{"key": "1_2_2", "title": "Get Local Resource", "looper": "3", "sequence": "1", "command": true, "params": "-u10 -p" }
    	     	                                                                                                		]},
    	     	                                                                                                		{"key": "1_3", "title": "Commad Group # 2", "looper": "3", "sequence": "1", "children": [
    	     	                                                                                                			{"key": "1_3_1", "title": "Make Voice Call", "looper": "3", "sequence": "1", "params": "-u10 -p", "command": true },
    	     	                                                                                                			{"key": "1_3_2", "looper": "3", "sequence": "1", "title": "Answer Voice Call", "params": "-u10 -p",  "command": true}
    	     	                                                                                                		]}
    	     	                                                                                                	]}
    	     	                                                                                                ],
    	postProcess: function (event, data) {
    	    var response = data.response;

    	    function changeTitle(nodeData) {
    	        nodeData.tooltip = nodeData.title;
    	        nodeData.title = 'title';
    	        for (var i in nodeData.children) {
    	            var subNodeData = nodeData.children[i];
    	            changeTitle(subNodeData);
    	        }
    	    }

    	    for (var i in response) {
    	        var nodeData = response[i];
    	        changeTitle(nodeData);
    	    }
    	}
    	});
    
});
