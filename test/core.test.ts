import { assertEquals } from "jsr:@std/assert";
import { Modes } from "../src/core/constants.ts";
import { capacities } from "../src/core/capacity.ts";

Deno.test("capacities - version 1", () => {
  assertEquals(capacities[1]["L"][Modes.Numeric], 41);
  assertEquals(capacities[1]["L"][Modes.Alphanumeric], 25);
  assertEquals(capacities[1]["L"][Modes.Byte], 17);
  assertEquals(capacities[1]["L"][Modes.Kanji], 10);

  assertEquals(capacities[1]["M"][Modes.Numeric], 34);
  assertEquals(capacities[1]["M"][Modes.Alphanumeric], 20);
  assertEquals(capacities[1]["M"][Modes.Byte], 14);
  assertEquals(capacities[1]["M"][Modes.Kanji], 8);

  assertEquals(capacities[1]["Q"][Modes.Numeric], 27);
  assertEquals(capacities[1]["Q"][Modes.Alphanumeric], 16);
  assertEquals(capacities[1]["Q"][Modes.Byte], 11);
  assertEquals(capacities[1]["Q"][Modes.Kanji], 7);

  assertEquals(capacities[1]["H"][Modes.Numeric], 17);
  assertEquals(capacities[1]["H"][Modes.Alphanumeric], 10);
  assertEquals(capacities[1]["H"][Modes.Byte], 7);
  assertEquals(capacities[1]["H"][Modes.Kanji], 4);
});

Deno.test("capacities - version 2", () => {
  assertEquals(capacities[2]["L"][Modes.Numeric], 77);
  assertEquals(capacities[2]["L"][Modes.Alphanumeric], 47);
  assertEquals(capacities[2]["L"][Modes.Byte], 32);
  assertEquals(capacities[2]["L"][Modes.Kanji], 20);

  assertEquals(capacities[2]["M"][Modes.Numeric], 63);
  assertEquals(capacities[2]["M"][Modes.Alphanumeric], 38);
  assertEquals(capacities[2]["M"][Modes.Byte], 26);
  assertEquals(capacities[2]["M"][Modes.Kanji], 16);

  assertEquals(capacities[2]["Q"][Modes.Numeric], 48);
  assertEquals(capacities[2]["Q"][Modes.Alphanumeric],29);
  assertEquals(capacities[2]["Q"][Modes.Byte], 20);
  assertEquals(capacities[2]["Q"][Modes.Kanji], 12);

  assertEquals(capacities[2]["H"][Modes.Numeric], 34);
  assertEquals(capacities[2]["H"][Modes.Alphanumeric], 20);
  assertEquals(capacities[2]["H"][Modes.Byte], 14);
  assertEquals(capacities[2]["H"][Modes.Kanji], 8);
});

Deno.test("capacities - version 3", () => {
  assertEquals(capacities[3]["L"][Modes.Numeric], 127);
  assertEquals(capacities[3]["L"][Modes.Alphanumeric], 77);
  assertEquals(capacities[3]["L"][Modes.Byte], 53);
  assertEquals(capacities[3]["L"][Modes.Kanji], 32);

  assertEquals(capacities[3]["M"][Modes.Numeric], 101);
  assertEquals(capacities[3]["M"][Modes.Alphanumeric], 61);
  assertEquals(capacities[3]["M"][Modes.Byte], 42);
  assertEquals(capacities[3]["M"][Modes.Kanji], 26);

  assertEquals(capacities[3]["Q"][Modes.Numeric], 77);
  assertEquals(capacities[3]["Q"][Modes.Alphanumeric], 47);
  assertEquals(capacities[3]["Q"][Modes.Byte], 32);
  assertEquals(capacities[3]["Q"][Modes.Kanji], 20);

  assertEquals(capacities[3]["H"][Modes.Numeric], 58);
  assertEquals(capacities[3]["H"][Modes.Alphanumeric], 35);
  assertEquals(capacities[3]["H"][Modes.Byte], 24);
  assertEquals(capacities[3]["H"][Modes.Kanji], 15);
});

Deno.test("capacities - version 4", () => {
  assertEquals(capacities[4]["L"][Modes.Numeric], 187);
  assertEquals(capacities[4]["L"][Modes.Alphanumeric], 114);
  assertEquals(capacities[4]["L"][Modes.Byte], 78);
  assertEquals(capacities[4]["L"][Modes.Kanji], 48);

  assertEquals(capacities[4]["M"][Modes.Numeric], 149);
  assertEquals(capacities[4]["M"][Modes.Alphanumeric], 90);
  assertEquals(capacities[4]["M"][Modes.Byte], 62);
  assertEquals(capacities[4]["M"][Modes.Kanji], 38);

  assertEquals(capacities[4]["Q"][Modes.Numeric], 111);
  assertEquals(capacities[4]["Q"][Modes.Alphanumeric], 67);
  assertEquals(capacities[4]["Q"][Modes.Byte], 46);
  assertEquals(capacities[4]["Q"][Modes.Kanji], 28);

  assertEquals(capacities[4]["H"][Modes.Numeric], 82);
  assertEquals(capacities[4]["H"][Modes.Alphanumeric], 50);
  assertEquals(capacities[4]["H"][Modes.Byte], 34);
  assertEquals(capacities[4]["H"][Modes.Kanji], 21);
});

Deno.test("capacities - version 5", () => {
  assertEquals(capacities[5]["L"][Modes.Numeric], 255);
  assertEquals(capacities[5]["L"][Modes.Alphanumeric], 154);
  assertEquals(capacities[5]["L"][Modes.Byte], 106);
  assertEquals(capacities[5]["L"][Modes.Kanji], 65);

  assertEquals(capacities[5]["M"][Modes.Numeric], 202);
  assertEquals(capacities[5]["M"][Modes.Alphanumeric], 122);
  assertEquals(capacities[5]["M"][Modes.Byte], 84);
  assertEquals(capacities[5]["M"][Modes.Kanji], 52);

  assertEquals(capacities[5]["Q"][Modes.Numeric], 144);
  assertEquals(capacities[5]["Q"][Modes.Alphanumeric], 87);
  assertEquals(capacities[5]["Q"][Modes.Byte], 60);
  assertEquals(capacities[5]["Q"][Modes.Kanji], 37);

  assertEquals(capacities[5]["H"][Modes.Numeric], 106);
  assertEquals(capacities[5]["H"][Modes.Alphanumeric], 64);
  assertEquals(capacities[5]["H"][Modes.Byte], 44);
  assertEquals(capacities[5]["H"][Modes.Kanji], 27);
});

