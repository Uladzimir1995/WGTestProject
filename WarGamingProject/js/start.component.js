// Код написан на чистом JS не используя различные фреймворки

var optionValue = 0;
var searchValue = '';

$(function () {

    showFirstContent();
    showOnInitTaskTwo();
    initCheckboxes();

    $('#saveButton').click(function () {
        deleteHighRows();
        $('.chossen_block_low').each(function (index) {
            addHighRow(this);
        });
        setCount();
    });


    $('#search_input').on('input', function () {
        searchValue = $(this).val();
        optionValue = Number($("option:selected").val());
        filter();
    });

    $('#select').on('change', (function () {
        optionValue = Number($(this).children("option:selected").val());
        searchValue = $('#search_input').val();
        filter();
    }));


    $(".checkBoxCheck").change(function () {
        if (this.checked) {
            addRow(this);
            if ($(".checkBoxCheck:checked").length >= 3) {
                $(".checkBoxCheck:checkbox:not(:checked)").attr("disabled", true);
            }
        } else {
            var id = this.id;
            id = id.substr(10, id.length);
            var closeElement = document.getElementById("imageCloseId" + id);
            close(closeElement);
        }
    });

    $('#leftBlock').click(function () {
        $('#leftBlock').hide();
        $('#rightBlock').show();
    });


    $('.menu_block').click(function () {
        $('.image_menu').removeClass('active_image_choose');
        $('.menu_text3').removeClass('active_text_choose');
        $(this.getElementsByTagName('img')).addClass('active_image_choose');
        $(this.getElementsByTagName('span')).addClass('active_text_choose');
        $("#textChoser").html(this.innerText);
        $('#leftBlock').show();
        $('#rightBlock').hide();
    });


    $('li').click(function () {
        $(this).addClass('active')
            .siblings()
            .removeClass('active');
    });

    $('.texting').click(function () {
        $('.texting').removeClass('active_back_text');
        $(this).addClass('active_back_text');
    });


    $('#task1').click(function () {
        showFirstContent();
    });

    $('#task2').click(function () {
        showSecondContent();
    });

    $('#task3').click(function () {
        showThirdContent();
    });

    $('#task4').click(function () {
        showFourthContent();
    });


});

function setCount() {
    var length = $('.chossen_block_high').length;
    $('#numberId').text(length);
}

function filter() {
    $(".element_row").each(function (index) {
        var id = this.id.substring(11, this.id.length);
        var text = this.textContent;
        if (text.indexOf(searchValue) == -1 || Number(id) <= optionValue) {
            $(this).hide()
        } else {
            $(this).show();
        }
    });
}

function deleteHighRows() {
    var parent = document.getElementById("choosed_row_high");
    var elements = document.getElementsByClassName('chossen_block_high');
    var ids = [];

    for (var i = 0; i < elements.length; i++) {
        ids.push(elements[i].id)
    }
    for (var j = 0; j < ids.length; j++) {
        parent.removeChild(document.getElementById(ids[j]));
    }
}

function closeHigh() {
    var parent = document.getElementById('choosed_row_high');

    var id = this.id;
    id = id.substring(16, id.length);
    var remove = document.getElementById('highDiv' + id);
    parent.removeChild(remove);

    setCount();

}

function addHighRow(item) {
    var parent = document.getElementById("choosed_row_high");

    var id = item.id;
    id = id.substr(6, id.length);

    var parentDiv = document.createElement('div');
    parentDiv.classList.add('chossen_block', 'chossen_block_high');
    parentDiv.id = "highDiv" + id;

    var span = document.createElement('span');
    span.className = 'choosed_text';

    span.appendChild(document.createTextNode(item.textContent));
    parentDiv.appendChild(span);

    var colorDiv = document.createElement('div');
    colorDiv.className = 'color';

    parentDiv.appendChild(colorDiv);

    var picDiv = document.createElement('div');
    picDiv.className = 'pic_block';

    var img = document.createElement('img');
    img.classList.add('place', 'search_pic');
    img.src = './images/close2.png';
    img.alt = 'X';
    img.id = 'highImageCloseId' + id;
    img.onclick = closeHigh;

    picDiv.appendChild(img);

    parentDiv.appendChild(picDiv);

    parent.appendChild(parentDiv);
}

function addRow(item) {
    var parent = document.getElementById("choosed_row_low");

    var id = item.id;
    id = id.substr(10, id.length);

    var parentDiv = document.createElement('div');
    parentDiv.classList.add('chossen_block', 'chossen_block_low');
    parentDiv.id = "lowDiv" + id;

    var span = document.createElement('span');
    span.className = 'choosed_text';

    var text = document.getElementById('textId' + id).textContent;
    span.appendChild(document.createTextNode(text));
    parentDiv.appendChild(span);

    var colorDiv = document.createElement('div');
    colorDiv.className = 'color';

    parentDiv.appendChild(colorDiv);

    var picDiv = document.createElement('div');
    picDiv.className = 'pic_block';

    var img = document.createElement('img');
    img.classList.add('place', 'search_pic');
    img.src = './images/close2.png';
    img.alt = 'X';
    img.id = 'imageCloseId' + id;
    img.onclick = close;

    picDiv.appendChild(img);

    parentDiv.appendChild(picDiv);

    parent.appendChild(parentDiv);
}

function close(closeElement) {
    var parent = document.getElementById('choosed_row_low');
    var id;
    var remove;
    if (!(closeElement instanceof MouseEvent)) {
        id = closeElement.id;
    } else {
        id = this.id;
    }
    id = id.substr(12, id.length);
    remove = document.getElementById('lowDiv' + id);
    parent.removeChild(remove);

    var checkBox = document.getElementById('checkboxId' + id);
    checkBox.checked = false;

    if ($(".checkBoxCheck:checked").length < 3) {
        $(".checkBoxCheck").removeAttr("disabled");
    }

}

function initCheckboxes() {
    var parent = document.getElementById("black_block_inside");
    for (var i = 1; i < 301; i++) {

        var parentDiv = document.createElement('div');
        parentDiv.className = "element_row";
        parentDiv.id = "element_row" + i;

        var checkbox = document.createElement('input');
        var id = "checkboxId" + i;
        checkbox.type = "checkbox";
        checkbox.name = "name" + i;
        checkbox.id = id;
        checkbox.className = "checkBoxCheck";

        var childDiv = document.createElement('div');
        childDiv.className = 'element_text';
        childDiv.id = "textId" + i;

        var text = document.createTextNode('Элемент ' + i);
        childDiv.appendChild(text);
        parentDiv.appendChild(checkbox);
        parentDiv.appendChild(childDiv);

        parent.appendChild(parentDiv);
    }

}

function showOnInitTaskTwo() {
    $('#rightBlock').hide();
}

function showFirstContent() {
    $('#task1Content').show();
    $('#task2Content').hide();
    $('#task3Content').hide();
    $('#task4Content').hide();
}

function showSecondContent() {
    $('#task1Content').hide();
    $('#task2Content').show();
    $('#task3Content').hide();
    $('#task4Content').hide();
}

function showThirdContent() {
    $('#task1Content').hide();
    $('#task2Content').hide();
    $('#task3Content').show();
    $('#task4Content').hide();
}

function showFourthContent() {
    $('#task1Content').hide();
    $('#task2Content').hide();
    $('#task3Content').hide();
    $('#task4Content').show();
}


document.getElementById('search_rud_btn').addEventListener('click',
    function() {
        document.querySelector('.grey_black_block').style.display = 'block';
    });

document.getElementById('close_pic_img').addEventListener('click',
    function() {
        document.querySelector('.grey_black_block').style.display = 'none';
    });
