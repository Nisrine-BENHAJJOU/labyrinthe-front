#include "httplib.h"
#include <vector>
#include <queue>

std::vector<std::vector<int>> grid;
int rows = 20, cols = 20;

void dfs(int row, int col, int end_row, int end_col) {
  // DFS logic to traverse and update the grid
}

int main() {
  httplib::Server svr;

  svr.Post("/dfs", [](const httplib::Request& req, httplib::Response& res) {
    auto start = /* parse start position from req.body */;
    auto end = /* parse end position from req.body */;

    dfs(start.row, start.col, end.row, end.col);

    res.set_content(/* return updated grid as JSON */, "application/json");
  });

  svr.listen("localhost", 8080);
  return 0;
}