Deno.test("capacities - version 6", () => {
  assertEquals(capacities[6]["L"][Modes.Numeric], 322);
  assertEquals(capacities[6]["L"][Modes.Alphanumeric], 195);
  assertEquals(capacities[6]["L"][Modes.Byte], 134);
  assertEquals(capacities[6]["L"][Modes.Kanji], 82);

  assertEquals(capacities[6]["M"][Modes.Numeric], 255);
  assertEquals(capacities[6]["M"][Modes.Alphanumeric], 154);
  assertEquals(capacities[6]["M"][Modes.Byte], 106);
  assertEquals(capacities[6]["M"][Modes.Kanji], 65);

  assertEquals(capacities[6]["Q"][Modes.Numeric], 178);
  assertEquals(capacities[6]["Q"][Modes.Alphanumeric], 108);
  assertEquals(capacities[6]["Q"][Modes.Byte], 74);
  assertEquals(capacities[6]["Q"][Modes.Kanji], 45);

  assertEquals(capacities[6]["H"][Modes.Numeric], 139);
  assertEquals(capacities[6]["H"][Modes.Alphanumeric], 84);
  assertEquals(capacities[6]["H"][Modes.Byte], 58);
  assertEquals(capacities[6]["H"][Modes.Kanji], 36);
});

Deno.test("capacities - version 7", () => {
  assertEquals(capacities[7]["L"][Modes.Numeric], 370);
  assertEquals(capacities[7]["L"][Modes.Alphanumeric], 224);
  assertEquals(capacities[7]["L"][Modes.Byte], 154);
  assertEquals(capacities[7]["L"][Modes.Kanji], 95);

  assertEquals(capacities[7]["M"][Modes.Numeric], 293);
  assertEquals(capacities[7]["M"][Modes.Alphanumeric], 178);
  assertEquals(capacities[7]["M"][Modes.Byte], 122);
  assertEquals(capacities[7]["M"][Modes.Kanji], 75);

  assertEquals(capacities[7]["Q"][Modes.Numeric], 207);
  assertEquals(capacities[7]["Q"][Modes.Alphanumeric], 125);
  assertEquals(capacities[7]["Q"][Modes.Byte], 86);
  assertEquals(capacities[7]["Q"][Modes.Kanji], 53);

  assertEquals(capacities[7]["H"][Modes.Numeric], 154);
  assertEquals(capacities[7]["H"][Modes.Alphanumeric], 93);
  assertEquals(capacities[7]["H"][Modes.Byte], 64);
  assertEquals(capacities[7]["H"][Modes.Kanji], 39);
});

Deno.test("capacities - version 8", () => {
  assertEquals(capacities[8]["L"][Modes.Numeric], 461);
  assertEquals(capacities[8]["L"][Modes.Alphanumeric], 279);
  assertEquals(capacities[8]["L"][Modes.Byte], 192);
  assertEquals(capacities[8]["L"][Modes.Kanji], 118);

  assertEquals(capacities[8]["M"][Modes.Numeric], 365);
  assertEquals(capacities[8]["M"][Modes.Alphanumeric], 221);
  assertEquals(capacities[8]["M"][Modes.Byte], 152);
  assertEquals(capacities[8]["M"][Modes.Kanji], 93);

  assertEquals(capacities[8]["Q"][Modes.Numeric], 259);
  assertEquals(capacities[8]["Q"][Modes.Alphanumeric], 157);
  assertEquals(capacities[8]["Q"][Modes.Byte], 108);
  assertEquals(capacities[8]["Q"][Modes.Kanji], 66);

  assertEquals(capacities[8]["H"][Modes.Numeric], 202);
  assertEquals(capacities[8]["H"][Modes.Alphanumeric], 122);
  assertEquals(capacities[8]["H"][Modes.Byte], 84);
  assertEquals(capacities[8]["H"][Modes.Kanji], 52);
});

Deno.test("capacities - version 9", () => {
  assertEquals(capacities[9]["L"][Modes.Numeric], 552);
  assertEquals(capacities[9]["L"][Modes.Alphanumeric], 335);
  assertEquals(capacities[9]["L"][Modes.Byte], 230);
  assertEquals(capacities[9]["L"][Modes.Kanji], 141);

  assertEquals(capacities[9]["M"][Modes.Numeric], 432);
  assertEquals(capacities[9]["M"][Modes.Alphanumeric], 262);
  assertEquals(capacities[9]["M"][Modes.Byte], 180);
  assertEquals(capacities[9]["M"][Modes.Kanji], 111);

  assertEquals(capacities[9]["Q"][Modes.Numeric], 312);
  assertEquals(capacities[9]["Q"][Modes.Alphanumeric], 189);
  assertEquals(capacities[9]["Q"][Modes.Byte], 130);
  assertEquals(capacities[9]["Q"][Modes.Kanji], 80);

  assertEquals(capacities[9]["H"][Modes.Numeric], 235);
  assertEquals(capacities[9]["H"][Modes.Alphanumeric], 143);
  assertEquals(capacities[9]["H"][Modes.Byte], 98);
  assertEquals(capacities[9]["H"][Modes.Kanji], 60);
});

Deno.test("capacities - version 10", () => {
  assertEquals(capacities[10]["L"][Modes.Numeric], 652);
  assertEquals(capacities[10]["L"][Modes.Alphanumeric], 395);
  assertEquals(capacities[10]["L"][Modes.Byte], 271);
  assertEquals(capacities[10]["L"][Modes.Kanji], 167);

  assertEquals(capacities[10]["M"][Modes.Numeric], 513);
  assertEquals(capacities[10]["M"][Modes.Alphanumeric], 311);
  assertEquals(capacities[10]["M"][Modes.Byte], 213);
  assertEquals(capacities[10]["M"][Modes.Kanji], 131);

  assertEquals(capacities[10]["Q"][Modes.Numeric], 364);
  assertEquals(capacities[10]["Q"][Modes.Alphanumeric], 221);
  assertEquals(capacities[10]["Q"][Modes.Byte], 151);
  assertEquals(capacities[10]["Q"][Modes.Kanji], 93);

  assertEquals(capacities[10]["H"][Modes.Numeric], 288);
  assertEquals(capacities[10]["H"][Modes.Alphanumeric], 174);
  assertEquals(capacities[10]["H"][Modes.Byte], 119);
  assertEquals(capacities[10]["H"][Modes.Kanji], 74);
});

