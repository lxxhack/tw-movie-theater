/**
 * Created by ashui on 17-8-2.
 */
`use stict`
function addRecommendSql(id) {
    $.ajax({
        type: 'GET',
        url: "/movies/",
        data: Id,
        success: function(data) {
            addRecommend(data);
        }
    }).error(function(data) {
        getFailed(data);
    })
}
function addRecommend(data) {
    $("#row1").append()
}