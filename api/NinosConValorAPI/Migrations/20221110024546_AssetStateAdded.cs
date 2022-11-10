using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace NinosConValorAPI.Migrations
{
    public partial class AssetStateAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssetStateId",
                table: "FixedAsset",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AssetState",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    State = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetState", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FixedAsset_AssetStateId",
                table: "FixedAsset",
                column: "AssetStateId");

            migrationBuilder.AddForeignKey(
                name: "FK_FixedAsset_AssetState_AssetStateId",
                table: "FixedAsset",
                column: "AssetStateId",
                principalTable: "AssetState",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FixedAsset_AssetState_AssetStateId",
                table: "FixedAsset");

            migrationBuilder.DropTable(
                name: "AssetState");

            migrationBuilder.DropIndex(
                name: "IX_FixedAsset_AssetStateId",
                table: "FixedAsset");

            migrationBuilder.DropColumn(
                name: "AssetStateId",
                table: "FixedAsset");
        }
    }
}