Deno.test("capacities - version 11", () => {
  assertEquals(capacities[11]["L"][Modes.Numeric], 772);
  assertEquals(capacities[11]["L"][Modes.Alphanumeric], 468);
  assertEquals(capacities[11]["L"][Modes.Byte], 321);
  assertEquals(capacities[11]["L"][Modes.Kanji], 198);

  assertEquals(capacities[11]["M"][Modes.Numeric], 604);
  assertEquals(capacities[11]["M"][Modes.Alphanumeric], 366);
  assertEquals(capacities[11]["M"][Modes.Byte], 251);
  assertEquals(capacities[11]["M"][Modes.Kanji], 155);

  assertEquals(capacities[11]["Q"][Modes.Numeric], 427);
  assertEquals(capacities[11]["Q"][Modes.Alphanumeric], 259);
  assertEquals(capacities[11]["Q"][Modes.Byte], 177);
  assertEquals(capacities[11]["Q"][Modes.Kanji], 109);

  assertEquals(capacities[11]["H"][Modes.Numeric], 331);
  assertEquals(capacities[11]["H"][Modes.Alphanumeric], 200);
  assertEquals(capacities[11]["H"][Modes.Byte], 137);
  assertEquals(capacities[11]["H"][Modes.Kanji], 85);
});

Deno.test("capacities - version 12", () => {
  assertEquals(capacities[12]["L"][Modes.Numeric], 883);
  assertEquals(capacities[12]["L"][Modes.Alphanumeric], 535);
  assertEquals(capacities[12]["L"][Modes.Byte], 367);
  assertEquals(capacities[12]["L"][Modes.Kanji], 226);

  assertEquals(capacities[12]["M"][Modes.Numeric], 691);
  assertEquals(capacities[12]["M"][Modes.Alphanumeric], 419);
  assertEquals(capacities[12]["M"][Modes.Byte], 287);
  assertEquals(capacities[12]["M"][Modes.Kanji], 177);

  assertEquals(capacities[12]["Q"][Modes.Numeric], 489);
  assertEquals(capacities[12]["Q"][Modes.Alphanumeric], 296);
  assertEquals(capacities[12]["Q"][Modes.Byte], 203);
  assertEquals(capacities[12]["Q"][Modes.Kanji], 125);

  assertEquals(capacities[12]["H"][Modes.Numeric], 374);
  assertEquals(capacities[12]["H"][Modes.Alphanumeric], 227);
  assertEquals(capacities[12]["H"][Modes.Byte], 155);
  assertEquals(capacities[12]["H"][Modes.Kanji], 96);
});

Deno.test("capacities - version 13", () => {
  assertEquals(capacities[13]["L"][Modes.Numeric], 1022);
  assertEquals(capacities[13]["L"][Modes.Alphanumeric], 619);
  assertEquals(capacities[13]["L"][Modes.Byte], 425);
  assertEquals(capacities[13]["L"][Modes.Kanji], 262);

  assertEquals(capacities[13]["M"][Modes.Numeric], 796);
  assertEquals(capacities[13]["M"][Modes.Alphanumeric], 483);
  assertEquals(capacities[13]["M"][Modes.Byte], 331);
  assertEquals(capacities[13]["M"][Modes.Kanji], 204);

  assertEquals(capacities[13]["Q"][Modes.Numeric], 580);
  assertEquals(capacities[13]["Q"][Modes.Alphanumeric], 352);
  assertEquals(capacities[13]["Q"][Modes.Byte], 241);
  assertEquals(capacities[13]["Q"][Modes.Kanji], 149);

  assertEquals(capacities[13]["H"][Modes.Numeric], 427);
  assertEquals(capacities[13]["H"][Modes.Alphanumeric], 259);
  assertEquals(capacities[13]["H"][Modes.Byte], 177);
  assertEquals(capacities[13]["H"][Modes.Kanji], 109);
});

Deno.test("capacities - version 14", () => {
  assertEquals(capacities[14]["L"][Modes.Numeric], 1101);
  assertEquals(capacities[14]["L"][Modes.Alphanumeric], 667);
  assertEquals(capacities[14]["L"][Modes.Byte], 458);
  assertEquals(capacities[14]["L"][Modes.Kanji], 282);

  assertEquals(capacities[14]["M"][Modes.Numeric], 871);
  assertEquals(capacities[14]["M"][Modes.Alphanumeric], 528);
  assertEquals(capacities[14]["M"][Modes.Byte], 362);
  assertEquals(capacities[14]["M"][Modes.Kanji], 223);

  assertEquals(capacities[14]["Q"][Modes.Numeric], 621);
  assertEquals(capacities[14]["Q"][Modes.Alphanumeric], 376);
  assertEquals(capacities[14]["Q"][Modes.Byte], 258);
  assertEquals(capacities[14]["Q"][Modes.Kanji], 159);

  assertEquals(capacities[14]["H"][Modes.Numeric], 468);
  assertEquals(capacities[14]["H"][Modes.Alphanumeric], 283);
  assertEquals(capacities[14]["H"][Modes.Byte], 194);
  assertEquals(capacities[14]["H"][Modes.Kanji], 120);
});

Deno.test("capacities - version 15", () => {
  assertEquals(capacities[15]["L"][Modes.Numeric], 1250);
  assertEquals(capacities[15]["L"][Modes.Alphanumeric], 758);
  assertEquals(capacities[15]["L"][Modes.Byte], 520);
  assertEquals(capacities[15]["L"][Modes.Kanji], 320);

  assertEquals(capacities[15]["M"][Modes.Numeric], 991);
  assertEquals(capacities[15]["M"][Modes.Alphanumeric], 600);
  assertEquals(capacities[15]["M"][Modes.Byte], 412);
  assertEquals(capacities[15]["M"][Modes.Kanji], 254);

  assertEquals(capacities[15]["Q"][Modes.Numeric], 703);
  assertEquals(capacities[15]["Q"][Modes.Alphanumeric], 426);
  assertEquals(capacities[15]["Q"][Modes.Byte], 292);
  assertEquals(capacities[15]["Q"][Modes.Kanji], 180);

  assertEquals(capacities[15]["H"][Modes.Numeric], 530);
  assertEquals(capacities[15]["H"][Modes.Alphanumeric], 321);
  assertEquals(capacities[15]["H"][Modes.Byte], 220);
  assertEquals(capacities[15]["H"][Modes.Kanji], 136);
});

