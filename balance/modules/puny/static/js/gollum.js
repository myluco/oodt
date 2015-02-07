/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// ua
$(document).ready(function() {
  var nodeSelector = {
    node1: null,
    node2: null,

    selectNodeRange: function( n1, n2 ) {
      if ( nodeSelector.node1 && nodeSelector.node2 ) {
        $('#wiki-history td.selected').removeClass('selected');
        nodeSelector.node1.addClass('selected');
        nodeSelector.node2.addClass('selected');

        // swap the nodes around if they went in reverse
        if ( nodeSelector.nodeComesAfter( nodeSelector.node1,
                                          nodeSelector.node2 ) ) {
          var n = nodeSelector.node1;
          nodeSelector.node1 = nodeSelector.node2;
          nodeSelector.node2 = n;
        }

        var s = true;
        var $nextNode = nodeSelector.node1.next();
        while ( $nextNode ) {
          $nextNode.addClass('selected');
          if ( $nextNode[0] == nodeSelector.node2[0] ) {
            break;
          }
          $nextNode = $nextNode.next();
        }
      }
    },

    nodeComesAfter: function ( n1, n2 ) {
      var s = false;
      $(n1).prevAll().each(function() {
        if ( $(this)[0] == $(n2)[0] ) {
          s = true;
        }
      });
      return s;
    },

    checkNode: function( nodeCheckbox ) {
      var $nodeCheckbox = nodeCheckbox;
      var $node = $(nodeCheckbox).parent().parent();
      // if we're unchecking
      if ( !$nodeCheckbox.is(':checked') ) {

        // remove the range, since we're breaking it
        $('#wiki-history tr.selected').each(function() {
          if ( $(this).find('td.checkbox input').is(':checked') ) {
            return;
          }
          $(this).removeClass('selected');
        });

        // no longer track this
        if ( $node[0] == nodeSelector.node1[0] ) {
          nodeSelector.node1 = null;
          if ( nodeSelector.node2 ) {
            nodeSelector.node1 = nodeSelector.node2;
            nodeSelector.node2 = null;
          }
        } else if ( $node[0] == nodeSelector.node2[0] ) {
          nodeSelector.node2 = null;
        }

      } else {
        if ( !nodeSelector.node1 ) {
          nodeSelector.node1 = $node;
          nodeSelector.node1.addClass('selected');
        } else if ( !nodeSelector.node2 ) {
          // okay, we don't have a node 2 but have a node1
          nodeSelector.node2 = $node;
          nodeSelector.node2.addClass('selected');
          nodeSelector.selectNodeRange( nodeSelector.node1,
                                        nodeSelector.node2 );
        } else {
          // we have two selected already
          $nodeCheckbox[0].checked = false;
        }
      }
    }
  };

  // ua detection
  if ($.browser.mozilla) {
    $('body').addClass('ff');
  } else if ($.browser.webkit) {
    $('body').addClass('webkit');
  } else if ($.browser.msie) {
    $('body').addClass('ie');
    if ($.browser.version == "7.0") {
      $('body').addClass('ie7');
    } else if ($.browser.version == "8.0") {
      $('body').addClass('ie8');
    }
  }

  if ($('#minibutton-new-page').length) {
    $('#minibutton-new-page').removeClass('jaws');
    $('#minibutton-new-page').click(function(e) {
      e.preventDefault();
      $.GollumDialog.init({
                            title: 'Create New Page',
                            fields: [
                              {
                                id:   'name',
                                name: 'Page Name',
                                type: 'text'
                              }
                            ],
                            OK: function( res ) {
                              var n = 'New Page';
                              if ( res['name'] )
                                var n = res['name'];
                              n = encodeURIComponent( n );
                              window.location = '/' + n;
                            }
                          });
    });
  }

  if ($('#wiki-wrapper').hasClass('history')) {
    $('#wiki-history td.checkbox input').each(function() {
      $(this).click(function() {
        nodeSelector.checkNode($(this));
      });
      if ( $(this).is(':checked') ) {
        nodeSelector.checkNode($(this));
      }
    });

    if ($('.history a.action-compare-revision').length) {
      $('.history a.action-compare-revision').click(function() {
        $("#version-form").submit();
      });
    }
  }

  if ($('#searchbar a#search-submit').length) {
    $.GollumPlaceholder.add($('#searchbar #search-query'));
    $('#searchbar a#search-submit').click(function(e) {
      e.preventDefault();
      $('#searchbar #search-form')[0].submit();
    });
    $('#searchbar #search-form').submit(function(e) {
      $.GollumPlaceholder.clearAll();
      $(this).unbind('submit');
      $(this).submit();
    });
  }

  if ($('#gollum-revert-form').length &&
      $('.gollum-revert-button').length ) {
    $('a.gollum-revert-button').click(function(e) {
      e.preventDefault();
      $('#gollum-revert-form').submit();
    });
  }
});
