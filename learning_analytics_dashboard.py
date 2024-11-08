import pandas as pd

# id.csvで読み取る
df = pd.read_csv("653.csv")

# 回数を示す
sum_play = df["1"].sum()
sum_pause = df["0.1"].sum() - (df["0.4"].sum() + df["0.5"].sum())
sum_forward_skip = df["0.2"].sum()
sum_backward_skip = df["0.3"].sum()
sum_forward_seek = df["0.4"].sum()
sum_backward_seek = df["0.5"].sum()

print(f"再生回数｜{sum_play}")
print(f"一時停止回数｜{sum_pause}")
print(f"早送りスキップ回数｜{sum_forward_skip}")
print(f"巻き戻しスキップ回数｜{sum_backward_skip}")
print(f"早送りシーク回数｜{sum_forward_seek}")
print(f"巻き戻しシーク回数｜{sum_backward_seek}")

# 時間割合を求める
forward_seek_ratio = 0
backward_seek_ratio = 0
for i in range(df["0.6"].size):
    if df["0.6"][i] > 0:
        forward_seek_ratio += df["0.6"][i]
    else:
        backward_seek_ratio += df["0.6"][i]

print(f"早送りシーク時間割合｜{forward_seek_ratio / 549}")
print(f"巻き戻しシーク時間割合｜{backward_seek_ratio / 549}")

# 仮平均値を設定する
avg_pause = 5
avg_forward_skip = 7
avg_backward_skip = 3
avg_forward_seek = 5
avg_backward_seek = 1
avg_forward_seek_ratio = 0.67
avg_backward_seek_ratio = -1.6

# 複数当てはまる場合どういう処理をするか
# 早送りと巻き戻しの平均と比較する
if (sum_forward_skip > avg_forward_skip) or (sum_backward_skip > avg_backward_skip):
    print("あなたは「自分に必要なところを探して学習するタイプ」と思われます")

# 一時停止の回数の平均を比較する
elif sum_pause > avg_pause:
    print("あなたは「一歩一歩理解することを重視するタイプ」と思われます")

# 巻き戻しスキップの時間割合平均を比較する
elif (
    sum_backward_seek > avg_backward_seek
    and backward_seek_ratio < avg_backward_seek_ratio
):
    print("あなたは「不明点を繰り返して見るタイプ」と思われます")

# どれにも該当しない場合
else:
    print("あなたは「全編きっちり見るタイプ」と思われます")