Deno.test("capacities - version 16", () => {
  assertEquals(capacities[16]["L"][Modes.Numeric], 1408);
  assertEquals(capacities[16]["L"][Modes.Alphanumeric], 854);
  assertEquals(capacities[16]["L"][Modes.Byte], 586);
  assertEquals(capacities[16]["L"][Modes.Kanji], 361);

  assertEquals(capacities[16]["M"][Modes.Numeric], 1082);
  assertEquals(capacities[16]["M"][Modes.Alphanumeric], 656);
  assertEquals(capacities[16]["M"][Modes.Byte], 450);
  assertEquals(capacities[16]["M"][Modes.Kanji], 277);

  assertEquals(capacities[16]["Q"][Modes.Numeric], 775);
  assertEquals(capacities[16]["Q"][Modes.Alphanumeric], 470);
  assertEquals(capacities[16]["Q"][Modes.Byte], 322);
  assertEquals(capacities[16]["Q"][Modes.Kanji], 198);

  assertEquals(capacities[16]["H"][Modes.Numeric], 602);
  assertEquals(capacities[16]["H"][Modes.Alphanumeric], 365);
  assertEquals(capacities[16]["H"][Modes.Byte], 250);
  assertEquals(capacities[16]["H"][Modes.Kanji], 154);
});

Deno.test("capacities - version 17", () => {
  assertEquals(capacities[17]["L"][Modes.Numeric], 1548);
  assertEquals(capacities[17]["L"][Modes.Alphanumeric], 938);
  assertEquals(capacities[17]["L"][Modes.Byte], 644);
  assertEquals(capacities[17]["L"][Modes.Kanji], 397);

  assertEquals(capacities[17]["M"][Modes.Numeric], 1212);
  assertEquals(capacities[17]["M"][Modes.Alphanumeric], 734);
  assertEquals(capacities[17]["M"][Modes.Byte], 504);
  assertEquals(capacities[17]["M"][Modes.Kanji], 310);

  assertEquals(capacities[17]["Q"][Modes.Numeric], 876);
  assertEquals(capacities[17]["Q"][Modes.Alphanumeric], 531);
  assertEquals(capacities[17]["Q"][Modes.Byte], 364);
  assertEquals(capacities[17]["Q"][Modes.Kanji], 224);

  assertEquals(capacities[17]["H"][Modes.Numeric], 674);
  assertEquals(capacities[17]["H"][Modes.Alphanumeric], 408);
  assertEquals(capacities[17]["H"][Modes.Byte], 280);
  assertEquals(capacities[17]["H"][Modes.Kanji], 173);
});

Deno.test("capacities - version 18", () => {
  assertEquals(capacities[18]["L"][Modes.Numeric], 1725);
  assertEquals(capacities[18]["L"][Modes.Alphanumeric], 1046);
  assertEquals(capacities[18]["L"][Modes.Byte], 718);
  assertEquals(capacities[18]["L"][Modes.Kanji], 442);

  assertEquals(capacities[18]["M"][Modes.Numeric], 1346);
  assertEquals(capacities[18]["M"][Modes.Alphanumeric], 816);
  assertEquals(capacities[18]["M"][Modes.Byte], 560);
  assertEquals(capacities[18]["M"][Modes.Kanji], 345);

  assertEquals(capacities[18]["Q"][Modes.Numeric], 948);
  assertEquals(capacities[18]["Q"][Modes.Alphanumeric], 574);
  assertEquals(capacities[18]["Q"][Modes.Byte], 394);
  assertEquals(capacities[18]["Q"][Modes.Kanji], 243);

  assertEquals(capacities[18]["H"][Modes.Numeric], 746);
  assertEquals(capacities[18]["H"][Modes.Alphanumeric], 452);
  assertEquals(capacities[18]["H"][Modes.Byte], 310);
  assertEquals(capacities[18]["H"][Modes.Kanji], 191);
});

Deno.test("capacities - version 19", () => {
  assertEquals(capacities[19]["L"][Modes.Numeric], 1903);
  assertEquals(capacities[19]["L"][Modes.Alphanumeric], 1153);
  assertEquals(capacities[19]["L"][Modes.Byte], 792);
  assertEquals(capacities[19]["L"][Modes.Kanji], 488);

  assertEquals(capacities[19]["M"][Modes.Numeric], 1500);
  assertEquals(capacities[19]["M"][Modes.Alphanumeric], 909);
  assertEquals(capacities[19]["M"][Modes.Byte], 624);
  assertEquals(capacities[19]["M"][Modes.Kanji], 384);

  assertEquals(capacities[19]["Q"][Modes.Numeric], 1063);
  assertEquals(capacities[19]["Q"][Modes.Alphanumeric], 644);
  assertEquals(capacities[19]["Q"][Modes.Byte], 442);
  assertEquals(capacities[19]["Q"][Modes.Kanji], 272);

  assertEquals(capacities[19]["H"][Modes.Numeric], 813);
  assertEquals(capacities[19]["H"][Modes.Alphanumeric], 493);
  assertEquals(capacities[19]["H"][Modes.Byte], 338);
  assertEquals(capacities[19]["H"][Modes.Kanji], 208);
});

Deno.test("capacities - version 20", () => {
  assertEquals(capacities[20]["L"][Modes.Numeric], 2061);
  assertEquals(capacities[20]["L"][Modes.Alphanumeric], 1249);
  assertEquals(capacities[20]["L"][Modes.Byte], 858);
  assertEquals(capacities[20]["L"][Modes.Kanji], 528);

  assertEquals(capacities[20]["M"][Modes.Numeric], 1600);
  assertEquals(capacities[20]["M"][Modes.Alphanumeric], 970);
  assertEquals(capacities[20]["M"][Modes.Byte], 666);
  assertEquals(capacities[20]["M"][Modes.Kanji], 410);

  assertEquals(capacities[20]["Q"][Modes.Numeric], 1159);
  assertEquals(capacities[20]["Q"][Modes.Alphanumeric], 702);
  assertEquals(capacities[20]["Q"][Modes.Byte], 482);
  assertEquals(capacities[20]["Q"][Modes.Kanji], 297);

  assertEquals(capacities[20]["H"][Modes.Numeric], 919);
  assertEquals(capacities[20]["H"][Modes.Alphanumeric], 557);
  assertEquals(capacities[20]["H"][Modes.Byte], 382);
  assertEquals(capacities[20]["H"][Modes.Kanji], 235);
});

