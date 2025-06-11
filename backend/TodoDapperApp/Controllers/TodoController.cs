using Microsoft.AspNetCore.Mvc;
using Dapper;
using TodoDapperApp.Models;
using TodoDapperApp.Data;

namespace TodoDapperApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly DapperContext _context;

    public TodoController(DapperContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var sql = "SELECT * FROM TodoTasks";
        using var connection = _context.CreateConnection();
        var tasks = await connection.QueryAsync<TodoTask>(sql);
        return Ok(tasks);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TodoTask task)
    {
        var sql = "INSERT INTO TodoTasks (Title, IsComplete) VALUES (@Title, @IsComplete)";
        using var connection = _context.CreateConnection();
        var result = await connection.ExecuteAsync(sql, task);
        return result > 0 ? Ok() : BadRequest();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] TodoTask updatedTask)
    {
        var sql = "UPDATE TodoTasks SET Title = @Title, IsComplete = @IsComplete WHERE Id = @Id";
        using var connection = _context.CreateConnection();
        var result = await connection.ExecuteAsync(sql, new { updatedTask.Title, updatedTask.IsComplete, Id = id });
        return result > 0 ? Ok() : NotFound();
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Patch(int id, [FromBody] TodoUpdateDto updateDto)
    {
        if (updateDto.Title == null && updateDto.IsComplete == null)
            return BadRequest("Nothing to update.");

        var sqlParts = new List<string>();
        var parameters = new DynamicParameters();
        parameters.Add("Id", id);

        if (updateDto.Title != null)
        {
            sqlParts.Add("Title = @Title");
            parameters.Add("Title", updateDto.Title);
        }

        if (updateDto.IsComplete != null)
        {
            sqlParts.Add("IsComplete = @IsComplete");
            parameters.Add("IsComplete", updateDto.IsComplete);
        }

        var sql = $"UPDATE TodoTasks SET {string.Join(", ", sqlParts)} WHERE Id = @Id";

        using var connection = _context.CreateConnection();
        var result = await connection.ExecuteAsync(sql, parameters);
        return result > 0 ? Ok() : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var sql = "DELETE FROM TodoTasks WHERE Id = @Id";
        using var connection = _context.CreateConnection();
        var result = await connection.ExecuteAsync(sql, new { Id = id });
        return result > 0 ? Ok() : NotFound();
    }
}
