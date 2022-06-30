/*
 * Time Temple - Kirston
 * Twilight of the Gods
 */

function start() {
  cm.askAcceptDecline(
    "如果我有善良之鏡，我就可以重新召喚黑魔法師！\r\n等等！好像有什麼不對勁！為什麼沒有召喚出黑魔法師？等等，這是什麼氣息？我怎麼感覺……和黑魔法師完全不同啊啊啊啊！！！！\r\n\r\n#b(把手放在奇勒斯坦的肩膀上。)"
  );
}

function action(mode, type, selection) {
  if (mode == 1) {
    cm.removeNpc(270050100, 2141000);
    cm.forceStartReactor(270050100, 2709000);
  }
  cm.dispose();

  // If accepted, = summon PB + Kriston Disappear + 1 hour timer
  // If deny = NoTHING HAPPEN
}