Deno.test("capacities - version 21", () => {
  assertEquals(capacities[21]["L"][Modes.Numeric], 2232);
  assertEquals(capacities[21]["L"][Modes.Alphanumeric], 1352);
  assertEquals(capacities[21]["L"][Modes.Byte], 929);
  assertEquals(capacities[21]["L"][Modes.Kanji], 572);

  assertEquals(capacities[21]["M"][Modes.Numeric], 1708);
  assertEquals(capacities[21]["M"][Modes.Alphanumeric], 1035);
  assertEquals(capacities[21]["M"][Modes.Byte], 711);
  assertEquals(capacities[21]["M"][Modes.Kanji], 438);

  assertEquals(capacities[21]["Q"][Modes.Numeric], 1224);
  assertEquals(capacities[21]["Q"][Modes.Alphanumeric], 742);
  assertEquals(capacities[21]["Q"][Modes.Byte], 509);
  assertEquals(capacities[21]["Q"][Modes.Kanji], 314);

  assertEquals(capacities[21]["H"][Modes.Numeric], 969);
  assertEquals(capacities[21]["H"][Modes.Alphanumeric], 587);
  assertEquals(capacities[21]["H"][Modes.Byte], 403);
  assertEquals(capacities[21]["H"][Modes.Kanji], 248);
});

Deno.test("capacities - version 22", () => {
  assertEquals(capacities[22]["L"][Modes.Numeric], 2409);
  assertEquals(capacities[22]["L"][Modes.Alphanumeric], 1460);
  assertEquals(capacities[22]["L"][Modes.Byte], 1003);
  assertEquals(capacities[22]["L"][Modes.Kanji], 618);

  assertEquals(capacities[22]["M"][Modes.Numeric], 1872);
  assertEquals(capacities[22]["M"][Modes.Alphanumeric], 1134);
  assertEquals(capacities[22]["M"][Modes.Byte], 779);
  assertEquals(capacities[22]["M"][Modes.Kanji], 480);

  assertEquals(capacities[22]["Q"][Modes.Numeric], 1358);
  assertEquals(capacities[22]["Q"][Modes.Alphanumeric], 823);
  assertEquals(capacities[22]["Q"][Modes.Byte], 565);
  assertEquals(capacities[22]["Q"][Modes.Kanji], 348);

  assertEquals(capacities[22]["H"][Modes.Numeric], 1056);
  assertEquals(capacities[22]["H"][Modes.Alphanumeric], 640);
  assertEquals(capacities[22]["H"][Modes.Byte], 439);
  assertEquals(capacities[22]["H"][Modes.Kanji], 270);
});

Deno.test("capacities - version 23", () => {
  assertEquals(capacities[23]["L"][Modes.Numeric], 2620);
  assertEquals(capacities[23]["L"][Modes.Alphanumeric], 1588);
  assertEquals(capacities[23]["L"][Modes.Byte], 1091);
  assertEquals(capacities[23]["L"][Modes.Kanji], 672);

  assertEquals(capacities[23]["M"][Modes.Numeric], 2059);
  assertEquals(capacities[23]["M"][Modes.Alphanumeric], 1248);
  assertEquals(capacities[23]["M"][Modes.Byte], 857);
  assertEquals(capacities[23]["M"][Modes.Kanji], 528);

  assertEquals(capacities[23]["Q"][Modes.Numeric], 1468);
  assertEquals(capacities[23]["Q"][Modes.Alphanumeric], 890);
  assertEquals(capacities[23]["Q"][Modes.Byte], 611);
  assertEquals(capacities[23]["Q"][Modes.Kanji], 376);

  assertEquals(capacities[23]["H"][Modes.Numeric], 1108);
  assertEquals(capacities[23]["H"][Modes.Alphanumeric], 672);
  assertEquals(capacities[23]["H"][Modes.Byte], 461);
  assertEquals(capacities[23]["H"][Modes.Kanji], 284);
});

Deno.test("capacities - version 24", () => {
  assertEquals(capacities[24]["L"][Modes.Numeric], 2812);
  assertEquals(capacities[24]["L"][Modes.Alphanumeric], 1704);
  assertEquals(capacities[24]["L"][Modes.Byte], 1171);
  assertEquals(capacities[24]["L"][Modes.Kanji], 721);

  assertEquals(capacities[24]["M"][Modes.Numeric], 2188);
  assertEquals(capacities[24]["M"][Modes.Alphanumeric], 1326);
  assertEquals(capacities[24]["M"][Modes.Byte], 911);
  assertEquals(capacities[24]["M"][Modes.Kanji], 561);

  assertEquals(capacities[24]["Q"][Modes.Numeric], 1588);
  assertEquals(capacities[24]["Q"][Modes.Alphanumeric], 963);
  assertEquals(capacities[24]["Q"][Modes.Byte], 661);
  assertEquals(capacities[24]["Q"][Modes.Kanji], 407);

  assertEquals(capacities[24]["H"][Modes.Numeric], 1228);
  assertEquals(capacities[24]["H"][Modes.Alphanumeric], 744);
  assertEquals(capacities[24]["H"][Modes.Byte], 511);
  assertEquals(capacities[24]["H"][Modes.Kanji], 315);
});

Deno.test("capacities - version 25", () => {
  assertEquals(capacities[25]["L"][Modes.Numeric], 3057);
  assertEquals(capacities[25]["L"][Modes.Alphanumeric], 1853);
  assertEquals(capacities[25]["L"][Modes.Byte], 1273);
  assertEquals(capacities[25]["L"][Modes.Kanji], 784);

  assertEquals(capacities[25]["M"][Modes.Numeric], 2395);
  assertEquals(capacities[25]["M"][Modes.Alphanumeric], 1451);
  assertEquals(capacities[25]["M"][Modes.Byte], 997);
  assertEquals(capacities[25]["M"][Modes.Kanji], 614);

  assertEquals(capacities[25]["Q"][Modes.Numeric], 1718);
  assertEquals(capacities[25]["Q"][Modes.Alphanumeric], 1041);
  assertEquals(capacities[25]["Q"][Modes.Byte], 715);
  assertEquals(capacities[25]["Q"][Modes.Kanji], 440);

  assertEquals(capacities[25]["H"][Modes.Numeric], 1286);
  assertEquals(capacities[25]["H"][Modes.Alphanumeric], 779);
  assertEquals(capacities[25]["H"][Modes.Byte], 535);
  assertEquals(capacities[25]["H"][Modes.Kanji], 330);
});

Deno.test("capacities - version 26", () => {
  assertEquals(capacities[26]["L"][Modes.Numeric], 3283);
  assertEquals(capacities[26]["L"][Modes.Alphanumeric], 1990);
  assertEquals(capacities[26]["L"][Modes.Byte], 1367);
  assertEquals(capacities[26]["L"][Modes.Kanji], 842);

  assertEquals(capacities[26]["M"][Modes.Numeric], 2544);
  assertEquals(capacities[26]["M"][Modes.Alphanumeric], 1542);
  assertEquals(capacities[26]["M"][Modes.Byte], 1059);
  assertEquals(capacities[26]["M"][Modes.Kanji], 652);

  assertEquals(capacities[26]["Q"][Modes.Numeric], 1804);
  assertEquals(capacities[26]["Q"][Modes.Alphanumeric], 1094);
  assertEquals(capacities[26]["Q"][Modes.Byte], 751);
  assertEquals(capacities[26]["Q"][Modes.Kanji], 462);

  assertEquals(capacities[26]["H"][Modes.Numeric], 1425);
  assertEquals(capacities[26]["H"][Modes.Alphanumeric], 864);
  assertEquals(capacities[26]["H"][Modes.Byte], 593);
  assertEquals(capacities[26]["H"][Modes.Kanji], 365);
});

Deno.test("capacities - version 27", () => {
  assertEquals(capacities[27]["L"][Modes.Numeric], 3517);
  assertEquals(capacities[27]["L"][Modes.Alphanumeric], 2132);
  assertEquals(capacities[27]["L"][Modes.Byte], 1465);
  assertEquals(capacities[27]["L"][Modes.Kanji], 902);

  assertEquals(capacities[27]["M"][Modes.Numeric], 2701);
  assertEquals(capacities[27]["M"][Modes.Alphanumeric], 1637);
  assertEquals(capacities[27]["M"][Modes.Byte], 1125);
  assertEquals(capacities[27]["M"][Modes.Kanji], 692);

  assertEquals(capacities[27]["Q"][Modes.Numeric], 1933);
  assertEquals(capacities[27]["Q"][Modes.Alphanumeric], 1172);
  assertEquals(capacities[27]["Q"][Modes.Byte], 805);
  assertEquals(capacities[27]["Q"][Modes.Kanji], 496);

  assertEquals(capacities[27]["H"][Modes.Numeric], 1501);
  assertEquals(capacities[27]["H"][Modes.Alphanumeric], 910);
  assertEquals(capacities[27]["H"][Modes.Byte], 625);
  assertEquals(capacities[27]["H"][Modes.Kanji], 385);
});

Deno.test("capacities - version 28", () => {
  assertEquals(capacities[28]["L"][Modes.Numeric], 3669);
  assertEquals(capacities[28]["L"][Modes.Alphanumeric], 2223);
  assertEquals(capacities[28]["L"][Modes.Byte], 1528);
  assertEquals(capacities[28]["L"][Modes.Kanji], 940);

  assertEquals(capacities[28]["M"][Modes.Numeric], 2857);
  assertEquals(capacities[28]["M"][Modes.Alphanumeric], 1732);
  assertEquals(capacities[28]["M"][Modes.Byte], 1190);
  assertEquals(capacities[28]["M"][Modes.Kanji], 732);

  assertEquals(capacities[28]["Q"][Modes.Numeric], 2085);
  assertEquals(capacities[28]["Q"][Modes.Alphanumeric], 1263);
  assertEquals(capacities[28]["Q"][Modes.Byte], 868);
  assertEquals(capacities[28]["Q"][Modes.Kanji], 534);

  assertEquals(capacities[28]["H"][Modes.Numeric], 1581);
  assertEquals(capacities[28]["H"][Modes.Alphanumeric], 958);
  assertEquals(capacities[28]["H"][Modes.Byte], 658);
  assertEquals(capacities[28]["H"][Modes.Kanji], 405);
});

Deno.test("capacities - version 29", () => {
  assertEquals(capacities[29]["L"][Modes.Numeric], 3909);
  assertEquals(capacities[29]["L"][Modes.Alphanumeric], 2369);
  assertEquals(capacities[29]["L"][Modes.Byte], 1628);
  assertEquals(capacities[29]["L"][Modes.Kanji], 1002);

  assertEquals(capacities[29]["M"][Modes.Numeric], 3035);
  assertEquals(capacities[29]["M"][Modes.Alphanumeric], 1839);
  assertEquals(capacities[29]["M"][Modes.Byte], 1264);
  assertEquals(capacities[29]["M"][Modes.Kanji], 778);

  assertEquals(capacities[29]["Q"][Modes.Numeric], 2181);
  assertEquals(capacities[29]["Q"][Modes.Alphanumeric], 1322);
  assertEquals(capacities[29]["Q"][Modes.Byte], 908);
  assertEquals(capacities[29]["Q"][Modes.Kanji], 559);

  assertEquals(capacities[29]["H"][Modes.Numeric], 1677);
  assertEquals(capacities[29]["H"][Modes.Alphanumeric], 1016);
  assertEquals(capacities[29]["H"][Modes.Byte], 698);
  assertEquals(capacities[29]["H"][Modes.Kanji], 430);
});

Deno.test("capacities - version 30", () => {
  assertEquals(capacities[30]["L"][Modes.Numeric], 4158);
  assertEquals(capacities[30]["L"][Modes.Alphanumeric], 2520);
  assertEquals(capacities[30]["L"][Modes.Byte], 1732);
  assertEquals(capacities[30]["L"][Modes.Kanji], 1066);

  assertEquals(capacities[30]["M"][Modes.Numeric], 3289);
  assertEquals(capacities[30]["M"][Modes.Alphanumeric], 1994);
  assertEquals(capacities[30]["M"][Modes.Byte], 1370);
  assertEquals(capacities[30]["M"][Modes.Kanji], 843);

  assertEquals(capacities[30]["Q"][Modes.Numeric], 2358);
  assertEquals(capacities[30]["Q"][Modes.Alphanumeric], 1429);
  assertEquals(capacities[30]["Q"][Modes.Byte], 982);
  assertEquals(capacities[30]["Q"][Modes.Kanji], 604);

  assertEquals(capacities[30]["H"][Modes.Numeric], 1782);
  assertEquals(capacities[30]["H"][Modes.Alphanumeric], 1080);
  assertEquals(capacities[30]["H"][Modes.Byte], 742);
  assertEquals(capacities[30]["H"][Modes.Kanji], 457);
});

Deno.test("capacities - version 31", () => {
  assertEquals(capacities[31]["L"][Modes.Numeric], 4417);
  assertEquals(capacities[31]["L"][Modes.Alphanumeric], 2677);
  assertEquals(capacities[31]["L"][Modes.Byte], 1840);
  assertEquals(capacities[31]["L"][Modes.Kanji], 1132);

  assertEquals(capacities[31]["M"][Modes.Numeric], 3486);
  assertEquals(capacities[31]["M"][Modes.Alphanumeric], 2113);
  assertEquals(capacities[31]["M"][Modes.Byte], 1452);
  assertEquals(capacities[31]["M"][Modes.Kanji], 894);

  assertEquals(capacities[31]["Q"][Modes.Numeric], 2473);
  assertEquals(capacities[31]["Q"][Modes.Alphanumeric], 1499);
  assertEquals(capacities[31]["Q"][Modes.Byte], 1030);
  assertEquals(capacities[31]["Q"][Modes.Kanji], 634);

  assertEquals(capacities[31]["H"][Modes.Numeric], 1897);
  assertEquals(capacities[31]["H"][Modes.Alphanumeric], 1150);
  assertEquals(capacities[31]["H"][Modes.Byte], 790);
  assertEquals(capacities[31]["H"][Modes.Kanji], 486);
});

Deno.test("capacities - version 32", () => {
  assertEquals(capacities[32]["L"][Modes.Numeric], 4686);
  assertEquals(capacities[32]["L"][Modes.Alphanumeric], 2840);
  assertEquals(capacities[32]["L"][Modes.Byte], 1952);
  assertEquals(capacities[32]["L"][Modes.Kanji], 1201);

  assertEquals(capacities[32]["M"][Modes.Numeric], 3693);
  assertEquals(capacities[32]["M"][Modes.Alphanumeric], 2238);
  assertEquals(capacities[32]["M"][Modes.Byte], 1538);
  assertEquals(capacities[32]["M"][Modes.Kanji], 947);

  assertEquals(capacities[32]["Q"][Modes.Numeric], 2670);
  assertEquals(capacities[32]["Q"][Modes.Alphanumeric], 1618);
  assertEquals(capacities[32]["Q"][Modes.Byte], 1112);
  assertEquals(capacities[32]["Q"][Modes.Kanji], 684);

  assertEquals(capacities[32]["H"][Modes.Numeric], 2022);
  assertEquals(capacities[32]["H"][Modes.Alphanumeric], 1226);
  assertEquals(capacities[32]["H"][Modes.Byte], 842);
  assertEquals(capacities[32]["H"][Modes.Kanji], 518);
});

Deno.test("capacities - version 33", () => {
  assertEquals(capacities[33]["L"][Modes.Numeric], 4965);
  assertEquals(capacities[33]["L"][Modes.Alphanumeric], 3009);
  assertEquals(capacities[33]["L"][Modes.Byte], 2068);
  assertEquals(capacities[33]["L"][Modes.Kanji], 1273);

  assertEquals(capacities[33]["M"][Modes.Numeric], 3909);
  assertEquals(capacities[33]["M"][Modes.Alphanumeric], 2369);
  assertEquals(capacities[33]["M"][Modes.Byte], 1628);
  assertEquals(capacities[33]["M"][Modes.Kanji], 1002);

  assertEquals(capacities[33]["Q"][Modes.Numeric], 2805);
  assertEquals(capacities[33]["Q"][Modes.Alphanumeric], 1700);
  assertEquals(capacities[33]["Q"][Modes.Byte], 1168);
  assertEquals(capacities[33]["Q"][Modes.Kanji], 719);

  assertEquals(capacities[33]["H"][Modes.Numeric], 2157);
  assertEquals(capacities[33]["H"][Modes.Alphanumeric], 1307);
  assertEquals(capacities[33]["H"][Modes.Byte], 898);
  assertEquals(capacities[33]["H"][Modes.Kanji], 553);
});

Deno.test("capacities - version 34", () => {
  assertEquals(capacities[34]["L"][Modes.Numeric], 5253);
  assertEquals(capacities[34]["L"][Modes.Alphanumeric], 3183);
  assertEquals(capacities[34]["L"][Modes.Byte], 2188);
  assertEquals(capacities[34]["L"][Modes.Kanji], 1347);

  assertEquals(capacities[34]["M"][Modes.Numeric], 4134);
  assertEquals(capacities[34]["M"][Modes.Alphanumeric], 2506);
  assertEquals(capacities[34]["M"][Modes.Byte], 1722);
  assertEquals(capacities[34]["M"][Modes.Kanji], 1060);

  assertEquals(capacities[34]["Q"][Modes.Numeric], 2949);
  assertEquals(capacities[34]["Q"][Modes.Alphanumeric], 1787);
  assertEquals(capacities[34]["Q"][Modes.Byte], 1228);
  assertEquals(capacities[34]["Q"][Modes.Kanji], 756);

  assertEquals(capacities[34]["H"][Modes.Numeric], 2301);
  assertEquals(capacities[34]["H"][Modes.Alphanumeric], 1394);
  assertEquals(capacities[34]["H"][Modes.Byte], 958);
  assertEquals(capacities[34]["H"][Modes.Kanji], 590);
});

Deno.test("capacities - version 35", () => {
  assertEquals(capacities[35]["L"][Modes.Numeric], 5529);
  assertEquals(capacities[35]["L"][Modes.Alphanumeric], 3351);
  assertEquals(capacities[35]["L"][Modes.Byte], 2303);
  assertEquals(capacities[35]["L"][Modes.Kanji], 1417);

  assertEquals(capacities[35]["M"][Modes.Numeric], 4343);
  assertEquals(capacities[35]["M"][Modes.Alphanumeric], 2632);
  assertEquals(capacities[35]["M"][Modes.Byte], 1809);
  assertEquals(capacities[35]["M"][Modes.Kanji], 1113);

  assertEquals(capacities[35]["Q"][Modes.Numeric], 3081);
  assertEquals(capacities[35]["Q"][Modes.Alphanumeric], 1867);
  assertEquals(capacities[35]["Q"][Modes.Byte], 1283);
  assertEquals(capacities[35]["Q"][Modes.Kanji], 790);

  assertEquals(capacities[35]["H"][Modes.Numeric], 2361);
  assertEquals(capacities[35]["H"][Modes.Alphanumeric], 1431);
  assertEquals(capacities[35]["H"][Modes.Byte], 983);
  assertEquals(capacities[35]["H"][Modes.Kanji], 605);
});

Deno.test("capacities - version 36", () => {
  assertEquals(capacities[36]["L"][Modes.Numeric], 5836);
  assertEquals(capacities[36]["L"][Modes.Alphanumeric], 3537);
  assertEquals(capacities[36]["L"][Modes.Byte], 2431);
  assertEquals(capacities[36]["L"][Modes.Kanji], 1496);

  assertEquals(capacities[36]["M"][Modes.Numeric], 4588);
  assertEquals(capacities[36]["M"][Modes.Alphanumeric], 2780);
  assertEquals(capacities[36]["M"][Modes.Byte], 1911);
  assertEquals(capacities[36]["M"][Modes.Kanji], 1176);

  assertEquals(capacities[36]["Q"][Modes.Numeric], 3244);
  assertEquals(capacities[36]["Q"][Modes.Alphanumeric], 1966);
  assertEquals(capacities[36]["Q"][Modes.Byte], 1351);
  assertEquals(capacities[36]["Q"][Modes.Kanji], 832);

  assertEquals(capacities[36]["H"][Modes.Numeric], 2524);
  assertEquals(capacities[36]["H"][Modes.Alphanumeric], 1530);
  assertEquals(capacities[36]["H"][Modes.Byte], 1051);
  assertEquals(capacities[36]["H"][Modes.Kanji], 647);
});

Deno.test("capacities - version 37", () => {
  assertEquals(capacities[37]["L"][Modes.Numeric], 6153);
  assertEquals(capacities[37]["L"][Modes.Alphanumeric], 3729);
  assertEquals(capacities[37]["L"][Modes.Byte], 2563);
  assertEquals(capacities[37]["L"][Modes.Kanji], 1577);

  assertEquals(capacities[37]["M"][Modes.Numeric], 4775);
  assertEquals(capacities[37]["M"][Modes.Alphanumeric], 2894);
  assertEquals(capacities[37]["M"][Modes.Byte], 1989);
  assertEquals(capacities[37]["M"][Modes.Kanji], 1224);

  assertEquals(capacities[37]["Q"][Modes.Numeric], 3417);
  assertEquals(capacities[37]["Q"][Modes.Alphanumeric], 2071);
  assertEquals(capacities[37]["Q"][Modes.Byte], 1423);
  assertEquals(capacities[37]["Q"][Modes.Kanji], 876);

  assertEquals(capacities[37]["H"][Modes.Numeric], 2625);
  assertEquals(capacities[37]["H"][Modes.Alphanumeric], 1591);
  assertEquals(capacities[37]["H"][Modes.Byte], 1093);
  assertEquals(capacities[37]["H"][Modes.Kanji], 673);
});

Deno.test("capacities - version 38", () => {
  assertEquals(capacities[38]["L"][Modes.Numeric], 6479);
  assertEquals(capacities[38]["L"][Modes.Alphanumeric], 3927);
  assertEquals(capacities[38]["L"][Modes.Byte], 2699);
  assertEquals(capacities[38]["L"][Modes.Kanji], 1661);

  assertEquals(capacities[38]["M"][Modes.Numeric], 5039);
  assertEquals(capacities[38]["M"][Modes.Alphanumeric], 3054);
  assertEquals(capacities[38]["M"][Modes.Byte], 2099);
  assertEquals(capacities[38]["M"][Modes.Kanji], 1292);

  assertEquals(capacities[38]["Q"][Modes.Numeric], 3599);
  assertEquals(capacities[38]["Q"][Modes.Alphanumeric], 2181);
  assertEquals(capacities[38]["Q"][Modes.Byte], 1499);
  assertEquals(capacities[38]["Q"][Modes.Kanji], 923);

  assertEquals(capacities[38]["H"][Modes.Numeric], 2735);
  assertEquals(capacities[38]["H"][Modes.Alphanumeric], 1658);
  assertEquals(capacities[38]["H"][Modes.Byte], 1139);
  assertEquals(capacities[38]["H"][Modes.Kanji], 701);
});

Deno.test("capacities - version 39", () => {
  assertEquals(capacities[39]["L"][Modes.Numeric], 6743);
  assertEquals(capacities[39]["L"][Modes.Alphanumeric], 4087);
  assertEquals(capacities[39]["L"][Modes.Byte], 2809);
  assertEquals(capacities[39]["L"][Modes.Kanji], 1729);

  assertEquals(capacities[39]["M"][Modes.Numeric], 5313);
  assertEquals(capacities[39]["M"][Modes.Alphanumeric], 3220);
  assertEquals(capacities[39]["M"][Modes.Byte], 2213);
  assertEquals(capacities[39]["M"][Modes.Kanji], 1362);

  assertEquals(capacities[39]["Q"][Modes.Numeric], 3791);
  assertEquals(capacities[39]["Q"][Modes.Alphanumeric], 2298);
  assertEquals(capacities[39]["Q"][Modes.Byte], 1579);
  assertEquals(capacities[39]["Q"][Modes.Kanji], 972);

  assertEquals(capacities[39]["H"][Modes.Numeric], 2927);
  assertEquals(capacities[39]["H"][Modes.Alphanumeric], 1774);
  assertEquals(capacities[39]["H"][Modes.Byte], 1219);
  assertEquals(capacities[39]["H"][Modes.Kanji], 750);
});

Deno.test("capacities - version 40", () => {
  assertEquals(capacities[40]["L"][Modes.Numeric], 7089);
  assertEquals(capacities[40]["L"][Modes.Alphanumeric], 4296);
  assertEquals(capacities[40]["L"][Modes.Byte], 2953);
  assertEquals(capacities[40]["L"][Modes.Kanji], 1817);

  assertEquals(capacities[40]["M"][Modes.Numeric], 5596);
  assertEquals(capacities[40]["M"][Modes.Alphanumeric], 3391);
  assertEquals(capacities[40]["M"][Modes.Byte], 2331);
  assertEquals(capacities[40]["M"][Modes.Kanji], 1435);

  assertEquals(capacities[40]["Q"][Modes.Numeric], 3993);
  assertEquals(capacities[40]["Q"][Modes.Alphanumeric], 2420);
  assertEquals(capacities[40]["Q"][Modes.Byte], 1663);
  assertEquals(capacities[40]["Q"][Modes.Kanji], 1024);

  assertEquals(capacities[40]["H"][Modes.Numeric], 3057);
  assertEquals(capacities[40]["H"][Modes.Alphanumeric], 1852);
  assertEquals(capacities[40]["H"][Modes.Byte], 1273);
  assertEquals(capacities[40]["H"][Modes.Kanji], 784);
});